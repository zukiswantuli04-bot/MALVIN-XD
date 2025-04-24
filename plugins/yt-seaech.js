const { malvin, commands } = require('../malvin');
const ytdl = require('yt-search');
const fs = require('fs-extra');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('../lib/functions');

malvin({
    pattern: "yts",
    alias: ["ytsearch"],
    use: '.yts malvintech2',
    react: "🔎",
    desc: "Search and get details from youtube.",
    category: "search",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply('*Please give me words to search*');

        let yts = require("yt-search");
        let arama = await yts(q);
        if (!arama.all || arama.all.length === 0) return reply('*No results found*');

        var mesaj = '';
        const limit = 5; // Limit to 5 results
        arama.all.slice(0, limit).map((video) => {
            mesaj += ` *🖲️ ${video.title}*\n🔗 ${video.url}\n\n`; 
        });

        await conn.sendMessage(from, { text: mesaj }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply('*Error !!*');
    }
});
