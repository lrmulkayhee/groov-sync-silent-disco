import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import PageWrapper from '@/components/layout/PageWrapper';
import SongCard, { Song } from '@/components/disco/SongCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import WaveformVisualizer from '@/components/music/WaveformVisualizer';
import BpmDisplay from '@/components/music/BpmDisplay';
import { Play, Pause, Users, Share, SkipForward } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';

// Mock data for the active session
const MOCK_SESSION = {
    id: 'abc123',
    name: 'Friday Night Vibes',
    hostName: 'DJ Alex',
    participants: 12,
    activeBpm: 128,
    isActive: true,
};

// Mock data for songs matching the current BPM
const MOCK_MATCHED_SONGS: Song[] = [
    {
        id: '1',
        title: 'Blinding Lights',
        artist: 'The Weeknd',
        coverUrl: 'https://i.scdn.co/image/ab67616d0000b27393b1f5b1e5b1f5b1e5b1f5b1',
        audioUrl: 'https://p.scdn.co/mp3-preview/1234567890abcdef1234567890abcdef12345678',
        bpm: 128,
        service: 'spotify',
    },
    {
        id: '2',
        title: "Don't Start Now",
        artist: 'Dua Lipa',
        coverUrl: 'https://i.scdn.co/image/ab67616d0000b273abcdefabcdefabcdefabcdef',
        audioUrl: 'https://p.scdn.co/mp3-preview/abcdefabcdefabcdefabcdefabcdefabcdef',
        bpm: 128,
        service: 'spotify',
    },
    {
        id: '3',
        title: 'Bad Guy',
        artist: 'Billie Eilish',
        coverUrl: 'https://i.scdn.co/image/ab67616d0000b273abcdefabcdefabcdefabcdef',
        audioUrl: 'https://p.scdn.co/mp3-preview/abcdefabcdefabcdefabcdefabcdefabcdef',
        bpm: 128,
        service: 'spotify',
    },
];

// Mock data for participants
const MOCK_PARTICIPANTS = [
    {
        id: '1',
        name: 'Alex',
        avatar: 'https://i.pravatar.cc/100?img=1',
        song: 'Blinding Lights',
        artist: 'The Weeknd',
    },
    {
        id: '2',
        name: 'Jordan',
        avatar: 'https://i.pravatar.cc/100?img=2',
        song: "Don't Start Now",
        artist: 'Dua Lipa',
    },
    {
        id: '3',
        name: 'Sam',
        avatar: 'https://i.pravatar.cc/100?img=3',
        song: 'Bad Guy',
        artist: 'Billie Eilish',
    },
];

const DiscoSession = () => {
    const { id } = useParams<{ id: string }>();
    const [isPlaying, setIsPlaying] = useState(false);
    const [selectedSong, setSelectedSong] = useState<string | null>(null);
    const [playingSong, setPlayingSong] = useState<string | null>(null);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Auto-select the first song if none is selected
        if (MOCK_MATCHED_SONGS.length > 0 && !selectedSong) {
            setSelectedSong(MOCK_MATCHED_SONGS[0].id);
        }
    }, [selectedSong]);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isPlaying) {
            interval = setInterval(() => {
                setTimeElapsed((prev) => prev + 1);
            }, 1000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isPlaying]);

    const handlePlayPause = () => {
        if (!selectedSong) {
            toast.error('Please select a song first');
            return;
        }

        setIsPlaying(!isPlaying);
        if (isPlaying) {
            audioRef.current?.pause();
            setPlayingSong(null);
        } else {
            const song = MOCK_MATCHED_SONGS.find((s) => s.id === selectedSong);
            if (song && audioRef.current) {
                audioRef.current.src = song.audioUrl;
                audioRef.current.play();
                setPlayingSong(selectedSong);
            }
        }
    };

    const handleSelectSong = (id: string) => {
        setSelectedSong(id);
        if (isPlaying) {
            const song = MOCK_MATCHED_SONGS.find((s) => s.id === id);
            if (song && audioRef.current) {
                audioRef.current.src = song.audioUrl;
                audioRef.current.play();
                setPlayingSong(id);
            }
        }
    };

    const handleSkipSong = () => {
        const currentIndex = MOCK_MATCHED_SONGS.findIndex((song) => song.id === selectedSong);
        const nextIndex = (currentIndex + 1) % MOCK_MATCHED_SONGS.length;
        handleSelectSong(MOCK_MATCHED_SONGS[nextIndex].id);
    };

    const handleShareSession = () => {
        navigator.clipboard.writeText(`Join my silent disco session with code: ${id}`);
        toast.success('Invite link copied to clipboard!');
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <PageWrapper className="pb-24">
            <div className="container px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">{MOCK_SESSION.name}</h1>
                        <p className="text-muted-foreground">
                            Hosted by {MOCK_SESSION.hostName} • {MOCK_SESSION.participants} participants
                        </p>
                    </div>
                    <Button variant="outline" onClick={handleShareSession}>
                        <Share className="mr-2 h-4 w-4" />
                        Share
                    </Button>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        <Card className="mb-8">
                            <CardContent>
                                <h2 className="text-xl font-medium mb-4">Now Playing</h2>
                                {selectedSong && (
                                    <div>
                                        <img
                                            src={MOCK_MATCHED_SONGS.find((s) => s.id === selectedSong)?.coverUrl}
                                            alt="Album cover"
                                            className="w-full rounded-lg mb-4"
                                        />
                                        <h3 className="text-2xl font-bold">
                                            {MOCK_MATCHED_SONGS.find((s) => s.id === selectedSong)?.title}
                                        </h3>
                                        <p className="text-muted-foreground">
                                            {MOCK_MATCHED_SONGS.find((s) => s.id === selectedSong)?.artist}
                                        </p>
                                    </div>
                                )}
                                <div className="flex items-center gap-4 mt-4">
                                    <Button onClick={handlePlayPause}>
                                        {isPlaying ? <Pause /> : <Play />}
                                    </Button>
                                    <Button onClick={handleSkipSong}>
                                        <SkipForward />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <h2 className="text-xl font-medium mb-4">Matching Songs</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {MOCK_MATCHED_SONGS.map((song) => (
                                <SongCard
                                    key={song.id}
                                    song={song}
                                    isSelected={song.id === selectedSong}
                                    isPlaying={song.id === playingSong}
                                    onSelect={() => handleSelectSong(song.id)}
                                    onPlay={() => handlePlayPause()}
                                />
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-medium mb-4">Participants</h2>
                        <div className="space-y-4">
                            {MOCK_PARTICIPANTS.map((participant) => (
                                <div key={participant.id} className="flex items-center gap-4">
                                    <img
                                        src={participant.avatar}
                                        alt={participant.name}
                                        className="w-12 h-12 rounded-full"
                                    />
                                    <div>
                                        <p className="font-medium">{participant.name}</p>
                                        <p className="text-muted-foreground text-sm">
                                            {participant.song} - {participant.artist}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <audio ref={audioRef} />
            </div>
        </PageWrapper>
    );
};

export default DiscoSession;