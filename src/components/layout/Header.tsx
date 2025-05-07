import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import supabase from '@/libs/supabase';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/libs/utils';

const Header = () => {
    const [user, setUser] = useState<any>(null);
    const navigate = useNavigate();

    // Fetch the signed-in user's data
    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };

        fetchUser();
    }, []);

    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (!error) {
            setUser(null);
            navigate('/'); // Redirect to home after sign-out
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
            <div className="container flex items-center justify-between h-16 px-4 md:px-6">
                <Link to="/" className="flex items-center gap-2">
                    <div className="relative h-8 w-8">
                        <div className="absolute inset-0 bg-groove-purple rounded-full opacity-75 animate-pulse-slow"></div>
                        <div className="absolute inset-1 bg-groove-blue rounded-full rotate-45 opacity-75 animate-spin-slow"></div>
                        <div className="absolute inset-2 bg-black rounded-full flex items-center justify-center">
                            <div className="h-1.5 w-1.5 bg-white rounded-full"></div>
                        </div>
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-groove-purple via-groove-blue to-groove-pink">
                        GroovSync
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-6">
                    <NavLinks className="flex gap-6" />
                    {user ? (
                        <div className="flex items-center gap-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-sm font-medium"
                                onClick={() => navigate('/profile')} // Navigate to Profile Page
                            >
                                {user.user_metadata?.full_name || 'Profile'}
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleSignOut} // Sign out button
                            >
                                Sign Out
                            </Button>
                        </div>
                    ) : (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => supabase.auth.signInWithOAuth({ provider: 'google' })}
                        >
                            Sign In
                        </Button>
                    )}
                </div>

                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="bg-background">
                        <div className="flex flex-col gap-6 mt-8">
                            <NavLinks className="flex flex-col gap-4" />
                            {user ? (
                                <div className="flex flex-col gap-4">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-sm font-medium"
                                        onClick={() => navigate('/profile')} // Navigate to Profile Page
                                    >
                                        {user.user_metadata?.full_name || 'Profile'}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handleSignOut} // Sign out button
                                    >
                                        Sign Out
                                    </Button>
                                </div>
                            ) : (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => supabase.auth.signInWithOAuth({ provider: 'google' })}
                                >
                                    Sign In
                                </Button>
                            )}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
};

const NavLinks = ({ className }: { className?: string }) => {
    return (
        <nav className={cn("text-sm font-medium", className)}>
            <Link to="/" className="text-foreground/80 hover:text-foreground transition">
                Home
            </Link>
            <Link to="/create" className="text-foreground/80 hover:text-foreground transition">
                Create Disco
            </Link>
            <Link to="/join" className="text-foreground/80 hover:text-foreground transition">
                Join Disco
            </Link>
            <Link to="/library" className="text-foreground/80 hover:text-foreground transition">
                My Library
            </Link>
        </nav>
    );
};

export default Header;