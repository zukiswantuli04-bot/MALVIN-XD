const { malvin } = require('../malvin');

malvin({
    pattern: "dev2",
    alias: ["developer2", "owner2"],
    desc: "Displays the developer info",
    category: "admin",
    react: "👨‍💻",
    filename: __filename
}, async (conn, mek, m, {
    from, reply, pushname
}) => {
    try {
        const name = pushname || "there";

        const text = `
╭──⌈ *𝗠𝗔𝗟𝗩𝗜𝗡-𝗫𝗗 𝗗𝗘𝗩𝗘𝗟𝗢𝗣𝗘𝗥* ⌋──╮
│
│ 👋 Hello *${name}*,
│
│ 🤖 I’m *𝙈𝘼𝙇𝙑𝙄𝙉-𝙓𝘿*, a powerful WhatsApp bot
│    created by *Malvin King*!
│
│ 👨‍💻 *OWNER DETAILS:*
│ ───────────────
│ 🧠 *Name* : Malvin King
│ ☎️ *Contact* : wa.me/263714757857
│ ▶️ *YouTube* : MalvinTech2
│    https://youtube.com/@malvintech2
│ 💻 *Source Code* : Coming soon...
│
╰──「 ⚡ Powered by Malvin King 」──╯
        `.trim();

        await conn.sendMessage(
            from,
            {
                image: { url: 'https://files.catbox.moe/vfv7n6.jpg' },
                caption: text,
                footer: 'Contact & Support',
                buttons: [
                    {
                        buttonId: `callowner`,
                        buttonText: { displayText: '📞 Call Owner' },
                        type: 1
                    },
                    {
                        buttonId: `https://youtube.com/@malvintech2`,
                        buttonText: { displayText: '🎬 Join Channel' },
                        type: 1
                    },
                    {
                        buttonId: `https://github.com/XdKing2/MALVIN-XD`, // Replace with your actual source repo if ready
                        buttonText: { displayText: '💻 View Source' },
                        type: 1
                    }
                ],
                headerType: 4,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    externalAdReply: {
                        title: "Malvin-XD Bot",
                        body: "Created with love by Malvin King",
                        thumbnailUrl: 'https://files.catbox.moe/vfv7n6.jpg',
                        mediaType: 1,
                        renderLargerThumbnail: true,
                        mediaUrl: "https://youtube.com/@malvintech2",
                        sourceUrl: "https://youtube.com/@malvintech2"
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.error("Error in .dev command:", e);
        reply(`❌ Error: ${e.message}`);
    }
});
