import React, { useState, useEffect } from 'react';
import PageWrapper from '@/components/layout/PageWrapper';
import SongCard, { Song } from '@/components/disco/SongCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import MusicServiceConnector from '@/components/music/MusicServiceConnector';
import supabase from '@/libs/supabase';
import { toast } from 'sonner';

// Mock data for songs
const MOCK_SONGS: Song[] = [
    {
        id: '1',
        title: 'Blinding Lights',
        artist: 'The Weeknd',
        coverUrl: 'https://source.unsplash.com/random/300x300/?album&seed=1',
        bpm: 171,
        service: 'spotify'
    },
    {
        id: '2',
        title: 'Don\'t Start Now',
        artist: 'Dua Lipa',
        coverUrl: 'https://source.unsplash.com/random/300x300/?album&seed=2',
        bpm: 124,
        service: 'spotify'
    },
    {
        id: '3',
        title: 'Bad Guy',
        artist: 'Billie Eilish',
        coverUrl: 'https://source.unsplash.com/random/300x300/?album&seed=3',
        bpm: 135,
        service: 'spotify'
    },
    {
        id: '4',
        title: 'Dance Monkey',
        artist: 'Tones and I',
        coverUrl: 'https://source.unsplash.com/random/300x300/?album&seed=4',
        bpm: 98,
        service: 'apple'
    },
    {
        id: '5',
        title: 'Levitating',
        artist: 'Dua Lipa',
        coverUrl: 'https://source.unsplash.com/random/300x300/?album&seed=5',
        bpm: 103,
        service: 'apple'
    },
    {
        id: '6',
        title: 'Watermelon Sugar',
        artist: 'Harry Styles',
        coverUrl: 'https://source.unsplash.com/random/300x300/?album&seed=6',
        bpm: 95,
        service: 'spotify'
    },
    {
        id: '7',
        title: 'Save Your Tears',
        artist: 'The Weeknd',
        coverUrl: 'https://source.unsplash.com/random/300x300/?album&seed=7',
        bpm: 118,
        service: 'apple'
    },
    {
        id: '8',
        title: 'Stay',
        artist: 'The Kid LAROI, Justin Bieber',
        coverUrl: 'https://source.unsplash.com/random/300x300/?album&seed=8',
        bpm: 170,
        service: 'spotify'
    }
];

const Library = () => {
    const [connected, setConnected] = useState(false);
    const [selectedSong, setSelectedSong] = useState<string | null>(null);
    const [playingSong, setPlayingSong] = useState<string | null>(null);
    const [bpmRange, setBpmRange] = useState([60, 180]);
    const [user, setUser] = useState<any>(null);

    // Fetch the signed-in user's data
    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error) {
                console.error('Error fetching user:', error.message);
            } else {
                setUser(user);
            }
        };

        fetchUser();
    }, []);

    const handleConnect = (service: 'spotify' | 'apple') => {
        console.log(`Connected to ${service}`);
        setConnected(true);
    };

    const handleSelectSong = (id: string) => {
        setSelectedSong(id === selectedSong ? null : id);
    };

    const handlePlaySong = (id: string) => {
        setPlayingSong(id === playingSong ? null : id);
    };

    // Filter songs by BPM range
    const filteredSongs = MOCK_SONGS.filter(
        song => song.bpm >= bpmRange[0] && song.bpm <= bpmRange[1]
    );

    return (
        <PageWrapper>
            <div className="container px-4 py-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Your Music Library</h1>
                        <p className="text-muted-foreground">
                            Browse and manage your synced tracks
                        </p>
                    </div>
                </div>

                {!connected ? (
                    <div className="max-w-2xl mx-auto py-12">
                        <h2 className="text-xl font-medium text-center mb-6">Connect Your Music Accounts</h2>
                        <MusicServiceConnector onConnect={handleConnect} />
                    </div>
                ) : (
                    <Tabs defaultValue="all" className="mb-8">
                        <TabsList className="mb-6">
                            <TabsTrigger value="all">All Songs</TabsTrigger>
                            <TabsTrigger value="playlists">Playlists</TabsTrigger>
                            <TabsTrigger value="favorites">Favorites</TabsTrigger>
                        </TabsList>

                        <div className="mb-8">
                            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                                <Label className="text-sm font-medium whitespace-nowrap">BPM Range:</Label>
                                <div className="flex-1 px-2">
                                    <Slider
                                        defaultValue={bpmRange}
                                        min={60}
                                        max={200}
                                        step={1}
                                        value={bpmRange}
                                        onValueChange={setBpmRange}
                                    />
                                </div>
                                <div className="text-sm text-muted-foreground whitespace-nowrap">
                                    {bpmRange[0]} - {bpmRange[1]} BPM
                                </div>
                            </div>
                        </div>

                        <TabsContent value="all">
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                {filteredSongs.map((song) => (
                                    <SongCard
                                        key={song.id}
                                        song={song}
                                        isSelected={song.id === selectedSong}
                                        isPlaying={song.id === playingSong}
                                        onSelect={() => handleSelectSong(song.id)}
                                        onPlay={() => handlePlaySong(song.id)}
                                    />
                                ))}
                            </div>

                            {filteredSongs.length === 0 && (
                                <div className="text-center py-12">
                                    <p className="text-muted-foreground">No songs found in this BPM range.</p>
                                </div>
                            )}
                        </TabsContent>

                        <TabsContent value="playlists">
                            <div className="text-center py-12">
                                <p className="text-muted-foreground">Your playlists will appear here.</p>
                            </div>
                        </TabsContent>

                        <TabsContent value="favorites">
                            <div className="text-center py-12">
                                <p className="text-muted-foreground">Your favorite songs will appear here.</p>
                            </div>
                        </TabsContent>
                    </Tabs>
                )}
            </div>
        </PageWrapper>
    );
};

export default Library;