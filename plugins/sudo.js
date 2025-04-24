const { malvin } = require('../malvin');

malvin({
    pattern: ["addsudo", "addowner"],
    desc: "👑 Add a user as a sudo/owner",
    react: "⚡",
    category: "admin",
    filename: __filename,
}, async (conn, mek, m, { args, isCreator, reply, saveDatabase, text }) => {
    if (!isCreator) return reply("❌ Only the bot owner can use this command.");

    if (m.chat.endsWith('@g.us') && !(m.mentionedJid && m.mentionedJid[0]) && !(m.quoted && m.quoted.sender)) {
        return reply('⚠️ Reply to or tag a person to add them!');
    }

    let mentionedUser = m.mentionedJid && m.mentionedJid[0];
    let quotedUser = m.quoted && m.quoted.sender;
    let userToAdd = mentionedUser || quotedUser || (text ? text.replace(/\D/g, "") + "@s.whatsapp.net" : null) || m.chat;

    if (!userToAdd) return reply('⚠️ Mention a user or reply to their message to add them as a sudo user.');

    const sudoList = global.db.sudo;

    if (!sudoList.includes(userToAdd)) {
        sudoList.push(userToAdd);
        await saveDatabase();
        await reply(`✅ @${userToAdd.split('@')[0]} has been added to the sudo list. They can now use bot functions even in private mode.`);
    } else {
        await reply(`⚠️ @${userToAdd.split('@')[0]} is already a sudo user.`);
    }
});

malvin({
    pattern: "sudoList",
    desc: "📜 Get the list of sudo users",
    react: "📄",
    category: "admin",
    filename: __filename,
}, async (conn, mek, m, { reply }) => {
    const sudoList = global.db.sudo;
    if (sudoList.length === 0) return reply("⚠️ No sudo users found.");
    let message = "👑 *Sudo Users List:*\n\n";
    sudoList.forEach((user, index) => {
        message += `${index + 1}. @${user.split('@')[0]}\n`;
    });
    return reply(message, { mentions: sudoList });
});

malvin({
    pattern: "delsudo",
    desc: "❌ Remove a user from the sudo list",
    react: "🚫",
    category: "admin",
    filename: __filename,
}, async (conn, mek, m, { args, isCreator, reply, saveDatabase, text }) => {
    if (!isCreator) return reply("❌ Only the bot owner can use this command.");

    let mentionedUser = m.mentionedJid && m.mentionedJid[0];
    let quotedUser = m.quoted && m.quoted.sender;
    let userToRemove = mentionedUser || quotedUser || (text ? text.replace(/\D/g, "") + "@s.whatsapp.net" : null);

    if (!userToRemove) return reply('⚠️ Mention a user or reply to their message to remove them from sudo list.');

    const sudoList = global.db.sudo;
    const index = sudoList.indexOf(userToRemove);
    
    if (index === -1) {
        return reply(`⚠️ @${userToRemove.split('@')[0]} is not in the sudo list.`);
    }

    sudoList.splice(index, 1);
    await saveDatabase();
    return reply(`✅ @${userToRemove.split('@')[0]} has been removed from the sudo list.`);
});

malvin({
    pattern: "dbview",
    desc: "📂 View the entire database",
    react: "🗄️",
    category: "admin",
    filename: __filename,
}, async (conn, mek, m, { reply, isCreator }) => {
    if (!isCreator) return reply("❌ Only the bot owner can use this command.");
    return reply(`🗂️ *Database Contents:*\n\n\`\`\`${JSON.stringify(global.db, null, 2)}\`\`\``);
});
