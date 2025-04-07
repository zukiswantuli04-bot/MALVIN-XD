const { malvin, commands } = require('../malvin');
const yts = require("yt-search");
const axios = require("axios");

// Video download command
malvin({
  pattern: "video2",
  alias: ["ytvid2", "ytv2", "ytmp4", "ytvideo2"],
  react: '⏳',
  desc: "Download videos from YouTube by searching for keywords.",
  category: "download",
  use: ".vidx <keywords>",
  filename: __filename
}, async (client, message, from, { args, reply }) => {
  try {
    const searchQuery = args.join(" ");
    if (!searchQuery) {
      return reply("*Please provide a video title or URL*");
    }

    reply("```_© Malvin Xd Gᴇɴᴇʀᴀᴛɪɴɢ Vɪᴅᴇᴏ Pʟᴇᴀsᴇ Wᴀɪᴛ..._```");

    const searchResults = await yts(searchQuery);
    if (!searchResults.videos || searchResults.videos.length === 0) {
      return reply(`❌ No results found for "${searchQuery}".`);
    }

    const video = searchResults.videos[0];
    const videoUrl = video.url;
    const downloadUrl = `https://api.gifted.my.id/api/download/dlmp4?apikey=gifted&url=${videoUrl}`;

    const response = await axios.get(downloadUrl);
    if (!response.data.success) {
      return reply(`❌ Failed to fetch video for "${searchQuery}".`);
    }

    const { download_url: videoDownloadUrl } = response.data.result;
    await client.sendMessage(from, {
      video: { url: videoDownloadUrl },
      mimetype: "video/mp4"
    }, { quoted: message });
  } catch (error) {
    console.error(error);
    reply("❌ An error occurred while processing your request.");
  }
});

// Audio download command
malvin({
  pattern: "play2",
  alias: ["yta2", "ytplay2"],
  react: '⏳',
  desc: "Download audio from YouTube by searching for keywords.",
  category: "download",
  use: ".playx <keywords>",
  filename: __filename
}, async (client, message, from, { args, reply }) => {
  try {
    const searchQuery = args.join(" ");
    if (!searchQuery) {
      return reply("*Please provide an audio title or URL*");
    }

    reply("```© _Malvin_ Gᴇɴᴇʀᴀᴛɪɴɢ Sᴏɴɢ Pʟᴇᴀsᴇ Wᴀɪᴛ...```");

    const searchResults = await yts(searchQuery);
    if (!searchResults.videos || searchResults.videos.length === 0) {
      return reply(`❌ No results found for "${searchQuery}".`);
    }

    const video = searchResults.videos[0];
    const videoUrl = video.url;
    const downloadUrl = `https://api.gifted.my.id/api/download/dlmp3?apikey=gifted&url=${videoUrl}`;

    const response = await axios.get(downloadUrl);
    if (!response.data.success) {
      return reply(`❌ Failed to fetch audio for "${searchQuery}".`);
    }

    const { download_url: audioDownloadUrl } = response.data.result;
    await client.sendMessage(from, {
      audio: { url: audioDownloadUrl },
      mimetype: 'audio/mp4',
      ptt: false
    }, { quoted: message });
  } catch (error) {
    console.error(error);
    reply("❌ An error occurred while processing your request.");
  }
});
