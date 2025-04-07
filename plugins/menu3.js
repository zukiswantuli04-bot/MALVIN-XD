/* Created by King Malvin 🕵
Contact dev1: 263780934873 ♻️
Contact dev2: https://t.me/malvinking2 ♻️
© Just give credit will you ⚠
*/

const config = require('../settings');
const { malvin, commands } = require('../malvin');

// Utility function to generate command list for a category
const generateCategoryMenu = (category) => {
    const categoryCommands = commands.filter(cmd => cmd.category === category && cmd.pattern && !cmd.dontAddCommandList);
    return categoryCommands.length > 0
        ? categoryCommands.map(cmd => cmd.pattern).join(', ')
        : 'No commands available.';
};

malvin({
    pattern: "menu3",
    react: "👾",
    alias: ["allmenu"],
    desc: "Get command list",
    category: "main",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // List of categories to generate menus for
        const categories = [
            'admin', 'owner1', 'menu', 'info', 'settings', 'owner', 'download', 
            'movie', 'main', 'group', 'convert', 'search', 'utility', 'fun', 
            'game', 'tools', 'sticker', 'random', 'misc', 'anime', 'stalk', 
            'support', 'logo', 'other', 'nsfw'
        ];

        // Generate the menu for each category
        const menu = categories.reduce((acc, category) => {
            acc[category] = generateCategoryMenu(category);
            return acc;
        }, {});

        // Constructing the menu message
        const madeMenu = `
╭───❍「 *${config.BOT_NAME}* 」
┊ 🧑 *ᴜsᴇʀ:* ${pushname} 
┊ 🌐 *ᴏᴅᴇ:* *[${config.MODE}]*
┊ ✨ *ᴘʀᴇғɪx:* *[${config.PREFIX}]*
┊ 🪀 *ᴛᴏᴛᴀʟ ᴄᴏᴍᴍᴀɴᴅs :* *${commands.length}*
┊ 🎐 *ᴠᴇʀsɪᴏɴ:* *${config.version} ʙᴇᴛᴀ☯︎*
╰───────────❍

${Object.entries(menu).map(([category, commandsList]) => {
    return `   *✦『 ${category.toUpperCase()} CMD 』✦\n*╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄╾╾╾*\n${commandsList}\n*╰──────────●●►*\n`;
}).join('\n')}

╭──────────╾╾╾
${config.DESCRIPTION}
╰──────────╾╾╾
`;

        // Send the message with the menu
        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/7hqhsw.jpg` },
                caption: madeMenu,
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
        reply('Something went wrong while generating the menu.');
    }
});
