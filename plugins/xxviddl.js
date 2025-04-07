const { fetchJson } = require('../lib/functions');
const cheerio = require('cheerio');
const axios = require('axios');
const { malvin, commands } = require('../malvin');

// Function to handle Xnxx video download
async function downloadXnxxVideo(url) {
  try {
    if (!url) throw new Error('URL is required');
    
    const videoData = await fetchJson(`https://www.xnxx.com/api/video?url=${url}`);
    if (!videoData || !videoData.result) throw new Error('Failed to fetch video data');
    
    const { title, files } = videoData.result;
    return { title, videoUrl: files.high };
  } catch (error) {
    throw new Error(`Error downloading Xnxx video: ${error.message}`);
  }
}

// Function to handle Xvideos video download
async function downloadXvideosVideo(url) {
  try {
    if (!url) throw new Error('URL is required');
    
    const response = await fetchJson(`https://www.dark-yasiya-api.site/download/xvideo?url=${url}`);
    const videoData = response.result;
    if (!videoData || !videoData.dl_link) throw new Error('Failed to fetch video data');
    
    const { title, views, like, dislike, size, dl_link } = videoData;
    const caption = `
      🎥 *XVIDEOS DOWNLOAD*
      
      • *Title*: ${title}
      • *Views*: ${views}
      • *Likes*: ${like}
      • *Dislikes*: ${dislike}
      • *Size*: ${size}
    `;
    
    return { caption, videoUrl: dl_link };
  } catch (error) {
    throw new Error(`Error downloading Xvideos video: ${error.message}`);
  }
}

// Function to handle movie search on Baiscope
async function searchBaiscopeMovies(query) {
  try {
    if (!query) throw new Error('Search query is required');
    
    const searchUrl = `https://www.baiscope.lk/?s=${encodeURIComponent(query)}`;
    const { data } = await axios.get(searchUrl);
    const $ = cheerio.load(data);
    
    const results = [];
    $('article.elementor-post').each((_, element) => {
      const title = $(element).find('h5.elementor-post__title > a').text().trim();
      const link = $(element).find('h5.elementor-post__title > a').attr('href');
      const imageUrl = $(element).find('.elementor-post__thumbnail img').attr('src');
      
      if (title && link && imageUrl) {
        results.push({ title, episodeLink: link, imgUrl: imageUrl });
      }
    });
    
    if (results.length === 0) throw new Error('No results found');
    
    let message = `🎥 *Search Results for ${query}:*\n\n`;
    results.forEach((result, index) => {
      message += `${index + 1}. *${result.title}*\n🔗 Link: ${result.episodeLink}\n\n`;
    });
    
    return message;
  } catch (error) {
    throw new Error(`Error searching for movies: ${error.message}`);
  }
}

// Command for downloading Xnxx video
malvin(
  {
    pattern: 'xnxxdown',
    alias: ['dlxnxx', 'xnxxdl'],
    react: '🎥',
    desc: 'Download Xnxx videos',
    category: 'nsfw',
    use: '.xnxx <xnxx link>',
    filename: __filename,
  },
  async (messageHandler, msg, _quotedMsg, { from, body }) => {
    try {
      const url = body.trim();
      if (!url) return messageHandler.reply('*Please provide a valid URL!*');
      
      const { title, videoUrl } = await downloadXnxxVideo(url);
      await messageHandler.sendMessage(from, { video: { url: videoUrl }, caption: title }, { quoted: msg });
    } catch (error) {
      messageHandler.reply(`*Error: ${error.message}*`);
    }
  }
);

// Command for downloading Xvideos video
malvin(
  {
    pattern: 'xvdown',
    alias: ['dlxv', 'xvdl'],
    react: '🎥',
    desc: 'Download Xvideos videos',
    category: 'nsfw',
    use: '.xv <xvideos link>',
    filename: __filename,
  },
  async (messageHandler, msg, _quotedMsg, { from, body }) => {
    try {
      const url = body.trim();
      if (!url) return messageHandler.reply('*Please provide a valid URL!*');
      
      const { caption, videoUrl } = await downloadXvideosVideo(url);
      await messageHandler.sendMessage(from, { video: { url: videoUrl }, caption }, { quoted: msg });
    } catch (error) {
      messageHandler.reply(`*Error: ${error.message}*`);
    }
  }
);

// Command for searching movies on Baiscope
malvin(
  {
    pattern: 'baiscope',
    alias: ['movie2'],
    react: '📀',
    category: 'movie',
    desc: 'Search for movies on Baiscope.lk',
    filename: __filename,
  },
  async (messageHandler, msg, _quotedMsg, { from, q }) => {
    try {
      const query = q.trim();
      if (!query) return messageHandler.reply('*Please provide a search query! (e.g., Avatar)*');
      
      const searchResults = await searchBaiscopeMovies(query);
      await messageHandler.sendMessage(from, { text: searchResults }, { quoted: msg });
    } catch (error) {
      messageHandler.reply(`*Error: ${error.message}*`);
    }
  }
);
