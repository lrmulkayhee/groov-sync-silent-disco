
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import PageWrapper from '@/components/layout/PageWrapper';
import WaveformVisualizer from '@/components/music/WaveformVisualizer';
import { ArrowRight, Music, Users, Zap } from 'lucide-react';

const Index = () => {
    return (
        <PageWrapper>
            <section className="relative overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-grid-white/5 bg-grid-pattern" />
                <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/90 to-background" />

                <div className="container relative px-4 py-16 md:py-24">
                    <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                        <div className="mb-4 flex gap-2">
                            <WaveformVisualizer size="sm" />
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-groove-purple via-groove-blue to-groove-pink">
                                GroovSync
                            </span>{" "}
                            Silent Disco
                        </h1>

                        <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                            Dance together to your own beat. Create a silent disco where everyone
                            listens to their own music but stays in sync through matching BPM.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button asChild size="lg" className="bg-gradient-to-r from-groove-purple to-groove-blue hover:opacity-90">
                                <Link to="/create">Create a Disco</Link>
                            </Button>
                            <Button asChild size="lg" variant="outline">
                                <Link to="/join">Join a Disco</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container px-4 py-16">
                <div className="grid gap-12 md:grid-cols-3">
                    <div className="flex flex-col items-center text-center">
                        <div className="h-12 w-12 rounded-full bg-groove-purple/10 flex items-center justify-center mb-4">
                            <Music className="h-6 w-6 text-groove-purple" />
                        </div>
                        <h3 className="text-xl font-medium mb-2">Sync Your Music</h3>
                        <p className="text-muted-foreground">
                            Connect your Spotify or Apple Music account to analyze your library and playlists.
                        </p>
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <div className="h-12 w-12 rounded-full bg-groove-blue/10 flex items-center justify-center mb-4">
                            <Zap className="h-6 w-6 text-groove-blue" />
                        </div>
                        <h3 className="text-xl font-medium mb-2">Match by BPM</h3>
                        <p className="text-muted-foreground">
                            Our algorithm matches songs based on their beats per minute for a synchronized experience.
                        </p>
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <div className="h-12 w-12 rounded-full bg-groove-pink/10 flex items-center justify-center mb-4">
                            <Users className="h-6 w-6 text-groove-pink" />
                        </div>
                        <h3 className="text-xl font-medium mb-2">Dance Together</h3>
                        <p className="text-muted-foreground">
                            Everyone dances to the same rhythm while enjoying their own music choices.
                        </p>
                    </div>
                </div>
            </section>

            <section className="container px-4 py-16">
                <div className="bg-gradient-to-r from-groove-purple/10 to-groove-blue/10 rounded-2xl p-8 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Your Own Silent Disco?</h2>
                    <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                        Create a session in seconds, invite your friends, and enjoy a synchronized musical experience.
                    </p>
                    <Button asChild size="lg" className="bg-gradient-to-r from-groove-purple to-groove-blue hover:opacity-90">
                        <Link to="/register" className="flex items-center gap-2">
                            Get Started <ArrowRight className="h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </section>
        </PageWrapper>
    );
};

export default Index;