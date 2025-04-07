const config = require('../settings');
const { malvin } = require('../malvin');
const { ytsearch } = require('@dark-yasiya/yt-dl.js');
const fetch = require('node-fetch');

// Helper function to create a compact progress bar
const createProgressBar = (percent) => {
    const totalBars = 10;
    const filledBars = Math.floor((percent / 100) * totalBars);
    return '[' + '#'.repeat(filledBars) + '-'.repeat(totalBars - filledBars) + ']';
};

// Generic function to handle downloads
async function processYoutubeDownload(conn, mek, from, q, type) {
    if (!q) return await mek.reply("Please provide a YouTube URL or song name.");
    
    const yt = await ytsearch(q);
    if (!yt.results.length) return mek.reply("No results found!");
    
    let yts = yt.results[0];
    let apiUrl = type === 'video'
        ? `https://apis.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(yts.url)}`
        : `https://apis.davidcyriltech.my.id/youtube/mp3?url=${encodeURIComponent(yts.url)}`;
    
    let progressPercent = 0;
    let message = await mek.reply(`Fetching ${type}... ${createProgressBar(progressPercent)} (${progressPercent}%)`);
    
    try {
        let response = await fetch(apiUrl);
        let data = await response.json();
        
        if (!data.success || !data.result.download_url) {
            return mek.reply(`Failed to fetch the ${type}. Please try again later.`);
        }
        
        progressPercent = 100;
        await message.update(`Fetching ${type}... ${createProgressBar(progressPercent)} (${progressPercent}%)`);
        
        let ytmsg = `
╭━━━[ *ᴍᴀʟᴠɪɴ ᴋɪɴɢ* ]━━┈⊷
┊๏ *📽 ${type.toUpperCase()} DOWNLOADER 📽*
╰────────────┈⊷
╭─┄┄──┄┄──┄┄───⪼
┇ℹ️ *TITLE* - ${yts.title}
┇⏳ *DURATION* - ${yts.timestamp}
┇👀 *VIEWS* - ${yts.views}
┇👤 *AUTHOR* - ${yts.author.name}
┇🖇️ *LINK* - ${yts.url}
╰┈┈┈┈┈┈┈┈┈┈┅┄┄┄┄┄┄┄⪼

> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍᴀʟᴠɪɴ ᴋɪɴɢ ♡*`;
        
        await conn.sendMessage(from, { image: { url: data.result.thumbnail || '' }, caption: ytmsg }, { quoted: mek });
        
        let fileType = await mek.reply("Choose file type: \n1. Audio \n2. Video \n3. Document");
        if (fileType === '1') {
            await conn.sendMessage(from, { audio: { url: data.result.download_url }, mimetype: "audio/mpeg" }, { quoted: mek });
        } else if (fileType === '2') {
            await conn.sendMessage(from, { video: { url: data.result.download_url }, mimetype: "video/mp4" }, { quoted: mek });
        } else if (fileType === '3') {
            await conn.sendMessage(from, {
                document: { url: data.result.download_url },
                mimetype: type === 'video' ? "video/mp4" : "audio/mpeg",
                fileName: `${yts.title}.${type === 'video' ? 'mp4' : 'mp3'}`,
                caption: `> *${yts.title}*\n> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍᴀʟᴠɪɴ ᴋɪɴɢ ♡*`
            }, { quoted: mek });
        } else {
            await mek.reply("Invalid option! Please reply with `1` for audio, `2` for video, or `3` for document.");
        }
    } catch (error) {
        console.log(error);
        mek.reply("An error occurred. Please try again later.");
    }
}

// Registering the 'video' command
malvin({
    pattern: "video",
    alias: ["video"],
    react: "🎥",
    desc: "Download YouTube video",
    category: "download",
    use: '.video <YouTube URL or Name>',
    filename: __filename
}, async (conn, mek, m, { from, q }) => {
    await processYoutubeDownload(conn, mek, from, q, 'video');
});

// Registering the 'play' command
malvin({
    pattern: "play",
    alias: ["play"],
    react: "🎶",
    desc: "Download YouTube song",
    category: "download",
    use: '.play <YouTube URL or Name>',
    filename: __filename
}, async (conn, mek, m, { from, q }) => {
    await processYoutubeDownload(conn, mek, from, q, 'audio');
});
