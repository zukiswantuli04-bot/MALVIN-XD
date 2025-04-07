const fs = require('fs');
const path = require('path');
const config = require('../settings');
const { malvin, commands } = require('../malvin');

// Set the path to the 'data' folder
const messageFilePath = path.join(__dirname, '..', 'data', 'groupMessages.json');

// Read the existing messages file if it exists
const readMessages = () => {
    if (fs.existsSync(messageFilePath)) {
        return JSON.parse(fs.readFileSync(messageFilePath));
    }
    return {};  // Default to empty if file doesn't exist
};

// Write messages to the file
const writeMessages = (data) => {
    fs.writeFileSync(messageFilePath, JSON.stringify(data, null, 2));
};

malvin({
    pattern: "setgoodbye",
    desc: "Set the goodbye message for the group.",
    category: "group",
    react: "👋",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isGroup) return reply('This command can only be used in a group.');
        if (!isBotAdmins) return reply('Bot must be an admin to use this command.');
        if (!isAdmins) return reply('You must be an admin to use this command.');

        const goodbye = q;
        if (!goodbye) return reply('Please provide a goodbye message.');

        // Retrieve existing messages or initialize a new object
        const messages = readMessages();
        messages[from] = messages[from] || {};

        // Save the goodbye message for the current group
        messages[from].goodbye = goodbye;
        writeMessages(messages);

        // Get group metadata for dynamic info
        const { subject, desc, participants: memberCount } = groupMetadata;
        const goodbyeMessage = goodbye.replace("{group_name}", subject)
                                       .replace("{group_desc}", desc)
                                       .replace("{member_count}", memberCount);

        await conn.sendMessage(from, { image: { url: config.ALIVE_IMG }, caption: goodbyeMessage });
        await reply('Goodbye message has been set.');
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

malvin({
    pattern: "setwelcome",
    desc: "Set the welcome message for the group.",
    category: "group",
    react: "👋",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isGroup) return reply('This command can only be used in a group.');
        if (!isBotAdmins) return reply('Bot must be an admin to use this command.');
        if (!isAdmins) return reply('You must be an admin to use this command.');

        const welcome = q;
        if (!welcome) return reply('Please provide a welcome message.');

        // Retrieve existing messages or initialize a new object
        const messages = readMessages();
        messages[from] = messages[from] || {};

        // Save the welcome message for the current group
        messages[from].welcome = welcome;
        writeMessages(messages);

        // Get group metadata for dynamic info
        const { subject, desc, participants: memberCount } = groupMetadata;
        const welcomeMessage = welcome.replace("{group_name}", subject)
                                      .replace("{group_desc}", desc)
                                      .replace("{member_count}", memberCount);

        await conn.sendMessage(from, { image: { url: config.ALIVE_IMG }, caption: welcomeMessage });
        await reply('Welcome message has been set.');
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// Handle group events to send dynamic welcome/goodbye messages
malvin({
    pattern: "onjoin",
    desc: "Send a welcome message when a new member joins the group.",
    category: "group",
    react: "🎉",
    filename: __filename
}, async (conn, mek, m, { from, isGroup, groupMetadata, participants }) => {
    if (!isGroup) return;

    const { subject, desc, participants: memberCount } = groupMetadata;

    // Get the welcome message from saved messages
    const messages = readMessages();
    const welcomeMessage = messages[from]?.welcome || "Welcome to {group_name}!\n\nGroup Description: {group_desc}\nTotal Members: {member_count}";
    
    // Replace dynamic placeholders
    const formattedMessage = welcomeMessage.replace("{group_name}", subject)
                                           .replace("{group_desc}", desc)
                                           .replace("{member_count}", memberCount);

    // Send welcome message to the group
    await conn.sendMessage(from, { text: formattedMessage });
});

malvin({
    pattern: "onleave",
    desc: "Send a goodbye message when a member leaves the group.",
    category: "group",
    react: "👋",
    filename: __filename
}, async (conn, mek, m, { from, isGroup, groupMetadata, participants }) => {
    if (!isGroup) return;

    const { subject, desc, participants: memberCount } = groupMetadata;

    // Get the goodbye message from saved messages
    const messages = readMessages();
    const goodbyeMessage = messages[from]?.goodbye || "Goodbye from {group_name}!\n\nGroup Description: {group_desc}\nTotal Members: {member_count}";

    // Replace dynamic placeholders
    const formattedMessage = goodbyeMessage.replace("{group_name}", subject)
                                           .replace("{group_desc}", desc)
                                           .replace("{member_count}", memberCount);

    // Send goodbye message to the group
    await conn.sendMessage(from, { text: formattedMessage });
});
