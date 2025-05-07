import React, { useState, useEffect } from 'react';
import supabase from '@/libs/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const Profile = () => {
    const [user, setUser] = useState<any>(null);
    const [username, setUsername] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
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
                setAvatarUrl(user?.user_metadata?.avatar_url || '');
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
            data: { avatar_url: avatarUrl },
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
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>

            {user ? (
                <div className="space-y-6">
                    {/* Username */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Username</label>
                        <Input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                        />
                        <Button className="mt-2" onClick={handleUpdateUsername}>
                            Update Username
                        </Button>
                    </div>

                    {/* Avatar */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Avatar URL</label>
                        <Input
                            type="text"
                            value={avatarUrl}
                            onChange={(e) => setAvatarUrl(e.target.value)}
                            placeholder="Enter avatar URL"
                        />
                        <Button className="mt-2" onClick={handleUpdateAvatar}>
                            Update Avatar
                        </Button>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Password</label>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter new password"
                        />
                        <Button className="mt-2" onClick={handleUpdatePassword}>
                            Update Password
                        </Button>
                    </div>

                    {/* Two-Factor Authentication */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Two-Factor Authentication</label>
                        <Button
                            variant={is2FAEnabled ? 'destructive' : 'default'}
                            onClick={handleToggle2FA}
                        >
                            {is2FAEnabled ? 'Disable 2FA' : 'Enable 2FA'}
                        </Button>
                    </div>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
};

export default Profile;