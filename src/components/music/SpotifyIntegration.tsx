import React, { useState } from 'react';

const SpotifyIntegration = () => {
    const [accessToken, setAccessToken] = useState('');
    const [playlists, setPlaylists] = useState([]);

    const handleSpotifyLogin = () => {
        const clientId = 'YOUR_SPOTIFY_CLIENT_ID';
        const redirectUri = 'http://localhost:3000/callback'; // Replace with your redirect URI
        const scopes = 'playlist-read-private user-read-email';

        const authUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&scope=${encodeURIComponent(
            scopes
        )}&redirect_uri=${encodeURIComponent(redirectUri)}`;

        window.location.href = authUrl;
    };

    const fetchPlaylists = async () => {
        const response = await fetch('https://api.spotify.com/v1/me/playlists', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const data = await response.json();
        setPlaylists(data.items || []);
    };

    return (
        <div>
            <button onClick={handleSpotifyLogin}>Connect to Spotify</button>
            {accessToken && <button onClick={fetchPlaylists}>Fetch Playlists</button>}
            <ul>
                {playlists.map((playlist) => (
                    <li key={playlist.id}>{playlist.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default SpotifyIntegration;