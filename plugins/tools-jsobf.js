const config = require('../settings');
const { malvin } = require('../malvin');
const JavaScriptObfuscator = require("javascript-obfuscator");
const fs = require('fs');
const path = require('path');
const unzipper = require('unzipper');

malvin({
  pattern: "obfuscate",
  alias: ["obf", "confuse"],
  desc: "Obfuscate JavaScript code (supports .js files & ZIP archives).",
  category: "utility",
  use: ".obfuscate <code> or upload .js/.zip files",
  filename: __filename,
}, async (conn, mek, msg, { from, args, reply, quoted, mime }) => {
  try {
    let code = args.join(" ");
    let fileCount = 0;
    let tempDir = path.join(__dirname, "temp_obfuscate");

    // Ensure temp directory exists
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

    // Handle file uploads
    if (msg.message?.extendedTextMessage?.contextInfo?.quotedMessage) {
      const messages = msg.message.extendedTextMessage.contextInfo.quotedMessage;
      const keys = Object.keys(messages);
      let allCode = "";

      for (let key of keys) {
        if (fileCount >= 100) break;
        let message = messages[key];

        // Download and process files
        if (message.mimetype === "application/zip") {
          // Handle ZIP file
          const zipPath = await conn.downloadAndSaveMediaMessage(message);
          const extractPath = path.join(tempDir, `zip_${Date.now()}`);

          await fs.createReadStream(zipPath)
            .pipe(unzipper.Extract({ path: extractPath }))
            .promise();

          fs.unlinkSync(zipPath); // Delete ZIP file after extraction

          // Read extracted files
          const files = fs.readdirSync(extractPath);
          for (let file of files) {
            if (fileCount >= 100) break;
            if (file.endsWith(".js")) {
              allCode += fs.readFileSync(path.join(extractPath, file), "utf-8") + "\n\n";
              fileCount++;
            }
          }

          // Clean up extracted files
          fs.rmSync(extractPath, { recursive: true, force: true });
        } else if (message.mimetype === "text/javascript") {
          // Handle single JS file
          const jsPath = await conn.downloadAndSaveMediaMessage(message);
          allCode += fs.readFileSync(jsPath, "utf-8") + "\n\n";
          fs.unlinkSync(jsPath);
          fileCount++;
        }
      }

      if (fileCount === 0) return reply("❌ No valid JavaScript files found in uploaded ZIP or attachments.");
      code = allCode.trim();
      reply(`📂 Processed ${fileCount} JavaScript files.`);
    }

    if (!code) return reply("❌ Please provide JavaScript code, upload .js files, or a ZIP archive.");

    // Obfuscate the combined code
    const obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
      compact: true,
      controlFlowFlattening: true,
      deadCodeInjection: true,
      debugProtection: true,
      disableConsoleOutput: true,
      stringArray: true,
      stringArrayEncoding: ["base64"],
      rotateStringArray: true,
    }).getObfuscatedCode();

    reply(`🔐 *Obfuscated Code*:\n\`\`\`js\n${obfuscatedCode}\n\`\`\``);
  } catch (error) {
    console.error("🚨 Error in obfuscate command:", error);
    reply("❌ An error occurred while obfuscating the code.");
  }
});
