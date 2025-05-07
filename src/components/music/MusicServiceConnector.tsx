import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Music, AppleIcon } from 'lucide-react';
import { toast } from 'sonner';

interface MusicServiceProps {
    onConnect: (service: 'spotify' | 'apple') => void;
}

const SpotifyLogo = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" fill="#1ED760" />
        <path d="M16.7544 16.3796C16.5438 16.7158 16.1163 16.8141 15.78 16.6035C13.5492 15.2255 10.7683 14.9296 7.25919 15.7362C6.87311 15.8345 6.49709 15.6043 6.39879 15.2182C6.30049 14.8321 6.53068 14.4561 6.91676 14.3578C10.7683 13.4529 13.8752 13.8095 16.4288 15.3562C16.765 15.5668 16.8633 15.9943 16.6527 16.3305V16.3796ZM17.9651 13.7604C17.6977 14.1761 17.1621 14.2842 16.7462 14.0267C14.184 12.4505 10.2818 11.9937 7.08063 12.9676C6.61361 13.1094 6.12628 12.8519 5.98458 12.3946C5.84288 11.9274 6.10037 11.4502 6.5576 11.2984C10.2032 10.1819 14.5014 10.6977 17.4989 12.5289C17.9149 12.7864 18.0326 13.3319 17.7651 13.7476V13.7604ZM18.0537 11.075C15.0072 9.27632 9.99159 9.13462 6.78964 10.1131C6.24263 10.2843 5.67021 9.97724 5.49902 9.43023C5.32784 8.88322 5.6349 8.3108 6.18191 8.13961C9.84653 7.02315 15.3925 7.18454 18.8798 9.26654C19.3861 9.56383 19.5083 10.2327 19.211 10.739C18.9137 11.2451 18.2449 11.3673 17.7388 11.0701L18.0537 11.075Z" fill="#191414" />
    </svg>
);

const AppleMusicLogo = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="12" fill="white" />
        <path d="M18.919 11.6999C18.8895 9.87621 19.7949 8.59245 21.6185 7.71646C20.5693 6.20801 18.9692 5.36138 16.9137 5.24241C14.9761 5.12343 12.8325 6.44655 12.0745 6.44655C11.2579 6.44655 9.34971 5.30062 7.87063 5.30062C4.48555 5.35883 0.833313 8.13507 0.833313 13.7972C0.833313 15.5149 1.14891 17.2908 1.77906 19.1253C2.61493 21.5126 5.45972 24.8394 8.44204 24.7496C9.8624 24.6997 10.8922 23.6707 12.7453 23.6707C14.5397 23.6707 15.4843 24.7496 17.0844 24.7496C20.0959 24.6997 22.6717 21.6901 23.4587 19.3029C19.4252 17.3785 18.919 11.8483 18.919 11.6999ZM15.6464 3.7573C17.1548 1.98259 19.4744 2.21162 19.4744 2.21162C19.4744 2.21162 19.0877 4.39577 17.61 6.05649C16.0392 7.81185 14.0429 7.49521 14.0429 7.49521C14.0429 7.49521 13.6856 5.39315 15.6464 3.7573Z" fill="#FC3C44" />
    </svg>
);

const MusicServiceConnector = ({ onConnect }: MusicServiceProps) => {
    const handleConnect = (service: 'spotify' | 'apple') => {
        // In a real app, we would authenticate with the music service here
        // For now, we'll just simulate it with a toast
        toast.success(`Connected to ${service === 'spotify' ? 'Spotify' : 'Apple Music'}!`);
        onConnect(service);
    };

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-border/40 backdrop-blur-sm bg-card/80">
                <CardHeader className="pb-4">
                    <div className="flex items-center gap-2">
                        <SpotifyLogo />
                        <CardTitle>Spotify</CardTitle>
                    </div>
                    <CardDescription>
                        Connect your Spotify account to sync your playlists
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button
                        className="w-full bg-[#1ED760] hover:bg-[#1DB954] text-black"
                        onClick={() => handleConnect('spotify')}
                    >
                        Connect Spotify
                    </Button>
                </CardContent>
            </Card>

            <Card className="border-border/40 backdrop-blur-sm bg-card/80">
                <CardHeader className="pb-4">
                    <div className="flex items-center gap-2">
                        <AppleMusicLogo />
                        <CardTitle>Apple Music</CardTitle>
                    </div>
                    <CardDescription>
                        Connect your Apple Music account to sync your playlists
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button
                        className="w-full bg-gradient-to-r from-[#FA233B] to-[#FB5C74] hover:opacity-90 text-white"
                        onClick={() => handleConnect('apple')}
                    >
                        Connect Apple Music
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default MusicServiceConnector;