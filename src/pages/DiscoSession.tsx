import React, { useState, useEffect } from 'react';
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
    isActive: true
};

// Mock data for songs matching the current BPM
const MOCK_MATCHED_SONGS: Song[] = [
    {
        id: '1',
        title: 'Blinding Lights',
        artist: 'The Weeknd',
        coverUrl: 'https://source.unsplash.com/random/300x300/?album&seed=1',
        bpm: 128,
        service: 'spotify'
    },
    {
        id: '2',
        title: 'Don\'t Start Now',
        artist: 'Dua Lipa',
        coverUrl: 'https://source.unsplash.com/random/300x300/?album&seed=2',
        bpm: 128,
        service: 'spotify'
    },
    {
        id: '3',
        title: 'Bad Guy',
        artist: 'Billie Eilish',
        coverUrl: 'https://source.unsplash.com/random/300x300/?album&seed=3',
        bpm: 128,
        service: 'spotify'
    }
];

// Mock data for participants
const MOCK_PARTICIPANTS = [
    { id: '1', name: 'Alex', avatar: 'https://source.unsplash.com/random/100x100/?face&seed=1', song: 'Blinding Lights', artist: 'The Weeknd' },
    { id: '2', name: 'Jordan', avatar: 'https://source.unsplash.com/random/100x100/?face&seed=2', song: 'Don\'t Start Now', artist: 'Dua Lipa' },
    { id: '3', name: 'Sam', avatar: 'https://source.unsplash.com/random/100x100/?face&seed=3', song: 'Bad Guy', artist: 'Billie Eilish' },
    { id: '4', name: 'Taylor', avatar: 'https://source.unsplash.com/random/100x100/?face&seed=4', song: 'Dance Monkey', artist: 'Tones and I' },
    { id: '5', name: 'Casey', avatar: 'https://source.unsplash.com/random/100x100/?face&seed=5', song: 'Levitating', artist: 'Dua Lipa' }
];

const DiscoSession = () => {
    const { id } = useParams<{ id: string }>();
    const [isPlaying, setIsPlaying] = useState(false);
    const [selectedSong, setSelectedSong] = useState<string | null>(null);
    const [playingSong, setPlayingSong] = useState<string | null>(null);
    const [timeElapsed, setTimeElapsed] = useState(0);

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
                setTimeElapsed(prev => prev + 1);
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
        setPlayingSong(isPlaying ? null : selectedSong);
    };

    const handleSelectSong = (id: string) => {
        setSelectedSong(id);
        if (isPlaying) {
            setPlayingSong(id);
        }
    };

    const handleSkipSong = () => {
        const currentIndex = MOCK_MATCHED_SONGS.findIndex(song => song.id === selectedSong);
        const nextIndex = (currentIndex + 1) % MOCK_MATCHED_SONGS.length;
        setSelectedSong(MOCK_MATCHED_SONGS[nextIndex].id);
        if (isPlaying) {
            setPlayingSong(MOCK_MATCHED_SONGS[nextIndex].id);
        }
    };

    const handleShareSession = () => {
        navigator.clipboard.writeText(`Join my silent disco session with code: ${id}`);
        toast.success('Invite link copied to clipboard!');
    };

    // Format seconds to MM:SS
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <PageWrapper className="pb-24">
            <div className="container px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">{MOCK_SESSION.name}</h1>
                        <p className="text-muted-foreground">
                            Hosted by {MOCK_SESSION.hostName} • {MOCK_SESSION.participants} participants
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <BpmDisplay bpm={MOCK_SESSION.activeBpm} />
                        <Button variant="outline" onClick={handleShareSession}>
                            <Share className="mr-2 h-4 w-4" />
                            Share
                        </Button>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-8">
                    <div className="md:col-span-2">
                        <Card className="border-border/40 backdrop-blur-sm bg-card/80 mb-8">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-medium">Now Playing</h2>
                                    <div className="text-muted-foreground">{formatTime(timeElapsed)}</div>
                                </div>

                                <div className="flex flex-col md:flex-row gap-6 items-center">
                                    <div className="w-full md:w-1/3">
                                        {selectedSong && (
                                            <div className="aspect-square rounded-lg overflow-hidden relative">
                                                <img
                                                    src={MOCK_MATCHED_SONGS.find(s => s.id === selectedSong)?.coverUrl}
                                                    alt="Album cover"
                                                    className="object-cover w-full h-full"
                                                />
                                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                                    <BpmDisplay bpm={MOCK_SESSION.activeBpm} />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="w-full md:w-2/3 flex flex-col">
                                        {selectedSong && (
                                            <>
                                                <h3 className="text-2xl font-bold mb-1">
                                                    {MOCK_MATCHED_SONGS.find(s => s.id === selectedSong)?.title}
                                                </h3>
                                                <p className="text-lg text-muted-foreground mb-4">
                                                    {MOCK_MATCHED_SONGS.find(s => s.id === selectedSong)?.artist}
                                                </p>
                                            </>
                                        )}

                                        <div className="my-4">
                                            <WaveformVisualizer active={isPlaying} size="lg" />
                                        </div>

                                        <div className="flex items-center justify-center gap-4 mt-4">
                                            <Button
                                                size="lg"
                                                className="rounded-full w-16 h-16 bg-gradient-to-r from-groove-purple to-groove-blue hover:opacity-90"
                                                onClick={handlePlayPause}
                                            >
                                                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="outline"
                                                className="rounded-full"
                                                onClick={handleSkipSong}
                                            >
                                                <SkipForward className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div>
                            <h2 className="text-xl font-medium mb-4">Matching Songs</h2>
                            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {MOCK_MATCHED_SONGS.map((song) => (
                                    <SongCard
                                        key={song.id}
                                        song={song}
                                        isSelected={song.id === selectedSong}
                                        isPlaying={song.id === playingSong}
                                        onSelect={() => handleSelectSong(song.id)}
                                        onPlay={() => setPlayingSong(song.id === playingSong ? null : song.id)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div>
                        <Tabs defaultValue="participants">
                            <TabsList className="w-full grid grid-cols-2 mb-4">
                                <TabsTrigger value="participants">Participants</TabsTrigger>
                                <TabsTrigger value="chat">Chat</TabsTrigger>
                            </TabsList>

                            <TabsContent value="participants" className="mt-0">
                                <Card className="border-border/40 backdrop-blur-sm bg-card/80">
                                    <CardContent className="p-4">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="font-medium">Grooving Together</h3>
                                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                <Users className="h-4 w-4" />
                                                {MOCK_PARTICIPANTS.length}
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            {MOCK_PARTICIPANTS.map((participant) => (
                                                <div key={participant.id} className="flex items-center gap-3">
                                                    <img
                                                        src={participant.avatar}
                                                        alt={participant.name}
                                                        className="w-10 h-10 rounded-full object-cover"
                                                    />
                                                    <div className="flex-1 overflow-hidden">
                                                        <p className="font-medium truncate">{participant.name}</p>
                                                        <p className="text-xs text-muted-foreground truncate">
                                                            {participant.song} - {participant.artist}
                                                        </p>
                                                    </div>
                                                    {Math.random() > 0.5 ? (
                                                        <div className="h-2 w-2 rounded-full bg-green-500" title="Active" />
                                                    ) : (
                                                        <div className="h-2 w-2 rounded-full bg-amber-500" title="Idle" />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="chat" className="mt-0">
                                <Card className="border-border/40 backdrop-blur-sm bg-card/80 h-96">
                                    <CardContent className="p-4">
                                        <div className="text-center p-8">
                                            <p className="text-muted-foreground">
                                                Chat feature coming soon!
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>

            {/* Mobile controls */}
            <div className="fixed bottom-0 left-0 right-0 md:hidden bg-background border-t border-border p-4 flex items-center justify-between">
                {selectedSong && (
                    <>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded overflow-hidden">
                                <img
                                    src={MOCK_MATCHED_SONGS.find(s => s.id === selectedSong)?.coverUrl}
                                    alt="Album cover"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="overflow-hidden">
                                <p className="font-medium truncate">
                                    {MOCK_MATCHED_SONGS.find(s => s.id === selectedSong)?.title}
                                </p>
                                <p className="text-xs text-muted-foreground truncate">
                                    {MOCK_MATCHED_SONGS.find(s => s.id === selectedSong)?.artist}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <Button
                                size="icon"
                                variant="ghost"
                                className="rounded-full"
                                onClick={handlePlayPause}
                            >
                                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                            </Button>
                            <Button
                                size="icon"
                                variant="ghost"
                                className="rounded-full"
                                onClick={handleSkipSong}
                            >
                                <SkipForward className="h-5 w-5" />
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </PageWrapper>
    );
};

export default DiscoSession;