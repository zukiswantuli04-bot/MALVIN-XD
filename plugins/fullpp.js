const { malvin } = require('../malvin');
const Jimp = require("jimp");
const { S_WHATSAPP_NET } = require('@whiskeysockets/baileys');

malvin({
    pattern: "pp",
    desc: "Change the bot's profile picture.",
    category: "owner",
    filename: __filename
}, async (conn, mek, m, {
    quoted,
    isOwner,
    reply
}) => {

    try {
        // Only allow owner to use
        if (!isOwner) return reply("❌ Only the owner can change the bot's profile picture.");

        // Check if the user replied to an image
        if (!quoted || !quoted.message || !quoted.message.imageMessage) {
            return reply("🖼️ Please reply to an image to set as profile picture.");
        }

        // Download the image
        const media = await quoted.download();

        // Process the image with Jimp
        const image = await Jimp.read(media);
        const square = image.cover(720, 720); // crop & resize to 720x720

        const jpegImage = await square.getBufferAsync(Jimp.MIME_JPEG);

        // Update profile picture
        await conn.updateProfilePicture(conn.user.id, jpegImage);
        
        await reply("✅ Profile picture updated successfully!");
    } catch (err) {
        console.error("Error updating profile picture:", err);
        return reply("❌ Failed to update profile picture. Make sure the image is valid.");
    }
});
