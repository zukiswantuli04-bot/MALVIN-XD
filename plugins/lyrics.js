const axios = require('axios');
const { malvin } = require('../malvin');

// API Keys and URLs
const GENIUS_API_KEY = "2zpESYSuWr5fqw9zH-l4HeiIckPBR3JAaKw0tHCch7U71YTwBKLRm2UflKL7z6Pt"; // Replace with your Genius API key

// Helper function to fetch lyrics from David Cyril API
async function fetchLyricsFromDavidCyrilAPI(title, artist) {
    try {
        const url = `https://apis.davidcyriltech.my.id/lyrics2?t=${encodeURIComponent(title)}&a=${encodeURIComponent(artist)}`;
        const response = await axios.get(url);

        if (!response.data || !response.data.lyrics) {
            throw new Error("Lyrics not found.");
        }

        return response.data;
    } catch (error) {
        throw new Error(error.message || "Failed to fetch lyrics from David Cyril API.");
    }
}

// Fetch lyrics from Genius API
async function fetchLyricsFromGeniusAPI(query) {
    try {
        const searchUrl = `https://api.genius.com/search?q=${encodeURIComponent(query)}`;
        const response = await axios.get(searchUrl, {
            headers: { Authorization: `Bearer ${GENIUS_API_KEY}` },
        });

        if (!response.data.response.hits.length) {
            throw new Error("No lyrics found for this song.");
        }

        const song = response.data.response.hits[0].result;
        return {
            title: song.title,
            artist: song.primary_artist.name,
            lyricsUrl: song.url
        };
    } catch (error) {
        throw new Error(error.message || "Failed to fetch lyrics from Genius API.");
    }
}

// Lyrics command using David Cyril API
malvin({
    pattern: "lyrics",
    alias: ["lyric"],
    react: "🔮",
    desc: "Fetches lyrics for a song via an API.",
    category: "search",
    filename: __filename,
}, async (conn, mek, m, { reply, q }) => {
    try {
        if (!q) {
            return reply("❌ Please provide the title and artist, separated by a comma.\nExample: `.lyrics faded, Alan Walker`");
        }

        const parts = q.split(",");
        if (parts.length < 2) {
            return reply("❌ Please provide both the title and the artist, separated by a comma.");
        }

        const title = parts[0].trim();
        const artist = parts[1].trim();

        const data = await fetchLyricsFromDavidCyrilAPI(title, artist);

        const caption = `🎵 *Title:* ${data.title}\n🎤 *Artist:* ${data.artist}\n\n📝 *Lyrics:*\n${data.lyrics}`;
        reply(caption);
    } catch (error) {
        console.error(error);
        reply("❌ An error occurred: " + error.message);
    }
});

// Lyrics command using Genius API
malvin({
    pattern: "lyrics2",
    alias: ["lyric2"],
    react: "🔮",
    desc: "Fetches lyrics for a song via Genius API.",
    category: "search",
    filename: __filename,
}, async (conn, mek, m, { reply, q }) => {
    try {
        if (!q) {
            return reply("❌ Please provide the song title.\nExample: `.lyrics Faded`");
        }

        const data = await fetchLyricsFromGeniusAPI(q);

        reply(`🎵 *Title:* ${data.title}\n🎤 *Artist:* ${data.artist}\n🔗 *Lyrics:* [Click here](${data.lyricsUrl})`);
    } catch (error) {
        console.error(error);
        reply("❌ An error occurred: " + error.message);
    }
});
