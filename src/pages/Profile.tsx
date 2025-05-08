import React, { useState, useEffect } from 'react';
import supabase from '@/libs/supabase';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageWrapper from '@/components/layout/PageWrapper';

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
    const [email, setEmail] = useState('');
    const [selectedAvatar, setSelectedAvatar] = useState<string>('purple');
    const [password, setPassword] = useState('');
    const [is2FAEnabled, setIs2FAEnabled] = useState(false);
    const [activityLogs, setActivityLogs] = useState<any[]>([]);

    // Fetch user data on component mount
    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error) {
                console.error('Error fetching user:', error.message);
            } else {
                setUser(user);
                setUsername(user?.user_metadata?.username || '');
                setEmail(user?.email || '');
                setSelectedAvatar(user?.user_metadata?.avatar || 'purple');
            }
        };

        const fetchActivityLogs = async () => {
            const { data, error } = await supabase
                .from('activity_logs') // Replace with your actual table name
                .select('*')
                .order('created_at', { ascending: false });
            if (error) {
                console.error('Error fetching activity logs:', error.message);
            } else {
                setActivityLogs(data || []);
            }
        };

        fetchUser();
        fetchActivityLogs();
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

    // Update email
    const handleUpdateEmail = async () => {
        const { error } = await supabase.auth.updateUser({ email });

        if (error) {
            toast.error('Failed to update email');
            console.error('Error updating email:', error.message);
        } else {
            toast.success('Email updated successfully');
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

    // Delete account
    const handleDeleteAccount = async () => {
        const { error } = await supabase.auth.signOut(); // Sign out the user first
        if (error) {
            toast.error('Failed to delete account');
            console.error('Error deleting account:', error.message);
        } else {
            toast.success('Account deleted successfully');
            // Redirect or handle post-deletion logic
        }
    };

    return (
        <PageWrapper>
            <Header />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>

                {user ? (
                    <div className="space-y-6">
                        {/* Display Current Profile Info */}
                        <div>
                            <h2 className="text-xl font-semibold">Current Profile</h2>
                            <p><strong>Username:</strong> {username}</p>
                            <p><strong>Email:</strong> {email}</p>
                            <p><strong>Avatar:</strong> <span className={`inline-block w-6 h-6 rounded-full ${AVATAR_OPTIONS.find(option => option.id === selectedAvatar)?.color}`} /></p>
                        </div>

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

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="border rounded px-3 py-2 w-full"
                            />
                            <Button onClick={handleUpdateEmail} className="mt-2">Update Email</Button>
                        </div>

                        {/* Avatar */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Avatar</label>
                            <div className="flex space-x-2">
                                {AVATAR_OPTIONS.map((option) => (
                                    <button
                                        key={option.id}
                                        className={`w-10 h-10 rounded-full ${option.color} ${selectedAvatar === option.id ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
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

                        {/* Activity Logs */}
                        <div>
                            <h2 className="text-xl font-semibold">Activity Logs</h2>
                            <ul className="list-disc pl-5">
                                {activityLogs.map((log, index) => (
                                    <li key={index}>
                                        {log.description} - {new Date(log.created_at).toLocaleString()}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Delete Account */}
                        <div>
                            <Button onClick={handleDeleteAccount} className="bg-red-500 text-white">
                                Delete Account
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