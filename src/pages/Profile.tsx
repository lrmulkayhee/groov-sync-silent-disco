import React, { useState, useEffect } from 'react';
import supabase from '@/libs/supabase';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Header from '@/components/layout/Header'; // Import Header
import Footer from '@/components/layout/Footer'; // Import Footer
import PageWrapper from '@/components/layout/PageWrapper'; // Optional wrapper for consistent layout

const AVATAR_OPTIONS = [
    { id: 'purple', color: 'bg-groove-purple' },
    { id: 'blue', color: 'bg-groove-blue' },
    { id: 'pink', color: 'bg-groove-pink' },
    { id: 'green', color: 'bg-green-500' },
    { id: 'yellow', color: 'bg-yellow-500' },
];

const Profile = () => {
    const [user, setUser] = useState<any>(null);
    const [username, setUsername] = useState('');
    const [selectedAvatar, setSelectedAvatar] = useState<string>('purple');
    const [password, setPassword] = useState('');
    const [is2FAEnabled, setIs2FAEnabled] = useState(false);

    // Fetch user data on component mount
    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error) {
                console.error('Error fetching user:', error.message);
            } else {
                setUser(user);
                setUsername(user?.user_metadata?.username || '');
                setSelectedAvatar(user?.user_metadata?.avatar || 'purple');
            }
        };

        fetchUser();
    }, []);

    // Update username
    const handleUpdateUsername = async () => {
        const { error } = await supabase.auth.updateUser({
            data: { username },
        });

        if (error) {
            toast.error('Failed to update username');
            console.error('Error updating username:', error.message);
        } else {
            toast.success('Username updated successfully');
        }
    };

    // Update avatar
    const handleUpdateAvatar = async () => {
        const { error } = await supabase.auth.updateUser({
            data: { avatar: selectedAvatar },
        });

        if (error) {
            toast.error('Failed to update avatar');
            console.error('Error updating avatar:', error.message);
        } else {
            toast.success('Avatar updated successfully');
        }
    };

    // Update password
    const handleUpdatePassword = async () => {
        const { error } = await supabase.auth.updateUser({ password });

        if (error) {
            toast.error('Failed to update password');
            console.error('Error updating password:', error.message);
        } else {
            toast.success('Password updated successfully');
        }
    };

    // Enable or disable 2FA (mock implementation)
    const handleToggle2FA = () => {
        setIs2FAEnabled(!is2FAEnabled);
        toast.success(is2FAEnabled ? '2FA disabled' : '2FA enabled');
    };

    return (
        <PageWrapper>
            <Header /> {/* Add Header */}
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>

                {user ? (
                    <div className="space-y-6">
                        {/* Username */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="border rounded px-3 py-2 w-full"
                            />
                            <Button onClick={handleUpdateUsername} className="mt-2">Update Username</Button>
                        </div>

                        {/* Avatar */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Avatar</label>
                            <div className="flex space-x-2">
                                {AVATAR_OPTIONS.map((option) => (
                                    <button
                                        key={option.id}
                                        className={`w-10 h-10 rounded-full ${option.color} ${selectedAvatar === option.id ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                                            }`}
                                        onClick={() => setSelectedAvatar(option.id)}
                                    />
                                ))}
                            </div>
                            <Button onClick={handleUpdateAvatar} className="mt-2">Update Avatar</Button>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="border rounded px-3 py-2 w-full"
                            />
                            <Button onClick={handleUpdatePassword} className="mt-2">Update Password</Button>
                        </div>

                        {/* Two-Factor Authentication */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Two-Factor Authentication</label>
                            <Button onClick={handleToggle2FA}>
                                {is2FAEnabled ? 'Disable 2FA' : 'Enable 2FA'}
                            </Button>
                        </div>
                    </div>
                ) : (
                    <p>Loading user data...</p>
                )}
            </div>
        </PageWrapper>
    );
};

export default Profile;