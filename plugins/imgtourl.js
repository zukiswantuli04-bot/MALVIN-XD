const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { malvin } = require("../malvin");

malvin({
  pattern: "tourl2",
  alias: ["imgtourl2", "img2url", "url2"],
  react: "🔗",
  desc: "Convert an image to a URL using ImgBB.",
  category: "convert",
  use: ".tourl (Reply to an image)",
  filename: __filename
}, async (conn, m, store, { from, quoted, reply, sender }) => {
  try {
    const targetMsg = quoted ? quoted : m;
    const mimeType = (targetMsg.msg || targetMsg).mimetype || "";

    if (!mimeType || !mimeType.startsWith("image")) {
      return reply("❌ *Please reply to an image to convert it to a URL.*");
    }

    reply("⏳ *Uploading image, please wait...*");

    const imageBuffer = await targetMsg.download();
    const tempFilePath = path.join(os.tmpdir(), `malvin_img_${Date.now()}.jpg`);
    fs.writeFileSync(tempFilePath, imageBuffer);

    const formData = new FormData();
    formData.append("image", fs.createReadStream(tempFilePath));

    const API_KEY = "e909ac2cc8d50250c08f176afef0e333"; // Store this in config for better security
    const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${API_KEY}`, formData, {
      headers: formData.getHeaders(),
    });

    fs.unlinkSync(tempFilePath); // Delete temp file after upload

    if (!data || !data.data || !data.data.url) {
      throw new Error("Failed to upload the image.");
    }

    const imageUrl = data.data.url;
    const fileSize = (imageBuffer.length / 1024).toFixed(2); // Convert to KB
    const timestamp = new Date().toLocaleString();

    const msgContext = {
      mentionedJid: [sender],
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363398430045533@newsletter",
        newsletterName: "ᴍᴀʟᴠɪɴ ᴋɪɴɢ",
        serverMessageId: 143
      }
    };

    await conn.sendMessage(from, {
      text: `✅ *Image Uploaded Successfully 📸*\n🕒 *Timestamp:* ${timestamp}\n📏 *Size:* ${fileSize} KB\n🔗 *URL:* ${imageUrl}\n\n> ⚖️ *Uploaded via MALVIN-AI*`,
      contextInfo: msgContext
    });

  } catch (error) {
    console.error("Upload Error:", error);
    reply(`❌ *An error occurred while uploading the image.*\n\n🛑 _Error:_ ${error.message}`);
  }
});
