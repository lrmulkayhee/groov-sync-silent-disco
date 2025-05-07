import React, { useEffect, useState } from "react";
import supabase from "@/libs/supabase";
import { Button } from "@/components/ui/button";
import { UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SignInButton = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Check if the user is already signed in
    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };

        fetchUser();
    }, []);

    const handleSignIn = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "google",
        });

        if (error) {
            console.error("Sign-in error:", error.message);
        } else if (data?.url) {
            console.log("Sign-in successful, redirecting to:", data.url);
            window.location.href = data.url; // Redirect to Google sign-in
        }
    };

    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Sign-out error:", error.message);
        } else {
            setUser(null); // Clear the user state
        }
    };

    // Redirect to Library after sign-in
    useEffect(() => {
        const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === "SIGNED_IN") {
                setUser(session?.user);
                navigate("/library"); // Redirect to Library
            }
        });

        return () => subscription?.subscription.unsubscribe();
    }, [navigate]);

    return user ? (
        <Button variant="outline" size="sm" className="gap-2" onClick={handleSignOut}>
            {user.user_metadata?.avatar_url ? (
                <img
                    src={user.user_metadata.avatar_url}
                    alt="Avatar"
                    className="h-6 w-6 rounded-full"
                />
            ) : (
                <UserCircle className="h-6 w-6" />
            )}
            <span>{user.user_metadata?.full_name || "Profile"}</span>
        </Button>
    ) : (
        <Button variant="outline" size="sm" className="gap-2" onClick={handleSignIn}>
            <UserCircle className="h-6 w-6" />
            <span>Sign In</span>
        </Button>
    );
};

export default SignInButton;