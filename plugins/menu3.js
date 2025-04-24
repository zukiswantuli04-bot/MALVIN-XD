const config = require('../settings');
const { malvin, commands } = require('../malvin');

const toTinyCap = (text) => {
    const tinyMap = {
        a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ', e: 'ᴇ', f: 'ғ', g: 'ɢ',
        h: 'ʜ', i: 'ɪ', j: 'ᴊ', k: 'ᴋ', l: 'ʟ', m: 'ᴍ', n: 'ɴ',
        o: 'ᴏ', p: 'ᴘ', q: 'ǫ', r: 'ʀ', s: 's', t: 'ᴛ', u: 'ᴜ',
        v: 'ᴠ', w: 'ᴡ', x: 'x', y: 'ʏ', z: 'ᴢ'
    };
    return text.toLowerCase().split('').map(char => tinyMap[char] || char).join('');
};

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

        let menuBody = categories.map(category => {
            const cmds = generateCategoryMenu(category);
            return `┌──『 *${category.toUpperCase()}* 』\n${cmds}\n└─────────────`;
        }).join('\n\n');

        const fullText = `
╭───❍「 *${config.BOT_NAME}* 」
│ 🧑 *User:* ${pushname}
│ ⚙️ *Mode:* ${config.MODE}
│ ✨ *Prefix:* ${config.PREFIX}
│ 🧩 *Total Commands:* ${commands.length}
│ 🧪 *Version:* ${config.version} Beta
╰─────────────────❍

${menuBody}

╭──────────────◆
${config.DESCRIPTION}
╰──────────────◆
        `.trim();

        const imageURL = 'https://files.catbox.moe/7hqhsw.jpg';

        // Try sending with image, fall back to plain text
        await conn.sendMessage(from, {
            image: { url: imageURL },
            caption: fullText,
        }, { quoted: mek }).catch(async () => {
            await reply(fullText);
        });

    } catch (e) {
        console.error("❌ Menu error:", e);
        reply('❌ Error while showing menu.');
    }
});
