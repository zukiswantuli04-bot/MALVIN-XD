const config = require('../settings');
const { malvin, commands } = require('../malvin');
const os = require("os");
const { runtime } = require('../lib/functions');

malvin({
    pattern: "menu",
    alias: ["list"],
    desc: "menu the bot",
    react: "📜",
    category: "menu"
}, async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q,
    isGroup, sender, senderNumber, botNumber2, botNumber,
    pushname, isMe, isOwner, groupMetadata, groupName,
    participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
    try {
        const botName = config.BOT_NAME || "MALVIN-XD";
        const ownerName = config.OWNER_NAME || "ᴍᴀʟᴠɪɴ ᴋɪɴɢ";
        const botMode = config.MODE || "public";
        const botPrefix = config.PREFIX || ".";
        const botowner = config.king || "ᴍᴀʟᴠɪɴ ᴋɪɴɢ";
        const botVersion = config.version || "4.0";
        const currentTime = new Date().toLocaleString();
        const totalCommands = Object.keys(commands).length;

        let menu = {
            main: '', menu: '', download: '', group: '', owner: '', convert: '', search: '',
            utility: '', fun: '', owner1: '', sticker: '', tools: '', info: '', other: '',
            random: '', misc: '', settings: '', anime: '', support: '', nsfw: '', movie: '',
            admin: '', game: '', stalk: '', logo: '', ai: ''
        };

        for (let i = 0; i < commands.length; i++) {
            if (commands[i].pattern && !commands[i].dontAddCommandList) {
                menu[commands[i].category] += `*┊❍* ${commands[i].pattern}\n`;
            }
        }

        let desc = `
╭─❍「 *${botName}* 」 ──✨
│
│ *🔹 User Info*:
│ 🧑‍💻 *ɴᴀᴍᴇ*: *${ownerName}*  
│ 🌐 *ᴍᴏᴅᴇ*: *[${botMode}]*
│ ⏳ *ᴛɪᴍᴇ*: *${currentTime}*
│ 🔧 *ᴘʀᴇғɪx*: *[ ${botPrefix} ]*
│ 📅 *ᴜᴘᴛɪᴍᴇ*: _${runtime(process.uptime())}_
│ 👑 *ᴏᴡɴᴇʀ*: *${botowner}*
│ 📡 *ᴠᴇʀsɪᴏɴ*: *${botVersion}*
│ 🛠 *ᴄᴍᴅs*: *${totalCommands}*
╰─────────────

💬 *Reply with a number to select a category!*
─────────────
① *ᴀᴅᴍɪɴ ᴍᴇɴᴜ*  
② *ᴘʀɪᴠᴀᴛᴇ ᴍᴇɴᴜ*  
③ *ɢʜᴏsᴛ ᴍᴇɴᴜ*  
④ *ɪɴғᴏ ᴍᴇɴᴜ*  
⑤ *sᴇᴛᴛɪɴɢs ᴍᴇɴᴜ*  
⑥ *ᴏᴡɴᴇʀ ᴍᴇɴᴜ*  
⑦ *ᴅᴏᴡɴʟᴏᴀᴅ ᴍᴇɴᴜ*  
⑧ *ᴍᴏᴠɪᴇ ᴍᴇɴᴜ*  
⑨ *ᴍᴀɪɴ ᴍᴇɴᴜ*  
🔟 *ɢʀᴏᴜᴘ ᴍᴇɴᴜ*  

🔄 ⓫ *ᴄᴏɴᴠᴇʀᴛ ᴍᴇɴᴜ*  
🔍 ⓬ *sᴇᴀʀᴄʜ ᴍᴇɴᴜ*  
⚡ ⓭ *ᴜᴛɪʟɪᴛʏ ᴍᴇɴᴜ*  
🎮 ⓮ *ғᴜɴ ᴍᴇɴᴜ*  
🛠 ⓯ *ᴛᴏᴏʟs ᴍᴇɴᴜ*  
🖼 ⓰ *sᴛɪᴄᴋᴇʀ ᴍᴇɴᴜ*  
🎲 ⓱ *ʀᴀɴᴅᴏᴍ ᴍᴇɴᴜ*  
⚙️ ⓲ *ᴍɪsᴄ ᴍᴇɴᴜ*  
🎌 ⓳ *ᴀɴɪᴍᴇ ᴍᴇɴᴜ*  
💬 ⓴ *sᴜᴘᴘᴏʀᴛ ᴍᴇɴᴜ*  
🤖 ²¹ *ᴀɪ ᴍᴇɴᴜ*  
🕳️ ²² *ᴏᴛʜᴇʀ ᴍᴇɴᴜ*  
🔞 ²³ *ɴsғᴡ ᴍᴇɴᴜ*

──────────────
✨ *Join our Channel & Stay Updated!* 
🌐 [Click Here](https://tinyurl.com/2y864tjs)
──────────────
> © 2025 *Malvin King* 👑`;

        const vv = await conn.sendMessage(from, {
            image: { url: "https://files.catbox.moe/2prjby.jpg" },
            caption: desc,
            contextInfo: {
                mentionedJid: [''],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363398430045533@newsletter',
                    newsletterName: "Malvin King",
                    serverMessageId: 999
                },
                externalAdReply: {
                    title: 'Subscribe to YouTube',
                    body: `${pushname}`,
                    mediaType: 1,
                    sourceUrl: "https://www.youtube.com/@malvintech2",
                    thumbnailUrl: "https://www.youtube.com/@malvintech2",
                    previewType: 'PHOTO',
                    renderSmallerThumbnail: true,
                    showAdAttribution: true
                }
            }
        }, { quoted: mek });

        await conn.sendMessage(from, {
            audio: { url: 'https://github.com/XdKing2/MALVIN-DATA/raw/refs/heads/main/autovoice/menu.mp3' },
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });

        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo &&
                msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {

                const categoryMap = {
                    const categoryMap = {
    '1': { title: "ᴀᴅᴍɪɴ ᴍᴇɴᴜ", content: menu.admin, thumb: "https://files.catbox.moe/l1uebm.jpg" },
    '2': { title: "ᴘʀɪᴠᴀᴛᴇ ᴍᴇɴᴜ", content: menu.owner, thumb: "https://files.catbox.moe/mf7fdr.jpg" },
    '3': { title: "ɢʜᴏsᴛ ᴍᴇɴᴜ", content: menu.owner1, thumb: "https://files.catbox.moe/pgv0k0.jpg" },
    '4': { title: "ɪɴғᴏ ᴍᴇɴᴜ", content: menu.info, thumb: "https://files.catbox.moe/hiv4v5.jpg" },
    '5': { title: "sᴇᴛᴛɪɴɢs ᴍᴇɴᴜ", content: menu.settings, thumb: "https://files.catbox.moe/rjc66c.jpg" },
    '6': { title: "ᴏᴡɴᴇʀ ᴍᴇɴᴜ", content: menu.owner, thumb: "https://files.catbox.moe/mf7fdr.jpg" },
    '7': { title: "ᴅᴏᴡɴʟᴏᴀᴅ ᴍᴇɴᴜ", content: menu.download, thumb: "https://files.catbox.moe/b4lsn9.jpg" },
    '8': { title: "ᴍᴏᴠɪᴇ ᴍᴇɴᴜ", content: menu.movie, thumb: "https://files.catbox.moe/s03hpj.jpg" },
    '9': { title: "ᴍᴀɪɴ ᴍᴇɴᴜ", content: menu.main, thumb: "https://files.catbox.moe/vxmsok.jpg" },
    '10': { title: "ɢʀᴏᴜᴘ ᴍᴇɴᴜ", content: menu.group, thumb: "https://files.catbox.moe/q82xmq.jpg" },
    '11': { title: "ᴄᴏɴᴠᴇʀᴛ ᴍᴇɴᴜ", content: menu.convert, thumb: "https://files.catbox.moe/z2ghm4.jpg" },
    '12': { title: "sᴇᴀʀᴄʜ ᴍᴇɴᴜ", content: menu.search, thumb: "https://files.catbox.moe/m68a5o.jpg" },
    '13': { title: "ᴜᴛɪʟɪᴛʏ ᴍᴇɴᴜ", content: menu.utility, thumb: "https://files.catbox.moe/vywv8v.jpg" },
    '14': { title: "ғᴜɴ ᴍᴇɴᴜ", content: menu.fun, thumb: "https://files.catbox.moe/1eolso.jpg" },
    '15': { title: "ᴛᴏᴏʟs ᴍᴇɴᴜ", content: menu.tools, thumb: "https://files.catbox.moe/yqgiyl.jpg" },
    '16': { title: "sᴛɪᴄᴋᴇʀ ᴍᴇɴᴜ", content: menu.sticker, thumb: "https://files.catbox.moe/joc9p1.jpg" },
    '17': { title: "ʀᴀɴᴅᴏᴍ ᴍᴇɴᴜ", content: menu.random, thumb: "https://files.catbox.moe/y10snq.jpg" },
    '18': { title: "ᴍɪsᴄ ᴍᴇɴᴜ", content: menu.misc, thumb: "https://files.catbox.moe/yic8t5.jpg" },
    '19': { title: "ᴀɴɪᴍᴇ ᴍᴇɴᴜ", content: menu.anime, thumb: "https://files.catbox.moe/2prjby.jpg" },
    '20': { title: "sᴜᴘᴘᴏʀᴛ ᴍᴇɴᴜ", content: menu.support, thumb: "https://files.catbox.moe/1lpy3u.jpg" },
    '21': { title: "ᴀɪ ᴍᴇɴᴜ", content: menu.ai, thumb: "https://files.catbox.moe/04vmxa.jpg" },
    '22': { title: "ᴏᴛʜᴇʀ ᴍᴇɴᴜ", content: menu.other, thumb: "https://files.catbox.moe/q1v51n.jpg" },
    '23': { title: "ɴsғᴡ ᴍᴇɴᴜ", content: menu.nsfw, thumb: "https://files.catbox.moe/4fgg8d.jpg" },
    '24': { title: "ɢᴀᴍᴇ ᴍᴇɴᴜ", content: menu.game, thumb: "https://files.catbox.moe/xy38im.jpg" },
    '25': { title: "sᴛᴀʟᴋ ᴍᴇɴᴜ", content: menu.stalk, thumb: "https://files.catbox.moe/5t4hcn.jpg" },
    '26': { title: "ʟᴏɢᴏ ᴍᴇɴᴜ", content: menu.logo, thumb: "https://files.catbox.moe/hww6k4.jpg" }};

                    // add more cases as needed
                };

                const cat = categoryMap[selectedOption];
                if (!cat) return;

                const replyMsg = `*✦『 ${cat.title} 』✦*\n${cat.content}\n\n${config.DESCRIPTION}`;

                await conn.sendMessage(from, {
                    image: { url: cat.thumb },
                    caption: replyMsg,
                    contextInfo: {
                        mentionedJid: [m.sender],
                        forwardingScore: 999,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: '120363398430045533@newsletter',
                            newsletterName: `👤${cat.title}`,
                            serverMessageId: 143
                        }
                    }
                }, { quoted: mek });
            }
        });

    } catch (e) {
        console.error(e);
        reply("An error occurred while displaying the menu.");
    }
});
