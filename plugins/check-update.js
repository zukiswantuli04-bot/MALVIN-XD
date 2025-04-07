const axios = require('axios');
const os = require('os');
const fs = require('fs');
const path = require('path');
const { malvin, commands } = require('../malvin');
const { runtime } = require('../lib/functions');

malvin({
  pattern: 'version',
  alias: ["changelog", "cupdate", "checkupdate"],
  react: '🚀',
  desc: "Check bot's version, system stats, and update info.",
  category: 'info',
  filename: __filename
}, async (conn, mek, m, {
  from, sender, pushname, reply
}) => {
  try {
    // Read local version data
    const localVersionPath = path.join(__dirname, '../data/version.json');
    let localVersion = 'Unknown';
    let changelog = 'No changelog available.';
    if (fs.existsSync(localVersionPath)) {
      const localData = JSON.parse(fs.readFileSync(localVersionPath));
      localVersion = localData.version;
      changelog = localData.changelog;
    }

    // Fetch latest version data from GitHub
    const rawVersionUrl = 'https://raw.githubusercontent.com/XdKing2/MALVIN-XD/main/data/version.json';
    let latestVersion = 'Unknown';
    let latestChangelog = 'No changelog available.';
    try {
      const { data } = await axios.get(rawVersionUrl);
      latestVersion = data.version;
      latestChangelog = data.changelog;
    } catch (error) {
      console.error('Failed to fetch latest version:', error);
    }

    // Count total plugins
    const pluginPath = path.join(__dirname, '../plugins');
    const pluginCount = fs.readdirSync(pluginPath).filter(file => file.endsWith('.js')).length;

    // Count total registered commands
    const totalCommands = commands.length;

    // System info
    const uptime = runtime(process.uptime());
    const ramUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
    const totalRam = (os.totalmem() / 1024 / 1024).toFixed(2);
    const hostName = os.hostname();
    const lastUpdate = fs.statSync(localVersionPath).mtime.toLocaleString();

    // Check update status
    let updateMessage = `✅ Your MALVIN XD bot is up-to-date!`;
    if (localVersion !== latestVersion) {
      updateMessage = `🚀 Your MALVIN-XD bot is outdated! 
🔸 *Current Version:* ${localVersion} 
🔹 *Latest Version:* ${latestVersion}

✨ Update now with *.update* and enjoy the new features!`;
    }

    const statusMessage = `
🌟 *Hello ${pushname}, here's the latest info for you!* 🌟

📌 *Bot Name:* MALVIN-XD
🔖 *Current Version:* ${localVersion}
📢 *Latest Version:* ${latestVersion}

🔍 *Total Plugins Installed:* ${pluginCount}
🔢 *Total Commands Registered:* ${totalCommands}

💾 *System Info:*
⏳ *Uptime:* ${uptime}
📟 *RAM Usage:* ${ramUsage}MB / ${totalRam}MB
⚙️ *Host Name:* ${hostName}
📅 *Last Update:* ${lastUpdate}

📝 *Changelog:*
${latestChangelog}

⭐ *Check out the GitHub Repo:* [MALVIN-XD Repo](https://github.com/XdKing2/MALVIN-XD)

${updateMessage}

🚀 *Don't forget to fork & star the repo to support development!*

> 📝 *Note:* This bot is constantly evolving, and updates come with exciting new features!`;

    // Send the status message with an image and context info
    await conn.sendMessage(from, {
      image: { url: 'https://files.catbox.moe/bqs70b.jpg' },
      caption: statusMessage,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363398430045533@newsletter',
          newsletterName: 'Malvin XD',
          serverMessageId: 143
        }
      }
    }, { quoted: mek });
  } catch (error) {
    console.error('Error fetching version info:', error);
    reply('❌ An error occurred while checking the bot version.');
  }
});
