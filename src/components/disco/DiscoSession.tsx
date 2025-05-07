import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, UsersRound, Music } from 'lucide-react';
import WaveformVisualizer from '@/components/music/WaveformVisualizer';
import BpmDisplay from '@/components/music/BpmDisplay';
import { toast } from 'sonner';
import { cn } from '@/libs/utils';

interface DiscoSessionProps {
    id: string;
    name: string;
    hostName: string;
    participants: number;
    bpm: number;
    isActive?: boolean;
    isHost?: boolean;
    onJoin?: () => void;
    className?: string;
}

const DiscoSession = ({
    id,
    name,
    hostName,
    participants,
    bpm,
    isActive = false,
    isHost = false,
    onJoin,
    className,
}: DiscoSessionProps) => {
    const [copied, setCopied] = useState(false);

    const handleCopyCode = () => {
        navigator.clipboard.writeText(id);
        setCopied(true);
        toast.success('Session code copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Card
            className={cn(
                "border-border/40 overflow-hidden hover:border-primary/40 transition-all duration-300",
                isActive && "border-primary/80 bg-muted/30",
                className
            )}
        >
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-xl">{name}</CardTitle>
                        <CardDescription>Hosted by {hostName}</CardDescription>
                    </div>
                    {isActive && <span className="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900/30 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:text-green-300">Live</span>}
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <UsersRound className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{participants} {participants === 1 ? 'participant' : 'participants'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Music className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{bpm} BPM</span>
                    </div>
                </div>

                <div className="flex items-center gap-4 mb-4">
                    <BpmDisplay bpm={bpm} size="sm" />
                    <WaveformVisualizer active={isActive} size="sm" />
                </div>

                <div className="flex flex-col sm:flex-row gap-2 mt-4">
                    {isHost ? (
                        <Button variant="outline" onClick={handleCopyCode} className="flex-1">
                            <Copy className={cn("mr-2 h-4 w-4", copied ? "text-green-500" : "")} />
                            {copied ? 'Copied!' : 'Share Code'}
                        </Button>
                    ) : (
                        <Button
                            onClick={onJoin}
                            className="flex-1 bg-gradient-to-r from-groove-purple to-groove-blue hover:opacity-90"
                        >
                            Join Session
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default DiscoSession;