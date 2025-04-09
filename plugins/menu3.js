

/* Created by King Malvin 🕵
Contact dev1: 263780934873 ♻️
Contact dev2: https://t.me/malvinking2 ♻️
© Just give credit will you ⚠
*/

const config = require('../settings');
const { malvin, commands } = require('../malvin');

// Function to convert string to tinycap
const toTinyCap = (text) => {
    const tinyMap = {
        a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ', e: 'ᴇ', f: 'ғ', g: 'ɢ',
        h: 'ʜ', i: 'ɪ', j: 'ᴊ', k: 'ᴋ', l: 'ʟ', m: 'ᴍ', n: 'ɴ',
        o: 'ᴏ', p: 'ᴘ', q: 'ǫ', r: 'ʀ', s: 's', t: 'ᴛ', u: 'ᴜ',
        v: 'ᴠ', w: 'ᴡ', x: 'x', y: 'ʏ', z: 'ᴢ'
    };
    return text.toLowerCase().split('').map(char => tinyMap[char] || char).join('');
};

// Generate styled command list per category
const generateCategoryMenu = (category) => {
    const categoryCommands = commands.filter(
        cmd => cmd.category === category && cmd.pattern && !cmd.dontAddCommandList
    );
    return categoryCommands.length
        ? categoryCommands.map(cmd => `  ➤ ${toTinyCap(cmd.pattern)}`).join('\n')
        : '  ✖ No commands available.';
};

malvin({
    pattern: "menu3",
    react: "👾",
    alias: ["allmenu"],
    desc: "Get command list",
    category: "main",
    filename: __filename
}, async (conn, mek, m, { from, pushname, reply }) => {
    try {
        const categories = [
            'admin', 'owner1', 'menu', 'info', 'settings', 'owner', 'download',
            'movie', 'main', 'group', 'convert', 'search', 'utility', 'fun',
            'game', 'tools', 'sticker', 'random', 'misc', 'anime', 'stalk',
            'support', 'logo', 'other', 'nsfw'
        ];

        const menu = categories.map(category => {
            const cmds = generateCategoryMenu(category);
            return `┌──『 *${category.toUpperCase()}* 』\n${cmds}\n└─────────────\n`;
        }).join('\n');

        const madeMenu = `
╭───❍「 *${config.BOT_NAME}* 」
│ 🧑 *User:* ${pushname}
│ ⚙️ *Mode:* ${config.MODE}
│ ✨ *Prefix:* ${config.PREFIX}
│ 🧩 *Total Commands:* ${commands.length}
│ 🧪 *Version:* ${config.version} Beta
╰─────────────────❍

${menu}

╭──────────────◆
${config.DESCRIPTION}
╰──────────────◆
`;

        await conn.sendMessage(
            from,
            {
                image: { url: 'https://files.catbox.moe/7hqhsw.jpg' },
                caption: madeMenu.trim(),
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363398430045533@newsletter',
                        newsletterName: 'MALVIN-XD MENU 3',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );
    } catch (err) {
        console.error(err);
        reply('⚠️ Something went wrong while generating the menu.');
    }
});
