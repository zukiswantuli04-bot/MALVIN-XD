const { malvin, commands } = require('../malvin');
const axios = require('axios');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, sleep, fetchJson } = require('../lib/functions2');

malvin({
    pattern: "hacker",
    desc: "Create a 3D hacker-style text effect",
    category: "logo",
    react: "🎨",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    try {
        if (!args.length) {
            return reply("❌ Please provide a name. Example: .hacker king");
        }

        const name = args.join(" ");

        // URL for the 3D hacker-style text effect with user-provided name
        const apiUrl = `https://en.ephoto360.com/create-anonymous-hacker-avatars-cyan-neon-677.html&name=${encodeURIComponent(name)}`;

        // Fetch the URL or page content (this may require web scraping, or manual checking of the result)
        const result = await axios.get(apiUrl);
        
        // Check if the page contains the expected image URL
        const imageUrl = extractImageUrl(result.data); // This will need to be implemented to scrape the correct image URL

        // If no image URL is found, return an error message
        if (!imageUrl) {
            return reply("❌ Could not generate the hacker-style text. Please try again later.");
        }

        // Send the generated image
        await conn.sendMessage(from, {
            image: { url: imageUrl },
            caption: `Here is your hacker-style text for: ${name}`
        });

    } catch (e) {
        console.error("Error in hacker text command:", e);
        return reply(`*An error occurred while processing your request.*\n\n_Error:_ ${e.message}`);
    }
});

// Helper function to extract the image URL from the page content (this is just a placeholder)
function extractImageUrl(pageContent) {
    // Implement web scraping logic here to extract the correct image URL from the HTML content
    // For example, look for the image URL in the HTML using a regex or a library like Cheerio
    // Here's a placeholder example assuming a 'download_url' is present somewhere in the HTML
    const regex = /"download_url":"(https:\/\/[^\"]+)"/;
    const match = pageContent.match(regex);
    return match ? match[1] : null;
}
