const { malvin } = require('../malvin');
const webp = require('node-webpmux');
const fs = require('fs-extra');
const { Sticker } = require("wa-sticker-formatter");
const Config = require('../settings');

// Convert Sticker to Image
malvin(
    {
        pattern: 'sticker2img',
        alias: ['s2i', 'stickertoimage', 'toimg', 'toimage', 'tophoto', 'sticker2image'],
        desc: 'Convert a sticker to an image.',
        category: 'sticker',
        use: '<reply to a sticker>',
        filename: __filename,
    },
    async (conn, mek, m, { quoted, args, q, reply, from }) => {
        try {
            if (!mek.quoted) return reply(`*Please reply to a sticker.*`);
            let mime = mek.quoted.mtype;

            // Check if the replied media is a sticker
            if (mime === "stickerMessage") {
                let media = await mek.quoted.download();
                let imgBuffer = await webpToImage(media);
                
                // Send the converted image back
                await conn.sendMessage(mek.chat, { image: imgBuffer }, { quoted: mek });
            } else {
                return reply("*Please reply to a valid sticker.*");
            }
        } catch (e) {
            console.error(e);
            return reply("*An error occurred while converting the sticker.*");
        }
    }
);

// Function to convert WebP to Image
async function webpToImage(webpBuffer) {
    try {
        const img = new webp.Image();
        await img.load(webpBuffer);
        const imageBuffer = await img.getBuffer('image/png'); // You can change 'image/png' to 'image/jpeg' if needed
        return imageBuffer;
    } catch (error) {
        console.error("Error converting WebP to image:", error);
        throw new Error("Failed to convert sticker.");
    }
}
