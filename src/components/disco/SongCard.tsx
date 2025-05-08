import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause } from 'lucide-react';
import BpmDisplay from '@/components/music/BpmDisplay';
import { cn } from '@/libs/utils';

export interface Song {
    id: string;
    title: string;
    artist: string;
    album?: string;
    coverUrl: string;
    bpm: number;
    duration?: number;
    service: 'spotify' | 'apple';
    audioUrl?: string;
}

interface SongCardProps {
    song: Song;
    isPlaying?: boolean;
    isSelected?: boolean;
    onSelect?: () => void;
    onPlay?: () => void;
    className?: string;
}

const SongCard = ({
    song,
    isPlaying = false,
    isSelected = false,
    onSelect,
    onPlay,
    className
}: SongCardProps) => {
    return (
        <Card
            className={cn(
                "overflow-hidden transition-all duration-300 cursor-pointer group h-full",
                isSelected ? "border-primary ring-1 ring-primary" : "border-border/40 hover:border-border",
                className
            )}
            onClick={onSelect}
        >
            <CardContent className="p-0">
                <div className="relative">
                    <img
                        src={song.coverUrl}
                        alt={`${song.title} by ${song.artist}`}
                        className="w-full aspect-square object-cover"
                    />
                    {isSelected && (
                        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center">
                            <BpmDisplay bpm={song.bpm} />
                        </div>
                    )}
                    <Button
                        size="icon"
                        variant="secondary"
                        className={cn(
                            "absolute bottom-2 right-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity",
                            isPlaying && "opacity-100"
                        )}
                        onClick={(e) => {
                            e.stopPropagation();
                            onPlay?.();
                        }}
                    >
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                </div>
                <div className="p-4">
                    <h3 className="font-medium truncate">{song.title}</h3>
                    <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
                    <div className="flex justify-between items-center mt-2">
                        <div className="text-xs text-muted-foreground">
                            BPM: {song.bpm}
                        </div>
                        <div className="flex items-center">
                            {song.service === 'spotify' ? (
                                <svg width="16" height="16" viewBox="0 0 24 24" className="text-[#1ED760] fill-current">
                                    <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" />
                                    <path d="M16.7544 16.3796C16.5438 16.7158 16.1163 16.8141 15.78 16.6035C13.5492 15.2255 10.7683 14.9296 7.25919 15.7362C6.87311 15.8345 6.49709 15.6043 6.39879 15.2182C6.30049 14.8321 6.53068 14.4561 6.91676 14.3578C10.7683 13.4529 13.8752 13.8095 16.4288 15.3562C16.765 15.5668 16.8633 15.9943 16.6527 16.3305V16.3796ZM17.9651 13.7604C17.6977 14.1761 17.1621 14.2842 16.7462 14.0267C14.184 12.4505 10.2818 11.9937 7.08063 12.9676C6.61361 13.1094 6.12628 12.8519 5.98458 12.3946C5.84288 11.9274 6.10037 11.4502 6.5576 11.2984C10.2032 10.1819 14.5014 10.6977 17.4989 12.5289C17.9149 12.7864 18.0326 13.3319 17.7651 13.7476V13.7604ZM18.0537 11.075C15.0072 9.27632 9.99159 9.13462 6.78964 10.1131C6.24263 10.2843 5.67021 9.97724 5.49902 9.43023C5.32784 8.88322 5.6349 8.3108 6.18191 8.13961C9.84653 7.02315 15.3925 7.18454 18.8798 9.26654C19.3861 9.56383 19.5083 10.2327 19.211 10.739C18.9137 11.2451 18.2449 11.3673 17.7388 11.0701L18.0537 11.075Z" className="fill-black" />
                                </svg>
                            ) : (
                                <svg width="16" height="16" viewBox="0 0 24 24" className="text-[#FC3C44] fill-current">
                                    <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" fill="white" />
                                    <path d="M18.919 11.6999C18.8895 9.87621 19.7949 8.59245 21.6185 7.71646C20.5693 6.20801 18.9692 5.36138 16.9137 5.24241C14.9761 5.12343 12.8325 6.44655 12.0745 6.44655C11.2579 6.44655 9.34971 5.30062 7.87063 5.30062C4.48555 5.35883 0.833313 8.13507 0.833313 13.7972C0.833313 15.5149 1.14891 17.2908 1.77906 19.1253C2.61493 21.5126 5.45972 24.8394 8.44204 24.7496C9.8624 24.6997 10.8922 23.6707 12.7453 23.6707C14.5397 23.6707 15.4843 24.7496 17.0844 24.7496C20.0959 24.6997 22.6717 21.6901 23.4587 19.3029C19.4252 17.3785 18.919 11.8483 18.919 11.6999ZM15.6464 3.7573C17.1548 1.98259 19.4744 2.21162 19.4744 2.21162C19.4744 2.21162 19.0877 4.39577 17.61 6.05649C16.0392 7.81185 14.0429 7.49521 14.0429 7.49521C14.0429 7.49521 13.6856 5.39315 15.6464 3.7573Z" />
                                </svg>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default SongCard;