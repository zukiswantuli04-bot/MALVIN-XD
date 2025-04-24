

const config = require('../settings')
const {malvin , commands} = require('../malvin')
const os = require("os")
const {runtime} = require('../lib/functions')

malvin({
    pattern: "system",
    react: "⚙️",
    alias: ["system"],
    desc: "Check system uptime and status.",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, quoted, reply }) => {
    try {
        // ✅ Données système
        const uptime = runtime(process.uptime());
        const usedRam = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        const totalRam = Math.round(os.totalmem() / 1024 / 1024);
        const hostname = os.hostname();

        // ✅ Design avec une mise en page améliorée
        const status = `
┌─ ⦿ *SYSTEM STATUS* ⦿ ─
│ 🚀 *Uᴘᴛɪᴍᴇ:*       ➔ ${uptime}

│ 💾 *Rᴀᴍ ᴜsᴀɢᴇ:*    ➔ ${usedRam}MB / ${totalRam}MB

│ 🌐 *Hᴏsᴛɴᴀᴍᴇ:*     ➔ ${hostname}

│ 👑 *Oᴡɴᴇʀ:*        ➔ *ᴍᴀʟᴠɪɴ ᴋɪɴɢ*
└───────────────
        `.trim();

        // ✅ Envoi du message formaté avec une image personnalisée

await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/7hqhsw.jpg` },
                caption:  `🎯 *System Info* 🎯\n\n${status}`,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363398430045533@newsletter',
                        newsletterName: 'Malvin King Tech',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

