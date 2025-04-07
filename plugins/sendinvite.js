const { malvin } = require('../malvin');

malvin({
    pattern: "sendinvite",
    alias: "sinvite",
    desc: "Send an invite link to join the channel.",
    react: "📍",
    category: "group",
    filename: __filename,
}, async (conn, mek, m, { from, isGroup, sender, isOwner, isAdmins, reply }) => {
    try {
        // Make sure only admins or owner can use this feature in a group
        if (isGroup && !isAdmins && !isOwner) {
            return reply("⚠️ Only the bot owner or group admins can use this command.");
        }

        // Your channel invite link (update with your actual invite link)
        const channelInviteLink = "https://whatsapp.com/channel/0029VbA6MSYJUM2TVOzCSb2A";

        // Send the invite link to users
        reply(`🔹 Click here to join the channel: ${channelInviteLink}`);
    } catch (e) {
        console.error("Error:", e);
        reply(`❌ An error occurred: ${e.message}`);
    }
});
