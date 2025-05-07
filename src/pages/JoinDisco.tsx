import React from 'react';
import PageWrapper from '@/components/layout/PageWrapper';
import JoinDiscoForm from '@/components/disco/JoinDiscoForm';
import DiscoSession from '@/components/disco/DiscoSession';
import { useNavigate } from 'react-router-dom';

// Mock data for active sessions
const MOCK_SESSIONS = [
    {
        id: 'abc123',
        name: 'Friday Night Vibes',
        hostName: 'DJ Alex',
        participants: 12,
        bpm: 128,
        isActive: true
    },
    {
        id: 'def456',
        name: 'Chill Beats Only',
        hostName: 'Maya',
        participants: 5,
        bpm: 90,
        isActive: true
    },
    {
        id: 'ghi789',
        name: 'Dance Party',
        hostName: 'Carlos',
        participants: 8,
        bpm: 140,
        isActive: true
    }
];

const JoinDisco = () => {
    const navigate = useNavigate();

    const handleJoinSession = (id: string) => {
        navigate(`/session/${id}`);
    };

    return (
        <PageWrapper>
            <div className="container px-4 py-8 max-w-4xl">
                <h1 className="text-3xl font-bold mb-2">Join a Silent Disco</h1>
                <p className="text-muted-foreground mb-8">
                    Enter a session code or join an active public session
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div>
                        <h2 className="text-xl font-medium mb-4">Enter a Session Code</h2>
                        <JoinDiscoForm />
                    </div>

                    <div>
                        <h2 className="text-xl font-medium mb-4">Popular Public Sessions</h2>
                        <div className="space-y-4">
                            {MOCK_SESSIONS.map((session) => (
                                <DiscoSession
                                    key={session.id}
                                    id={session.id}
                                    name={session.name}
                                    hostName={session.hostName}
                                    participants={session.participants}
                                    bpm={session.bpm}
                                    isActive={session.isActive}
                                    onJoin={() => handleJoinSession(session.id)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};

export default JoinDisco;