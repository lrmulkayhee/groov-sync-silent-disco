import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider'; // Ensure your UI library supports range sliders

interface CreateDiscoFormProps {
    onSubmit: (data: { name: string; bpmRange: [number, number] }) => void; // Updated to include bpmRange
    isCreating: boolean;
}

const CreateDiscoForm: React.FC<CreateDiscoFormProps> = ({ onSubmit, isCreating }) => {
    const [name, setName] = useState('');
    const [bpmRange, setBpmRange] = useState<[number, number]>([60, 200]); // Default range

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name) {
            alert('Please enter a name for the disco session.');
            return;
        }
        onSubmit({ name, bpmRange });
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
            <div>
                <Label htmlFor="name">Disco Name</Label>
                <Input
                    id="name"
                    type="text"
                    placeholder="Enter disco name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <Label htmlFor="bpmRange">BPM Range</Label>
                <div className="flex items-center gap-4">
                    <Slider
                        id="bpmRange"
                        value={bpmRange}
                        onValueChange={(value) => setBpmRange(value as [number, number])}
                        min={60}
                        max={200}
                        step={1}
                        // Ensure the Slider component supports range sliders or use a library/component that does
                    />
                    <div className="text-sm text-muted-foreground">
                        {bpmRange[0]} - {bpmRange[1]} BPM
                    </div>
                </div>
            </div>
            <Button type="submit" disabled={isCreating}>
                {isCreating ? 'Creating...' : 'Create Disco'}
            </Button>
        </form>
    );
};

export default CreateDiscoForm;