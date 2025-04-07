/*
Project Name : MALVIN XD
Creator      : Malvin King (Mr. Lord Malvin)
Repo         : https://github.com/XdKing2/MALVIN-XD
Support      : wa.me/263714757857

### ⚠️ Disclaimer

- 🔒 This bot is **not affiliated with WhatsApp Inc.** Use it responsibly.
- 🚨 **Misuse may lead to account bans.**
- ❌ **Cloning or modifying the bot without permission is prohibited.**

---
*/

const config = require('../settings');
const { malvin, commands } = require('../malvin');


malvin({
    pattern: "about",
    alias: ["about"],
    react: "🧠",
    desc: "Get information about the bot and its creator.",
    category: "info",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let madeMenu = `╭┄┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅

*👋 Hello ${pushname}!*

I am *Malvin Xd*, a WhatsApp-based multi-device bot created by *Malvin King* from Zimbabwe.  
My sole purpose is to reduce the burden or cost of purchasing data bundles by allowing users to download songs, apps, videos, and movies using WhatsApp bundles.

For more information, please visit:

> *SOURCE CODE* : https://github.com/XdKing2/MALVIN-XD  
> *FOLLOW OWNER* : https://github.com/XdKing2/  
> *OWNER* : https://wa.me/263780166288/?text=ᴍᴀʟᴠɪɴ-xᴅ+Fan+Here  
> *SUPPORT CHANNEL* : https://whatsapp.com/channel/0029VbA6MSYJUM2TVOzCSb2A  
> *INSTAGRAM* : https://instagram.com/Techlord01/  
> *YOUTUBE* : https://youtube.com/@malvintech2/

*RELEASE DATE* — *7 APRIL 2025*

*— Lord Malvin*

━━━━━━━━━━━━━━━━━━━━━━━━
`;

        // Send image and info message
        await conn.sendMessage(
            from,
            {
                image: { url: 'https://files.catbox.moe/l1uebm.jpg' },
                caption: madeMenu,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363398430045533@newsletter',
                        newsletterName: '🪀『 𝙼𝙰𝙻𝚅𝙸𝙽-𝚇𝙳 』🪀 ',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

        // Send audio message
        await conn.sendMessage(from, {
            audio: { url: 'https://github.com/XdKing2/MALVIN-DATA/raw/refs/heads/main/autovoice/alive.mp3' },
            mimetype: 'audio/mp3',
            ptt: true
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
