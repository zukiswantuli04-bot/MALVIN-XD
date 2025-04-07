const { malvin } = require('../malvin');
const os = require("os");

// ---------------------
// Command: uptime
// ---------------------
malvin({
    pattern: "uptime",
    alias: ["uptime"],
    desc: "Check bot's uptime",
    category: "main",
    react: "🕑",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const uptimeSeconds = os.uptime(); // Get system uptime in seconds
        const formattedUptime = formatUptime(uptimeSeconds); // Format the uptime

        const statusMessage = generateStatusMessage(formattedUptime); // Generate status message

        // Send message with uptime and image
        await sendUptimeMessage(conn, from, statusMessage, m.sender);

    } catch (e) {
        console.error("Error in uptime command:", e);
        reply(`❌ Error: Could not retrieve uptime due to: ${e.message}`);
    }
});

// ---------------------
// Helper Functions
// ---------------------

// Format uptime into a human-readable string
function formatUptime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const sec = Math.floor(seconds % 60);
    return `${hours} hours, ${minutes} minutes, ${sec} seconds`;
}

// Generate the status message with formatted uptime
function generateStatusMessage(uptimeFormatted) {
    return `*⏰ Uptime:*\n${uptimeFormatted}`;
}

// Send the message with the uptime and the image
async function sendUptimeMessage(conn, from, statusMessage, sender) {
    const imageUrl = "https://files.catbox.moe/2prjby.jpg"; // Image URL for uptime

    try {
        await conn.sendMessage(from, { 
            image: { url: imageUrl },
            caption: statusMessage,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363398430045533@newsletter',
                    newsletterName: 'Uptime',
                    serverMessageId: 143
                }
            }
        }, { quoted: m });
    } catch (error) {
        console.error("Error sending uptime message:", error);
        // Fallback in case the image URL is broken
        const fallbackImageUrl = "https://files.catbox.moe/2prjby.jpg"; // Fallback image URL
        await conn.sendMessage(from, {
            text: statusMessage, // Send text if image fails
        }, { quoted: m });
    }
}
