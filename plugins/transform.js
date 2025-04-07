malvin({
    pattern: "gstyle",
    alias: ["ghibliai","gstyle"],
    desc: "Transform your images into Ghibli-style artwork!",
    react: "🎨",
    category: "ai",
    filename: __filename,
    async execute(sock, msg) {
        try {
            if (!msg.message.imageMessage) {
                return await sock.sendMessage(msg.key.remoteJid, { text: "📷 *Send an image with the command!* Example: Reply to an image with `.ghibliai`or `.gstyle`" });
            }

            const media = await sock.downloadMediaMessage(msg);
            const formData = new FormData();
            formData.append("file", media, { filename: "upload.jpg" });

            const response = await fetch("https://romek-ghibli-image.vercel.app/api/upload", {
                method: "POST",
                body: formData
            });

            const data = await response.json();
            if (!data.url) throw new Error("Failed to process image!");

            const caption = `💥 *✨ _GHIBLI AI (IMAGE STYLE)_ ✨*  

\`Your image has been transformed into a stunning Ghibli-style artwork! 🌐\`  

🔗 *Website:* https://romek-ghibli-image.vercel.app/  
👨‍💻 Developed by: *Malvin King* 👍`;

            await sock.sendMessage(msg.key.remoteJid, { image: { url: data.url }, caption });
        } catch (error) {
            console.error("Error processing Ghibli AI image:", error);
            await sock.sendMessage(msg.key.remoteJid, { text: "❌ Failed to transform the image. Try again later!" });
        }
    }
});
