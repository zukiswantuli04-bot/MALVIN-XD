/*
Project Name : MALVIN XMD
Creator      : Malvin King ( Mr Lord Malvin )
Repo         : https://github.com/kingmalvn/MALVIN-XMD
Support      : wa.me/263714757857
*/

const config = require('../settings');
const { malvin, commands } = require('../malvin');

malvin({
    pattern: "intro",
    alias: ["king"],
    react: "🧠",
    desc: "get owner dec",
    category: "info",
    filename: __filename
}, async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
    try {
        let madeMenu = `
   *MALVIN XD WHATSAPP USER BOT* 💫

                *MY MISSION*

🐼 This is the result of my hard work, and I, Malvin King, own the bot's rights and code rights. Therefore, you have no chance to change and submit my bot under any circumstances. There are 100+ commands, logo, thumbnail, banner maker commands, AI chatbot features, and more.

🐼 The main hope of creating this bot is to take full advantage of WhatsApp and make its work easier.

💡 Various things can be downloaded from this bot. It also helps in managing groups, making logos, editing images in different ways, searching for different things, and more features included.

⚠️ If your WhatsApp account gets banned by using this, I am not responsible. You should take responsibility for it.

👨‍💻 OWNER: Malvin King 

🎡 *GITHUB:*  https://github.com/XdKing2/

🎡 *GITHUB:*  https://github.com/XdKing2/MALVIN-XD

🪩 *MY GROUP:* https://whatsapp.com/channel/0029VbA6MSYJUM2TVOzCSb2A

*Please star the repo and follow me on GitHub* 
`;

        // Send the image and text message
        await conn.sendMessage(
            from,
            {
                image: { url: 'https://files.catbox.moe/y65ffs.jpg' },
                caption: madeMenu,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363398430045533@newsletter',
                        newsletterName: '🪀『 𝙼𝙰𝙻𝚅𝙸𝙽-𝚇𝙳 』🪀',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

        // Send the intro audio
        await conn.sendMessage(from, {
            audio: { url: 'https://github.com/XdKing2/MALVIN-DATA/raw/refs/heads/main/autovoice/menu.mp3' },
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });

        // Reply to confirm processing
        reply('The intro has been sent successfully!');

    } catch (e) {
        console.log(e);
        reply(`❌ An error occurred: ${e.message || e}`);
    }
});
