import React from 'react';
import PageWrapper from '@/components/layout/PageWrapper';
import CreateDiscoForm from '@/components/disco/CreateDiscoForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MusicServiceConnector from '@/components/music/MusicServiceConnector';
import { toast } from 'sonner';

const CreateDisco = () => {
    const handleConnect = (service: 'spotify' | 'apple') => {
        console.log(`Connected to ${service}`);
    };

    return (
        <PageWrapper>
            <div className="container px-4 py-8 max-w-4xl">
                <h1 className="text-3xl font-bold mb-2">Create a Silent Disco</h1>
                <p className="text-muted-foreground mb-8">
                    Set up your own synchronized groove session
                </p>

                <Tabs defaultValue="create" className="mb-8">
                    <TabsList className="grid w-full grid-cols-2 mb-8">
                        <TabsTrigger value="create">Create Session</TabsTrigger>
                        <TabsTrigger value="connect">Connect Music</TabsTrigger>
                    </TabsList>

                    <TabsContent value="create" className="flex justify-center">
                        <CreateDiscoForm />
                    </TabsContent>

                    <TabsContent value="connect">
                        <div className="max-w-2xl mx-auto">
                            <p className="text-center text-muted-foreground mb-6">
                                Connect your music streaming accounts to access your library and playlists
                            </p>
                            <MusicServiceConnector onConnect={handleConnect} />
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </PageWrapper>
    );
};

export default CreateDisco;