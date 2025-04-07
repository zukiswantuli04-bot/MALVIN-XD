/*
Project Name : MALVIN XMD
Creator      : Malvin King ( Mr Lord Malvin )
Repo         : https//github.com/kingmalvn/MALVIN-XD
Support      : wa.me/263714757857
*/



const config = require('../settings');
const { malvin, commands } = require('../malvin');
const os = require("os");
const IMG = require('../data/king');
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
        // Dynamic configuration values
        const botName = config.BOT_NAME || "MALVIN-XD";
        const ownerName = config.OWNER_NAME || "ᴍᴀʟᴠɪɴ ᴋɪɴɢ";
        const botMode = config.MODE || "public";
        const botPrefix = config.PREFIX || ".";
        const botowner = config.king || "ᴍᴀʟᴠɪɴ ᴋɪɴɢ";
        const botVersion = config.version || "4.0";
        const currentTime = new Date().toLocaleString(); // Get current time
        const totalCommands = Object.keys(commands).length; // Get total number of commands

        // Create a rich, dynamic menu description with advanced styling and tiny text
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
│ 🛠 *ᴛᴏᴛᴀʟ ᴄᴏᴍᴍᴀɴs*: *${totalCommands}*
╰─────────────

💬 *ᴄʜᴏᴏsᴇ ᴀ ᴄᴀᴛᴇɢᴏʀʏ ᴛᴏ ᴇxᴘʟᴏʀᴇ:*
> ᴇ.ɢ ʀᴇᴘʟʏ ᴡɪᴛʜ ᴛʜᴇ ᴄᴀᴛᴇɢᴏʀʏ ɴᴜᴍʙᴇʀ
> ᴏʀ ᴊᴜsᴛ ᴛʏᴘ ᴛʜᴇ ɴᴜᴍʙᴇʀ ᴇ.ɢ .1 ғᴏʀ ᴀᴅᴍɪɴ ᴍᴇɴᴜ

─────────────
🌟 ① *ᴀᴅᴍɪɴ ᴍᴇɴᴜ*  
🌟 ② *ᴘʀɪᴠᴀᴛᴇ ᴍᴇɴᴜ*  
🌟 ③ *ɢʜᴏsᴛ ᴍᴇɴᴜ*  
🌟 ④ *ɪɴғᴏ ᴍᴇɴᴜ*  
🌟 ⑤ *sᴇᴛᴛɪɴɢs ᴍᴇɴᴜ*  
🌟 ⑥ *ᴏᴡɴᴇʀ ᴍᴇɴᴜ*  
🌟 ⑦ *ᴅᴏᴡɴʟᴏᴀᴅ ᴍᴇɴᴜ*  
🌟 ⑧ *ᴍᴏᴠɪᴇ ᴍᴇɴᴜ*  
🌟 ⑨ *ᴍᴀɪɴ ᴍᴇɴᴜ*  
🌟 🔟 *ɢʀᴏᴜᴘ ᴍᴇɴᴜ*  

─────────────
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

─────────────
🤖 ²¹ *ᴀɪ ᴍᴇɴᴜ*  
🕳️ ²² *ᴏᴛʜᴇʀ ᴍᴇɴᴜ*  
🔞 ²³ *ɴsғᴡ ᴍᴇɴᴜ*

──────────────
✨ *Join our Channel & Stay Updated!* 
🌐 [Follow Here](https://tinyurl.com/2y864tjs)

──────────────
> © 2025 *Malvin King* 👑
`;

        // Send the message with image and updated unique design
        const vv = await conn.sendMessage(from, { 
            image: { url: config.MENU_IMG }, 
            caption: desc, 
            contextInfo: {
                mentionedJid: [''], 
                groupMentions: [],
                forwardingScore: 999, // for forwarding
                isForwarded: true, // mark as forwarded
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
                    thumbnailUrl: "https://www.youtube.com/@malvintech2" ,
                    previewType: 'PHOTO',
                    renderSmallerThumbnail: true,
                    showAdAttribution: true
                }
            }
        }, { quoted: mek });

// Send audio
        await conn.sendMessage(from, {
            audio: { url: 'https://github.com/XdKing2/MALVIN-DATA/raw/refs/heads/main/autovoice/menu.mp3' },
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });

        
        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1':                
                        let reply1 =(`
                        
      *✦『 ᴀᴅᴍɪɴ ᴄᴍᴅ 』✦*                       
*╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄╾╾╾*
*┊❍* ᴇxᴀᴍᴘʟᴇᴄᴍᴅ
*┊❍* sᴇᴛsᴜᴅᴏ
*┊❍* ᴅᴇʟsᴜᴅᴏ
*┊❍* ɢᴇᴛsᴜᴅᴏ
*┊❍* ᴘᴀɪʀ
*╰──────────●●►*
📊 ᴛᴏᴛᴀʟ ᴀᴅᴍɪɴ ᴄᴏᴍᴍᴀɴᴅs ʟɪsᴛ: 5

 ${config.DESCRIPTION}`);
await conn.sendMessage(
  from,
  {
    image: { url: IMG.ADMIN_IMG },
    caption: reply1,
    contextInfo: {
      mentionedJid: [m.sender],
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363398430045533@newsletter',
        newsletterName: '👤ᴀᴅᴍɪɴ ᴍᴇɴᴜ',
        serverMessageId: 143
      }
    }
  },
  { quoted: mek }
);

        
                       break;
                    case '2':               
                        let reply2 =(`
                        
     *✦『 ᴘʀɪᴠᴀᴛᴇ ᴄᴍᴅ  』✦*                    
*╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄╾╾╾*
*┊❍* ᴅɪᴀʀʏ
*┊❍* sᴇᴛᴅɪᴀʀʏ
*┊❍* ʀᴇsᴇᴛᴅɪᴀʀʏ
*┊❍* ʀᴇsᴇᴛᴘᴀssᴡᴏʀᴅ
*┊❍* ᴅᴀɪʟʏғᴀᴄᴛ
*┊❍* ᴀɢᴇ
*┊❍* ᴛɪᴍᴇᴢᴏɴᴇ
*┊❍* sᴇᴛᴍʏɴᴀᴍᴇ
*┊❍* ᴘᴘ
*┊❍* ɢᴇᴛᴘʀɪᴠᴀᴄʏ
*┊❍* ᴡᴀ
*╰──────────●●►*

📊 ᴛᴏᴛᴀʟ ᴘʀɪᴠᴀᴛᴇ ᴄᴏᴍᴍᴀɴᴅs ʟɪsᴛ : 11

 ${config.DESCRIPTION}`);
await conn.sendMessage(
            from,
            {
                image: { url: IMG.PRIVATE_IMG },
                caption: reply2,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363398430045533@newsletter',
                        newsletterName: '📵 ᴘʀɪᴠᴀᴛᴇ ᴍᴇɴᴜ',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );
        
                       break;
                    case '3':               
                        let reply3 =(`      
                        
     *✦『 ᴍᴇɴᴜ ᴄᴍᴅ  』✦*                    
*╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄╾╾╾*
*┊❍* ᴀʟʟᴍᴇɴᴜ
*┊❍* ʟɪsᴛ
*┊❍* ᴇɴᴠ
*┊❍* ɢɪᴛʜᴜʙsᴛᴀʟᴋ
*┊❍* ᴍᴇɴᴜ
*┊❍* ᴍᴇɴᴜ2
*┊❍* ᴅʟᴍᴇɴᴜ
*┊❍* ɢʀᴏᴜᴘᴍᴇɴᴜ
*┊❍* ғᴜɴᴍᴇɴᴜ
*┊❍* ᴏᴛʜᴇʀᴍᴇɴᴜ
*┊❍* sᴇᴀʀᴄʜᴍᴇɴᴜ
*┊❍* ᴍᴀɪɴᴍᴇɴᴜ
*┊❍* ᴏᴡɴᴇʀᴍᴇɴᴜ
*┊❍* ᴄᴏɴᴠᴇʀᴛᴍᴇɴᴜ
*┊❍* ᴘʀɪᴠᴀᴛᴇᴍᴇɴᴜ
*┊❍* sᴇᴛᴛɪɴɢsᴍᴇɴᴜ
*┊❍* ᴛᴏᴏʟsᴍᴇɴᴜ
*┊❍* ᴀɪᴍᴇɴᴜ
*╰──────────●●►*

📊 ᴛᴏᴛᴀʟ ᴄᴏᴍᴍᴀɴᴅs ʟɪsᴛ ᴍᴇɴᴜ: 18

 ${config.DESCRIPTION}`);
await conn.sendMessage(
            from,
            {
                image: { url: IMG.MAINMENU_IMG },
                caption: reply3,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363398430045533@newsletter',
                        newsletterName: '👻 ᴍᴇɴᴜ ᴍᴇɴᴜ',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );
        
                       break;
                    case '4':               
                        let reply4 =(`       
                        
     *✦『 ɪɴғᴏ ᴄᴍᴅ  』✦*
*╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄╾╾╾*
*┊❍* ɪɴᴛʀᴏ
*┊❍* ᴀʙᴏᴜᴛ
*┊❍* ᴠᴇʀsɪᴏɴ
*┊❍* ʟᴀɴɢᴄᴏᴅᴇ
*┊❍* ʀᴇᴘᴏ
*┊❍* sᴛᴀʀᴛ
*╰──────────●●►*


📊 ᴛᴏᴛᴀʟ ᴄᴏᴍᴍᴀɴᴅs ʟɪsᴛ ɪɴғᴏ: 6

 ${config.DESCRIPTION}`);
await conn.sendMessage(
            from,
            {
                image: { url: INFO_IMG },
                caption: reply4,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363398430045533@newsletter',
                        newsletterName: '🔎 ɪɴғᴏ ᴍᴇɴᴜ',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );
        
                       break;
                    case '5':               
                        let reply5 =(` 
                        
    *✦『 sᴇᴛᴛɪɴɢs ᴄᴍᴅ  』✦*
*╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄╾╾╾*
*┊❍* ᴘʀᴇғɪx
*┊❍* ᴍᴏᴅᴇ
*┊❍* ᴀʟᴡᴀʏsᴏɴʟɪɴᴇ
*┊❍* ᴀᴜᴛᴏʀᴇᴄᴏʀᴅɪɴɢ
*┊❍* ғᴀᴋᴇᴛʏᴘɪɴɢ
*┊❍* ғᴀᴋᴇʀᴇᴄᴏʀᴅɪɴɢ
*┊❍* ᴀᴜᴛᴏsᴇᴇɴ
*┊❍* sᴛᴀᴛᴜsʀᴇᴀᴄᴛ
*┊❍* ᴀɴᴛɪᴄᴀʟʟ
*┊❍* ʀᴇᴀᴅᴍᴇssᴀɢᴇ
*┊❍* ᴀʟᴡᴀʏsᴏɴʟɪɴᴇ
*┊❍* ᴀɴᴛɪʙᴀᴅ
*┊❍* ᴀᴜᴛᴏsᴛɪᴄᴋᴇʀ
*┊❍* ᴀᴜᴛᴏʀᴇᴘʟʏ
*┊❍* ᴀᴜᴛᴏʀᴇᴀᴄᴛ
*┊❍* sᴛᴀᴛᴜsʀᴇᴘʟʏ
*┊❍* ᴀᴜᴛᴏᴠᴏɪᴄᴇ
*┊❍* sᴇᴛᴠᴀʀ
*┊❍* ʜᴇᴀʀᴛʀᴇᴀᴄᴛ
*╰──────────●●►*

> 📌 *ɴᴏᴛᴇ*: ᴀᴅᴅ "ᴏɴ/ᴏғғ" ᴡɪᴛʜ ᴛʜᴇ ᴅᴇsɪʀᴇᴅ sᴛᴀᴛᴇ ᴛᴏ ᴇɴᴀʙʟᴇ ᴏʀ ᴅɪsᴀʙʟᴇ ᴍᴏsᴛ ᴏ̄ ᴇ̄ ᴀʙᴏᴠᴇ👆 ғᴇᴀᴛᴜʀᴇs. ᴇɢ .ᴀᴜᴛᴏʀᴇᴀᴄᴛ ᴏɴ

📊 ᴛᴏᴛᴀʟ ᴄᴏᴍᴍᴀɴᴅs ʟɪsᴛ sᴇᴛᴛɪɴɢs: 19

 ${config.DESCRIPTION}`);
await conn.sendMessage(
            from,
            {
                image: { url: IMG.SETTINGS_IMG },
                caption: reply5,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363398430045533@newsletter',
                        newsletterName: '⚙️sᴇᴛᴛɪɴɢs ᴍᴇɴᴜ',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );
        
                       break;
                    case '6':               
                        let reply6 =(`  
                        
                         
     *✦『 ᴏᴡɴᴇʀ ᴄᴍᴅ  』✦*
*╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄╾╾╾*
*┊❍* ᴀʟɪᴠᴇ
*┊❍* ʙʟᴏᴄᴋ
*┊❍* ᴜɴʙʟᴏᴄᴋ
*┊❍* ᴘᴘ
*┊❍* ɢᴇᴛ
*┊❍* ʟᴇᴀᴠᴇ
*┊❍* sʜᴜᴛᴅᴏᴡɴ
*┊❍* ʙʀᴏᴀᴅᴄᴀsᴛ
*┊❍* sᴇᴛᴘᴘ
*┊❍* ʙʟᴏᴄᴋ
*┊❍* ᴜɴʙʟᴏᴄᴋ
*┊❍* ᴄʟᴇᴀʀᴄʜᴀᴛs
*┊❍* ᴊɪᴅ
*┊❍* ɢᴊɪᴅ
*┊❍* ʀᴇsᴛᴀʀᴛ
*┊❍* ᴄᴏᴜɴᴛx
*┊❍* ᴄᴏᴜɴᴛ
*┊❍* sᴇᴛᴛɪɴɢs
*╰──────────●●►*

📊 ᴛᴏᴛᴀʟ ᴄᴏᴍᴍᴀɴᴅs ʟɪsᴛ ᴏᴡɴᴇʀ: 18

 ${config.DESCRIPTION}`);
await conn.sendMessage(
            from,
            {
                image: { url: IMG.OWNER_IMG },
                caption: reply6,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363398430045533@newsletter',
                        newsletterName: '👑 ᴏᴡɴᴇʀ ᴍᴇɴᴜ',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );
        
        
                       break;
                    case '7':               
                        let reply7 =(` 
                        
    *✦『 ᴅᴏᴡɴʟᴏᴀᴅ ᴄᴍᴅ 』✦*
*╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄╾╾╾*
*┊❍* ᴘʟᴀʏᴘʀᴏ
*┊❍* ʏᴛᴘᴏsᴛ
*┊❍* ᴛɪᴋᴛᴏᴋ
*┊❍* ɪɴsᴛᴀ
*┊❍* ғʙ
*┊❍* ᴛᴡɪᴛᴛᴇʀ
*┊❍* ᴍᴇᴅɪᴀғɪʀᴇ
*┊❍* ɢᴅʀɪᴠᴇ
*┊❍* ᴘᴀɪʀ
*┊❍* ɢɪᴛᴄʟᴏɴᴇ
*┊❍* sᴘᴏᴛɪғʏ
*┊❍* ᴘɪɴᴅʟ
*┊❍* ᴘʟᴀʏ2
*┊❍* ᴛɪᴋᴛᴏᴋ2
*┊❍* ᴛᴛs
*┊❍* ᴠɪᴅᴇᴏ2
*┊❍* ᴘʟᴀʏ2
*┊❍* sᴏɴɢx
*┊❍* ᴠɪᴅᴇᴏx
*┊❍* ᴍᴘ4
*┊❍* ᴍᴘ3
*┊❍* sᴏɴɢ2
*┊❍* ᴘʟᴀʏ
*┊❍* sᴏɴɢ
*╰──────────●●►*


📊 ᴛᴏᴛᴀʟ ᴄᴏᴍᴍᴀɴᴅs ʟɪsᴛ ᴅᴏᴡɴʟᴏᴀᴅ: 24

 ${config.DESCRIPTION}`);
await conn.sendMessage(
            from,
            {
                image: { url: IMG.OWNER_IMG },
                caption: reply7,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363398430045533@newsletter',
                        newsletterName: '📥 ᴅᴏᴡɴʟᴏᴀᴅ ᴍᴇɴᴜ',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );
        
                       break;
                    case '8':               
                        let reply8 =(`
                        
      *✦『 ᴍᴏᴠɪᴇs ᴄᴍᴅ 』✦*
*╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄╾╾╾*
*┊❍* ʙᴀɪsᴄᴏᴘᴇ
*┊❍* ɢɪɴɪsɪsɪʟᴀ
*┊❍* sɪɴʜᴀʟᴀsᴜʙ
*╰──────────●●►*

📊 ᴛᴏᴛᴀʟ ᴄᴏᴍᴍᴀɴᴅs ʟɪsᴛ ᴍᴏᴠɪᴇ: 3

 ${config.DESCRIPTION}`);
await conn.sendMessage(
            from,
            {
                image: { url: IMG.MOVIE_IMG },
                caption: reply8,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363398430045533@newsletter',
                        newsletterName: '📽 ᴍᴏᴠɪᴇs ᴍᴇɴᴜ',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );
        
        
                       break;
                    case '9':               
                        let reply9 =(`    
                        
      *✦『 ᴍᴀɪɴ ᴄᴍᴅ  』✦*
*╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄╾╾╾*
*┊❍* ᴍᴇɴᴜ3
*┊❍* ʟɪᴠᴇ
*┊❍* ᴏᴡɴᴇʀ
*┊❍* ᴘɪɴɢ
*┊❍* ᴘɪɴɢ2
*┊❍* ᴘɪɴɢ3
*┊❍* sʏsᴛᴇᴍ
*┊❍* ғᴇᴛᴄʜ
*┊❍* ᴜᴘᴛɪᴍᴇ
*╰──────────●●►*

📊 ᴛᴏᴛᴀʟ ᴄᴏᴍᴍᴀɴᴅs ʟɪsᴛ ᴀɪ: 9

 ${config.DESCRIPTION}`);
await conn.sendMessage(
            from,
            {
                image: { url: IMG.MAIN_IMG },
                caption: reply9,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363398430045533@newsletter',
                        newsletterName: '📋 ᴍᴀɪɴ ᴍᴇɴᴜ',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );
        
        
                       break;
                    case '10':               
                        let reply10 =(`  
                        
     *✦『 ɢʀᴏᴜᴘ ᴄᴍᴅ  』✦*
*╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄╾╾╾*
*┊❍* ᴀɴᴛɪʟɪɴᴋ
*┊❍* ᴀɴᴛɪʙᴏᴛ
*┊❍* ᴀᴄᴄᴇᴘᴛᴀʟʟ
*┊❍* ʀᴇᴊᴇᴄᴛᴀʟʟ
*┊❍* ᴀɴᴛɪʟɪɴᴋ1
*┊❍* ᴘᴏʟʟ
*┊❍* ɴᴇᴡɢᴄ
*┊❍* ɪɴᴠɪᴛᴇ
*┊❍* ɢɪɴғᴏ
*┊❍* ʙʀᴏᴀᴅᴄᴀsᴛ
*┊❍* sᴇᴛɢᴘᴘ
*┊❍* ᴅᴇʟᴇᴛᴇ
*┊❍* ᴊɪᴅ1
*┊❍* ᴊɪᴅ2
*┊❍* ᴀᴅᴅ
*┊❍* ᴜᴘᴅᴀᴛᴇɢᴅᴇsᴄ
*┊❍* ᴜᴘᴅᴀᴛᴇɢɴᴀᴍᴇ
*┊❍* ᴋɪᴄᴋ
*┊❍* ʟᴏᴄᴋɢᴄ
*┊❍* ᴍᴜᴛᴇ
*┊❍* ᴜɴʟᴏᴄᴋɢᴄ
*┊❍* ᴜɴᴍᴜᴛᴇ
*┊❍* ᴊᴏɪɴ
*┊❍* ɪɴᴠɪᴛᴇ
*┊❍* ʀᴇᴠᴏᴋᴇ
*┊❍* ᴋɪᴄᴋ
*┊❍* ᴘʀᴏᴍᴏᴛᴇ
*┊❍* ᴅᴇᴍᴏᴛᴇ
*┊❍* ʜɪᴅᴇᴛᴀɢ
*┊❍* ᴛᴀɢɢᴘ
*┊❍* ɢɪɴғᴏ
*┊❍* ʀᴇᴍᴏᴠᴇᴍᴇᴍʙᴇʀs
*┊❍* ʀᴇᴍᴏᴠᴇᴀᴅᴍɪɴs
*┊❍* ʀᴇᴍᴏᴠᴇᴀʟʟ2
*┊❍* ᴏᴘᴇɴᴛɪᴍᴇ
*┊❍* ᴄʟᴏsᴇᴛɪᴍᴇ
*┊❍* ᴛᴀɢᴀᴅᴍɪɴ
*┊❍* sᴇᴛɢᴏᴏᴅʙʏᴇ
*┊❍* sᴇᴛᴡᴇʟᴄᴏᴍᴇ
*┊❍* ᴅᴇʟᴇᴛᴇ
*┊❍* ᴛᴀɢᴀʟʟ
*┊❍* ᴛᴀɢ
*╰──────────●●►*
📊 ᴛᴏᴛᴀʟ ᴄᴏᴍᴍᴀɴᴅs ʟɪsᴛ ɢʀᴏᴜᴘ: 42

 ${config.DESCRIPTION}`);
await conn.sendMessage(
            from,
            {
                image: { url: IMG.GROUP_IMG },
                caption: reply10,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363398430045533@newsletter',
                        newsletterName: ' 👨‍👩‍👦‍👦 ɢʀᴏᴜᴘ ᴍᴇɴᴜ',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );
        
                       break;
                    case '11':               
                        let reply11 =(` 
                        
    *✦『 ᴄᴏɴᴠᴇʀᴛ ᴄᴍᴅ 』✦*
*╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄╾╾╾*
*┊❍* ᴄᴏɴᴠᴇʀᴛᴍᴏɴᴇʏ
*┊❍* ᴛᴏᴜʀʟ2
*┊❍* ᴛᴏᴜʀʟ
*┊❍* ᴘᴅғ
*┊❍* ᴛᴏᴘᴅғ
*┊❍* ᴀᴛᴛᴘ
*┊❍* ʀᴇᴀᴅᴍᴏʀᴇ
*┊❍* ᴛᴛs2
*┊❍* ᴛᴛs3
*┊❍* ᴛʀᴛ
*┊❍* ᴛɪɴʏ
*╰──────────●●►*


📊 ᴛᴏᴛᴀʟ ᴄᴏᴍᴍᴀɴᴅs ʟɪsᴛ ᴄᴏɴᴠᴇʀᴛ: 11

 ${config.DESCRIPTION}`);
await conn.sendMessage(
            from,
            {
                image: { url: IMG.CONVERT_IMG },
                caption: reply11,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363398430045533@newsletter',
                        newsletterName: '🔄 ᴄᴏɴᴠᴇʀᴛ ᴍᴇɴᴜ',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );
        
                       break;
                    case '12':               
                        let reply12 =(`  
                        
     *✦『 sᴇᴀʀᴄʜ ᴄᴍᴅ 』✦*
*╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄╾╾╾*
*┊❍* ᴅᴇғɪɴᴇ
*┊❍* ɪᴍɢ
*┊❍* ɢᴏᴏɢʟᴇ
*┊❍* ᴍᴏᴠɪᴇ
*┊❍* ɴᴇᴡs
*┊❍* ᴛɪᴋᴛᴏᴋsᴇᴀʀᴄʜ
*┊❍* ᴡɪᴋɪᴘᴇᴅɪᴀ
*┊❍* ʏᴛs
*┊❍* ʟʏʀɪᴄs
*┊❍* ʟʏʀɪᴄs2
*╰──────────●●►*

📊 ᴛᴏᴛᴀʟ ᴄᴏᴍᴍᴀɴᴅs ʟɪsᴛ sᴇᴀʀᴄʜ: 10

 ${config.DESCRIPTION}`);
await conn.sendMessage(
            from,
            {
                image: { url: IMG.SEARCH_IMG },
                caption: reply12,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363398430045533@newsletter',
                        newsletterName: '🔤 sᴇᴀʀᴄʜ ᴍᴇɴᴜ',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );
        
                       break;
                    case '13':               
                        let reply13 =(`  
                        
                         
     *✦『 ᴜᴛɪʟɪᴛʏ ᴄᴍᴅ  』✦*
*╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄╾╾╾*
*┊❍* ᴄʀᴇᴀᴛᴇᴀᴘɪ
*┊❍* ᴄʜᴇᴄᴋ
*┊❍* ᴍɪɴᴜᴛᴏʀ
*┊❍* ϙᴜɪᴢ
*┊❍* ʟɪsᴛᴘʟᴜɢɪɴs
*┊❍* ᴘʟᴜɢɪɴ
*┊❍* ʀᴀɴᴋ
*┊❍* sᴀᴠᴇ
*┊❍* ᴛᴇᴍᴘᴍᴀɪʟ
*┊❍* ʀᴄᴏʟᴏʀ
*┊❍* ʙɪɴᴀʀʏ
*┊❍* ᴅʙɪɴᴀʀʏ
*┊❍* ʙᴀsᴇ64
*┊❍* ᴜɴʙᴀsᴇ64
*┊❍* ᴜʀʟᴇɴᴄᴏᴅᴇ
*┊❍* ᴜʀʟᴅᴇᴄᴏᴅᴇ
*┊❍* ᴛɪᴍᴇɴᴏᴡ
*┊❍* ᴅᴀᴛᴇ
*┊❍* ʀᴇᴘᴏʀᴛ
*┊❍* ᴛɪɴʏᴜʀʟ
*╰──────────●●►*

📊 ᴛᴏᴛᴀʟ ᴄᴏᴍᴍᴀɴᴅs ʟɪsᴛ ᴜᴛɪʟɪᴛʏ: 20

 ${config.DESCRIPTION}`);
await conn.sendMessage(
            from,
            {
                image: { url: IMG.UTILITY_IMG },
                caption: reply13,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363398430045533@newsletter',
                        newsletterName: '🛑 ᴜᴛɪʟɪᴛʏ ᴍᴇɴᴜ',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );
        
        
                       break;
                    case '14':               
                        let reply14 =(`   
                        
      *✦『 ғᴜɴ ᴄᴍᴅ  』✦*
*╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄╾╾╾*
*┊❍* ʙɪʙʟᴇ
*┊❍* ᴄᴏᴜᴘʟᴇᴘᴘ
*┊❍* ʀɪɴɢᴛᴏɴᴇ
*┊❍* ᴇᴍɪx
*┊❍* ᴄᴏᴍᴘᴀᴛɪʙɪʟɪᴛʏ
*┊❍* ᴀᴜʀᴀ
*┊❍* 8ʙᴀʟʟ
*┊❍* ᴄᴏᴍᴘʟɪᴍᴇɴᴛ
*┊❍* ʟᴏᴠᴇᴛᴇsᴛ
*┊❍* ᴇᴍᴏᴊɪ
*┊❍* ғᴀᴄᴛ
*┊❍* ᴊᴏᴋᴇ
*┊❍* ᴅɪᴅʏᴏᴜᴋɴᴏᴡ
*┊❍* sʜɪᴘ
*┊❍* ᴄᴏsᴘʟᴀʏ
*┊❍* sϙᴜɪᴅɢᴀᴍᴇ
*┊❍* ᴀɴɪᴍᴇɢɪʀʟ
*┊❍* ᴀɴɪᴍᴇɢɪʀʟ1
*┊❍* ᴀɴɪᴍᴇɢɪʀʟ2
*┊❍* ᴀɴɪᴍᴇɢɪʀʟ3
*┊❍* ᴀɴɪᴍᴇɢɪʀʟ4
*┊❍* ᴀɴɪᴍᴇɢɪʀʟ5
*┊❍* ᴅᴏɢ
*┊❍* ᴄᴀᴛ
*┊❍* ᴋɪss
*┊❍* ʜᴀᴄᴋ
*┊❍* ϙᴜᴏᴛᴇ
*┊❍* ᴄʀʏ
*┊❍* ᴄᴜᴅᴅʟᴇ
*┊❍* ʙᴜʟʟʏ
*┊❍* ʜᴜɢ
*┊❍* ᴀᴡᴏᴏ
*┊❍* ʟɪᴄᴋ
*┊❍* ᴘᴀᴛ
*┊❍* sᴍᴜɢ
*┊❍* ʙᴏɴᴋ
*┊❍* ʏᴇᴇᴛ
*┊❍* ʙʟᴜsʜ
*┊❍* ʜᴀɴᴅʜᴏʟᴅ
*┊❍* ʜɪɢʜғɪᴠᴇ
*┊❍* ɴᴏᴍ
*┊❍* ᴡᴀᴠᴇ
*┊❍* sᴍɪʟᴇ
*┊❍* ᴡɪɴᴋ
*┊❍* ʜᴀᴘᴘʏ
*┊❍* ɢʟᴏᴍᴘ
*┊❍* ʙɪᴛᴇ
*┊❍* ᴘᴏᴋᴇ
*┊❍* ᴄʀɪɴɢᴇ
*┊❍* ᴅᴀɴᴄᴇ
*┊❍* ᴋɪʟʟ
*┊❍* sʟᴀᴘ
*┊❍* ᴋɪss
*┊❍* sᴛɪᴄᴋᴇʀsᴇᴀʀᴄʜ
*┊❍* ʀᴏʟʟ
*┊❍* ᴄᴏɪɴғʟɪᴘ
*┊❍* ғʟɪᴘ
*┊❍* ᴘɪᴄᴋ
*┊❍* sʜᴀᴘᴀʀ
*┊❍* ʀᴀᴛᴇ
*┊❍* ᴊᴏᴋᴇ
*┊❍* ғʟɪʀᴛ
*┊❍* ᴛʀᴜᴛʜ
*┊❍* ᴅᴀʀᴇ
*┊❍* ғᴀᴄᴛ
*┊❍* ᴘɪᴄᴋᴜᴘʟɪɴᴇ
*┊❍* ᴄʜᴀʀᴀᴄᴛᴇʀ
*┊❍* ʀᴇᴘᴇᴀᴛ
*┊❍* sᴇɴᴅ
*╰──────────●●►*

📊 ᴛᴏᴛᴀʟ ᴄᴏᴍᴍᴀɴᴅs ʟɪsᴛ ғᴜɴ: 70

 ${config.DESCRIPTION}`);
await conn.sendMessage(
            from,
            {
                image: { url: IMG.FUN_IMG },
                caption: reply14,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363398430045533@newsletter',
                        newsletterName: '😁 ғᴜɴ ᴍᴇɴᴜ',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );
        
                       break;
                    case '15':               
                        let reply15 =(`  
                       
      *✦『 ᴛᴏᴏʟs ᴄᴍᴅ  』✦*
*╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄╾╾╾*
*┊❍* sᴛᴀᴛᴜs
*┊❍* ᴀᴘᴋ
*┊❍* ʜᴀᴘᴘʏ
*┊❍* ʜᴇᴀʀᴛ
*┊❍* ᴀɴɢʀʏ
*┊❍* sᴀᴅ
*┊❍* sʜʏ
*┊❍* ᴍᴏᴏɴ
*┊❍* ᴄᴏɴғᴜsᴇᴅ
*┊❍* ʜᴏᴛ
*┊❍* ɴɪᴋᴀʟ
*┊❍* ᴇᴠᴀʟ
*┊❍* ғᴀɴᴄʏ
*┊❍* ᴘʜᴏᴛᴏ
*┊❍* ɴᴀsᴀ
*╰──────────●●►*

📊 ᴛᴏᴛᴀʟ ᴄᴏᴍᴍᴀɴᴅs ʟɪsᴛ ᴛᴏᴏʟs: 15

 ${config.DESCRIPTION}`);
await conn.sendMessage(
            from,
            {
                image: { url: IMG.TOOLS_IMG },
                caption: reply15,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363398430045533@newsletter',
                        newsletterName: '😁 ᴛᴏᴏʟs  ᴍᴇɴᴜ',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );
        
                       break;
                    case '16':               
                        let reply16 =(`  
                        
    *✦『 sᴛɪᴄᴋᴇʀ ᴄᴍᴅ 』✦*
*╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄╾╾╾*
*┊❍* sᴛɪᴄᴋᴇʀ2ɪᴍɢ
*┊❍* ᴛᴀᴋᴇ
*┊❍* sᴛɪᴄᴋᴇʀ
*┊❍* ᴠsᴛɪᴄᴋᴇʀ
*╰──────────●●►*

📊 ᴛᴏᴛᴀʟ ᴄᴏᴍᴍᴀɴᴅs ʟɪsᴛ sᴛɪᴄᴋᴇʀ: 4

 ${config.DESCRIPTION}`);
await conn.sendMessage(
            from,
            {
                image: { url: IMG.STICKER_IMG },
                caption: reply16,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363398430045533@newsletter',
                        newsletterName: '🎐 sᴛɪᴄᴋᴇʀ ᴍᴇɴᴜ',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );
        
        
                       break;
                    case '17':               
                        let reply17 =(`  
                        
     *✦『 ʀᴀɴᴅᴏᴍ ᴄᴍᴅ  』✦*
*╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄╾╾╾*
*┊❍* ʀᴅᴀɴɪᴍᴇ
*┊❍* ʀᴡ
*╰──────────●●►*

📊 ᴛᴏᴛᴀʟ ᴄᴏᴍᴍᴀɴᴅs ʟɪsᴛ ʀᴀɴᴅᴏᴍ: 2

 ${config.DESCRIPTION}`);
await conn.sendMessage(
            from,
            {
                image: { url: IMG.RANDOM_IMG },
                caption: reply17,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363398430045533@newsletter',
                        newsletterName: '🙃 ʀsɴᴅᴏᴍ ᴍᴇɴᴜ',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );
        
                       break;
                    case '18':               
                        let reply18 =(`    
                        
      *✦『 ᴍɪsᴄ ᴄᴍᴅ  』✦*
*╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄╾╾╾*
*┊❍* ᴠᴠ
*┊❍* ᴜᴘᴅᴀᴛᴇ
*┊❍* ᴀɴᴛɪᴅᴇʟᴇᴛᴇ
*╰──────────●●►*

📊 ᴛᴏᴛᴀʟ ᴄᴏᴍᴍᴀɴᴅs ʟɪsᴛ ᴍɪsᴄ: 3

 ${config.DESCRIPTION}`);
await conn.sendMessage(
            from,
            {
                image: { url: IMG.MISC_IMG },
                caption: reply18,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363398430045533@newsletter',
                        newsletterName: '🗣️ ᴍɪsᴄ ᴍᴇɴᴜ',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );
        
                       break;
                    case '19':               
                        let reply19 =(`  
                        
     *✦『 ᴀɴɪᴍᴇ ᴄᴍᴅ 』✦*
*╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄╾╾╾*
*┊❍* ɴᴇᴋᴏ
*┊❍* ᴡᴀɪғᴜ
*┊❍* ʜᴇɴᴛᴀɪ
*┊❍* ɢᴀʀʟ
*┊❍* ᴡᴀɪғᴜ
*┊❍* ɴᴇᴋᴏ
*┊❍* ᴍᴇɢᴜᴍɪɴ
*┊❍* ᴍᴀɪᴅ
*┊❍* ᴀᴡᴏᴏ
*╰──────────●●►*

📊 ᴛᴏᴛᴀʟ ᴄᴏᴍᴍᴀɴᴅs ʟɪsᴛ ᴀɴɪᴍᴇ: 9

 ${config.DESCRIPTION}`);
await conn.sendMessage(
            from,
            {
                image: { url: IMG.ANIME_IMG },
                caption: reply19,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363398430045533@newsletter',
                        newsletterName: '🎌 ᴀɴɪᴍᴇ ᴍᴇɴᴜ',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );
        
        
                       break;
                    case '20':               
                        let reply20 =(`
                        
    *✦『 sᴜᴘᴘᴏʀᴛ ᴄᴍᴅ  』✦*
*╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄╾╾╾*
*┊❍* ᴄʜᴀɴɴᴇʟ
*┊❍* sᴜᴘᴘᴏʀᴛ
*┊❍* ғᴏʟʟᴏᴡ
*╰──────────●●►*

📊 ᴛᴏᴛᴀʟ ᴄᴏᴍᴍᴀɴᴅs ʟɪsᴛ sᴜᴘᴘᴏʀᴛ: 3

 ${config.DESCRIPTION}`);
await conn.sendMessage(
            from,
            {
                image: { url: IMG.SUPPORT_IMG },
                caption: reply20,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363398430045533@newsletter',
                        newsletterName: '💬 sᴜᴘᴘᴏʀᴛ ᴍᴇɴᴜ',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );
        
        
                       break;
                    case '21':               
                        let reply21 =(`
                        
        〘 𝗔𝗜 𝗠𝗘𝗡𝗨 〙
╭─────────────⪼
*┊❍* *ᴀɪ* 
*┊❍* *ɢᴘᴛ*
*┊❍* *ᴍᴀʟᴠɪɴ*
*┊❍* *ɢᴇᴍɪɴɪ*
*┊❍* *ɢᴘᴛ3*
*┊❍* *ᴍɪsᴛʀᴀᴀɪ*
*┊❍* *ʟʟᴀᴍᴀ3*
*┊❍* *ɢᴘᴛ4o*
*┊❍* *ᴍᴀʟᴠɪɴᴀɪ*
*┊❍* *ᴀɪɪᴍɢ*
*┊❍* *ɢᴇɴᴇʀᴀᴛᴇɪᴍɢ*
╰━━━━∙⋆⋅⋆∙━ ─ • ─┉─⊷

📊 ᴛᴏᴛᴀʟ ᴄᴏᴍᴍᴀɴᴅs ʟɪsᴛ ᴀɪ: 11

 ${config.DESCRIPTION}`);
await conn.sendMessage(
            from,
            {
                image: { url: IMG.AI_IMG },
                caption: reply21,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363398430045533@newsletter',
                        newsletterName: '🤖ᴀɪ ᴍᴇɴᴜ',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );
        
                       break;
                    case '22':               
                        let reply22 =(`   
      *✦『 ᴏᴛʜᴇʀ ᴄᴍᴅ  』✦*
*╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄╾╾╾*
*┊❍* ɴᴘᴍɢᴜɪᴅᴇ
*┊❍* ɢᴘᴀss
*┊❍* ʟᴏɢᴏ
*┊❍* sss
*┊❍* ᴡᴇᴀᴛʜᴇʀ
*╰──────────●●►*

📊 ᴛᴏᴛᴀʟ ᴄᴏᴍᴍᴀɴᴅs ʟɪsᴛ ᴏᴛʜᴇʀ: 5

 ${config.DESCRIPTION}`);
await conn.sendMessage(
            from,
            {
                image: { url: IMG.OTHER_IMG },
                caption: reply22,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363398430045533@newsletter',
                        newsletterName: '🕳ᴏᴛʜᴇʀ ᴍᴇɴᴜ',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );
        
                       break;
                    case '23':               
                        let reply23 =(`
                        
       *✦『 🔞  ᴄᴍᴅ  』✦*
*╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄╾╾╾*
*┊❍* ɴsғᴡ
*┊❍* ᴇᴊᴀᴄᴜʟᴀᴛɪᴏɴ
*┊❍* ᴘᴇɴɪs
*┊❍* ᴇʀᴇᴄ
*┊❍* ɴᴜᴅᴇ
*┊❍* sᴇx
*┊❍* ᴄᴜᴛᴇ
*┊❍* ᴏʀɢᴀsᴍ
*┊❍* ᴀɴᴀʟ
*┊❍* sᴜsᴘᴇɴsɪᴏɴ
*┊❍* xɴxxᴅᴏᴡɴ
*┊❍* xᴠᴅᴏᴡɴ
*╰──────────●●►*

📊 ᴛᴏᴛᴀʟ ᴄᴏᴍᴍᴀɴᴅs ʟɪsᴛ ɴsғᴡ: 12

 ${config.DESCRIPTION}`);
await conn.sendMessage(
            from,
            {
                image: { url: IMG.NSFW_IMG },
                caption: reply23,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363398430045533@newsletter',
                        newsletterName: '🔞ɴsғ ᴍᴇɴᴜ',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );
        
        
                        break;
                    default:
                        reply("Invalid option. Please reply a valid option❗ғᴏʀ ᴇxᴀᴍᴘʟᴇ 1");
                }

            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        reply('An error occurred while processing your request.');
    }
});
