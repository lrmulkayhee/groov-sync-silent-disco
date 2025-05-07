import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const CreateDiscoForm = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [bpmRange, setBpmRange] = useState([80, 160]);
    const [isCreating, setIsCreating] = useState(false);

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim()) {
            toast.error('Please enter a name for your silent disco');
            return;
        }

        setIsCreating(true);

        // Simulate API call to create a new disco session
        setTimeout(() => {
            toast.success('Silent disco created successfully!');
            navigate(`/session/${Math.random().toString(36).substring(2, 8)}`);
            setIsCreating(false);
        }, 1000);
    };

    return (
        <Card className="border-border/40 backdrop-blur-sm bg-card/80 w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl">Create a Silent Disco</CardTitle>
                <CardDescription>
                    Set up your own groove session and invite friends to join
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleCreate} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="disco-name">Session Name</Label>
                        <Input
                            id="disco-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Friday Night Grooves"
                            className="bg-background/50"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="bpm-range">BPM Range</Label>
                        <div className="pt-6 px-2">
                            <Slider
                                id="bpm-range"
                                defaultValue={bpmRange}
                                min={60}
                                max={200}
                                step={1}
                                value={bpmRange}
                                onValueChange={setBpmRange}
                            />
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground mt-2">
                            <span>{bpmRange[0]} BPM</span>
                            <span>{bpmRange[1]} BPM</span>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-groove-purple to-groove-blue hover:opacity-90"
                        disabled={isCreating}
                    >
                        {isCreating ? 'Creating...' : 'Create Silent Disco'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default CreateDiscoForm;