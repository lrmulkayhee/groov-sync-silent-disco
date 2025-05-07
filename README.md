# Groove Sync Silent Disco 🎶

## Groove Sync Silent Disco Overview

Groove Sync Silent Disco is a **web application** that allows users to create and join synchronized music sessions. Users can connect their **Spotify** or **Apple Music** accounts, browse their music libraries, and enjoy a shared musical experience with friends.

---

## Features

- 🎧 **Create Silent Disco Sessions**: Set up a session, invite friends, and sync music playback.
- 📚 **Music Library Integration**: Connect Spotify or Apple Music to access your playlists and songs.
- 🎵 **BPM Matching**: Filter songs by BPM to create the perfect vibe.
- 🖥️ **Interactive UI**: Intuitive and responsive design with features like tabs, cards, and sliders.
- 🔄 **Real-Time Updates**: See participants and their activity in real-time.

---

## Project Structure

```plaintext
.
├── src/
│   ├── components/
│   │   ├── disco/              # Components related to disco sessions
│   │   ├── layout/             # Layout components like Header and PageWrapper
│   │   ├── music/              # Music-related components (e.g., BpmDisplay, MusicServiceConnector)
│   │   ├── ui/                 # Reusable UI components (e.g., buttons, cards, sidebar)
│   ├── hooks/                  # Custom React hooks
│   ├── libs/                   # Utility functions
│   ├── pages/                  # Application pages (e.g., Library, CreateDisco, DiscoSession)
│   ├── App.tsx                 # Main application component
│   ├── main.tsx                # Application entry point
│   └── index.css               # Global styles
├── public/                     # Static assets
├── package.json                # Project dependencies and scripts
├── tailwind.config.ts          # Tailwind CSS configuration
├── vite.config.ts              # Vite configuration
└── README.md                   # Project documentation
```

---

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/groove-sync-silent-disco.git
    cd groove-sync-silent-disco
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Start the development server**:
    ```bash
    npm run dev
    ```

4. **Open the app** in your browser at [http://localhost:3000](http://localhost:3000).

---

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the project for production.
- `npm run preview`: Preview the production build locally.
- `npm run lint`: Run ESLint to check for code issues.

---

## Technologies Used

- **React**: Frontend library for building user interfaces.
- **React Router**: For routing and navigation.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Radix UI**: Accessible UI primitives.
- **Vite**: Fast build tool for modern web projects.
- **React Query**: For data fetching and caching.

---

## Key Components

### Pages

- **Index**: Landing page with an overview of the app.
- **CreateDisco**: Page to create a new silent disco session.
- **Library**: Music library page with BPM filtering.
- **DiscoSession**: Active session page showing participants and currently playing songs.

### Components

- **SongCard**: Displays song details with play/pause functionality.
- **BpmDisplay**: Shows the BPM of a song in a visual format.
- **MusicServiceConnector**: Connects to Spotify or Apple Music.
- **Sidebar**: Navigation menu for the app.

---

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**.
2. **Create a new branch** for your feature or bug fix.
3. **Commit your changes** and push them to your fork.
4. **Submit a pull request** with a detailed description of your changes.

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for details.

### Acknowledgment of Lucide License

Portions of this project use **Lucide icons**, which are licensed under the **ISC License**:

```
Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). 
All other copyright (c) for Lucide are held by Lucide Contributors 2022.

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
```



---

## Acknowledgments

- **Icons** by [Lucide](https://lucide.dev/).
- **Background patterns** by [Hero Patterns](https://heropatterns.com/).