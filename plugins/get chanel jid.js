const { malvin } = require('../malvin');

// Function to extract Channel ID from Invite Link
function getChannelIdFromLink(inviteLink) {
    const regex = /whatsapp\.com\/channel\/(\d+)/;
    const match = inviteLink.match(regex);
    return match ? match[1] + "@newsletter" : null;
}

malvin({
    pattern: "jid3",
    desc: "Get the JID of a user, group, or channel.",
    react: "📍",
    category: "admin",
    filename: __filename,
}, async (conn, mek, m, { from, isGroup, sender, isOwner, isAdmins, args, reply }) => {
    try {
        // Check if user is allowed to use this command
        if (isGroup && !isAdmins && !isOwner) {
            return reply("⚠️ Only the bot owner or group admins can use this command.");
        }

        // If argument is a WhatsApp Channel invite link, extract the JID
        if (args.length > 0) {
            const channelJid = getChannelIdFromLink(args[0]);
            if (channelJid) {
                return reply(`🔹 Channel JID: *${channelJid}*`);
            } else {
                return reply("❌ Invalid WhatsApp Channel invite link!");
            }
        }

        // Default: Get JID of Group or User
        const jid = isGroup ? `${from}@g.us` : `${sender}@s.whatsapp.net`;
        reply(`🔹 JID: *${jid}*`);

    } catch (e) {
        console.error("Error:", e);
        reply(`❌ An error occurred: ${e.message}`);
    }
});
