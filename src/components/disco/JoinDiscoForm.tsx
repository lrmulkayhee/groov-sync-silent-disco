import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const JoinDiscoForm = () => {
    const navigate = useNavigate();
    const [code, setCode] = useState('');
    const [isJoining, setIsJoining] = useState(false);

    const handleJoin = (e: React.FormEvent) => {
        e.preventDefault();

        if (!code.trim()) {
            toast.error('Please enter a session code');
            return;
        }

        setIsJoining(true);

        // Simulate API call to join a disco session
        setTimeout(() => {
            navigate(`/session/${code}`);
            setIsJoining(false);
        }, 1000);
    };

    return (
        <Card className="border-border/40 backdrop-blur-sm bg-card/80 w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl">Join a Silent Disco</CardTitle>
                <CardDescription>
                    Enter a session code to join an existing groove session
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleJoin} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="session-code">Session Code</Label>
                        <Input
                            id="session-code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="Enter 6-digit code"
                            className="bg-background/50"
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-groove-purple to-groove-blue hover:opacity-90"
                        disabled={isJoining}
                    >
                        {isJoining ? 'Joining...' : 'Join Silent Disco'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default JoinDiscoForm;