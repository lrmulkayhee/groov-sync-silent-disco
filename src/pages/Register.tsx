import React, { useState } from 'react';
import supabase from '@/libs/supabase';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import PageWrapper from '../components/layout/PageWrapper';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // Handle email/password sign-up
    const handleSignUp = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            toast.error('Sign-up failed: ' + error.message);
        } else {
            toast.success('Sign-up successful! Please check your email to confirm your account.');
        }
        setLoading(false);
    };

    // Handle email/password sign-in
    const handleSignIn = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            toast.error('Sign-in failed: ' + error.message);
        } else {
            toast.success('Sign-in successful!');
        }
        setLoading(false);
    };

    // Handle Google OAuth sign-in
    const handleGoogleSignIn = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        });

        if (error) {
            toast.error('Google sign-in failed: ' + error.message);
        }
    };

    return (
        <PageWrapper>
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-3xl font-bold mb-6 text-center">Create or Sign In to Your Account</h1>
                <div className="max-w-md mx-auto space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border rounded px-3 py-2 w-full"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border rounded px-3 py-2 w-full text-black"
                            placeholder="Enter your password"
                        />
                    </div>
                    <div className="space-y-2">
                        <Button
                            onClick={handleSignUp}
                            className="w-full bg-gradient-to-r from-groove-purple to-groove-blue hover:opacity-90"
                            disabled={loading}
                        >
                            {loading ? 'Signing Up...' : 'Sign Up'}
                        </Button>
                        <Button
                            onClick={handleSignIn}
                            className="w-full bg-gradient-to-r from-groove-blue to-groove-purple hover:opacity-90"
                            disabled={loading}
                        >
                            {loading ? 'Signing In...' : 'Sign In'}
                        </Button>
                        <Button
                            onClick={handleGoogleSignIn}
                            className="w-full bg-gradient-to-r from-groove-pink to-groove-purple hover:opacity-90"
                        >
                            Sign In with Google
                        </Button>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};

export default Register;