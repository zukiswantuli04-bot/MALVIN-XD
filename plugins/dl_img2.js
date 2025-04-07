

const { malvin } = require("../malvin");
const axios = require("axios");

malvin({
    pattern: "img2",
    alias: ["image", "googleimage", "searchimg"],
    react: "🦋",
    desc: "Search and download Google images",
    category: "fun",
    use: ".img <keywords>",
    filename: __filename
}, async (conn, mek, m, { reply, args, from, command }) => {
    try {
        const query = args.join(" ");
        if (!query) {
            return reply("🖼️ Please provide a search query\nExample: .img cute cats");
        }

        await reply(`🔍 Searching images for *"${query}"*...`);

        const url = `https://apis.davidcyriltech.my.id/googleimage?query=${encodeURIComponent(query)}&safe=true`;
        const response = await axios.get(url);

        if (!response.data?.success || !response.data.results?.length) {
            return reply("❌ No images found. Try different keywords.");
        }

        const results = response.data.results;
        const selectedImages = results
            .sort(() => 0.5 - Math.random())
            .slice(0, 5);

        for (const imageUrl of selectedImages) {
            await conn.sendMessage(
                from,
                {
                    image: { url: imageUrl },
                    caption: `📷 Result for: *${query}*\n\nRequested by: @${m.sender.split('@')[0]}\n> © Powered by Malvin King`,
                    contextInfo: { mentionedJid: [m.sender] }
                },
                { quoted: mek }
            );
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        await conn.sendMessage(from, {
            text: `Want more images for *"${query}"*?`,
            buttons: [
                { buttonId: `.img ${query}`, buttonText: { displayText: "🔁 More Images" }, type: 1 }
            ],
            footer: 'Powered by Malvin King',
            headerType: 1
        }, { quoted: mek });

    } catch (error) {
        console.error('Image Search Error:', error);
        reply(`❌ Error: ${error.message || "Failed to fetch images"}`);
    }
});
