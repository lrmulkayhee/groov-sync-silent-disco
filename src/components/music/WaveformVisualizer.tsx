import React from 'react';
import { cn } from '@/lib/utils';

interface WaveformVisualizerProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    active?: boolean;
}

const WaveformVisualizer = ({
    className,
    size = 'md',
    active = true
}: WaveformVisualizerProps) => {
    const heights = {
        sm: 'h-12',
        md: 'h-16',
        lg: 'h-24'
    };

    const barWidths = {
        sm: 'w-0.5',
        md: 'w-1',
        lg: 'w-1.5'
    };

    return (
        <div className={cn(
            "flex items-center justify-center",
            heights[size],
            className
        )}>
            {[...Array(7)].map((_, i) => (
                <div
                    key={i}
                    className={cn(
                        barWidths[size],
                        "rounded-full mx-0.5",
                        active ? "wave-bar" : "bg-muted h-1/3"
                    )}
                    style={{
                        animationDelay: active ? `${i * 0.2}s` : "0s"
                    }}
                />
            ))}
        </div>
    );
};

export default WaveformVisualizer;