import React from 'react';
import { cn } from '@/libs/utils';

interface BpmDisplayProps {
    bpm: number;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

const BpmDisplay = ({ bpm, className, size = 'md' }: BpmDisplayProps) => {
    const sizes = {
        sm: 'h-16 w-16 text-lg',
        md: 'h-20 w-20 text-xl',
        lg: 'h-24 w-24 text-2xl'
    };

    return (
        <div className={cn(
            "relative flex items-center justify-center rounded-full bg-muted",
            sizes[size],
            className
        )}>
            <div className="absolute inset-0.5 rounded-full bg-gradient-to-br from-groove-purple to-groove-blue opacity-40 animate-pulse-slow" />
            <div className="absolute inset-1.5 rounded-full bg-background" />
            <div className="relative font-bold">{bpm}</div>
        </div>
    );
};

export default BpmDisplay;