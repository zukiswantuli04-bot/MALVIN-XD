const { malvin } = require('../malvin');

// Trigger keywords
const triggerWords = ["send", "share", "forward", "status", "abeg"];

malvin({
    pattern: "statusAuto",
    react: "📤",
    desc: "Automatically responds to status requests when a trigger word is detected.",
    category: "main",
    use: ".statusAuto",
    filename: __filename
}, async (conn, mek, m, { from, body, quoted, sender, reply }) => {
    try {
        // Check if the message contains any trigger word
        if (triggerWords.some(word => body.toLowerCase().includes(word))) {

            // Check if it's a reply to a viewOnce message
            if (quoted && quoted.message && quoted.message.viewOnceMessage) {
                const viewOnce = quoted.message.viewOnceMessage;

                // Send image or video based on status type
                if (viewOnce.message.imageMessage) {
                    await conn.sendMessage(sender, {
                        image: viewOnce.message.imageMessage,
                        caption: "📸 Here's the requested status."
                    });
                } else if (viewOnce.message.videoMessage) {
                    await conn.sendMessage(sender, {
                        video: viewOnce.message.videoMessage,
                        caption: "🎥 Here's the requested status."
                    });
                } else {
                    reply("❌ This status is neither an image nor a video.");
                }
            } else {
                reply("⚠️ To get a status, *reply directly* to a viewed status with a trigger word (e.g., 'send').");
            }
        }

    } catch (e) {
        console.error("Error in statusAuto:", e);
        reply("❌ An error occurred while processing the status request.");
    }
});
