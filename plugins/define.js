const axios = require('axios');
const { malvin } = require('../malvin');

malvin({
    pattern: "define",
    desc: "📖 Get the definition of a word",
    react: "🔍",
    category: "search",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("📌 *Usage:* .define [word]\n\nExample: `.define knowledge`");

        const word = q.trim();
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

        const response = await axios.get(url);
        const definitionData = response.data[0];

        // Fetch phonetics (if available)
        const phonetics = definitionData.phonetics?.map(p => p.text).filter(Boolean).join(', ') || '🔇 No phonetics available';
        const audio = definitionData.phonetics?.find(p => p.audio)?.audio || null;

        // Extract multiple definitions
        const meanings = definitionData.meanings.map(meaning => {
            const partOfSpeech = meaning.partOfSpeech || 'unknown';
            const definitions = meaning.definitions.map((def, i) => `  *${i + 1}.* ${def.definition}`).join('\n');
            return `📌 *${partOfSpeech}*\n${definitions}`;
        }).join('\n\n');

        // Extract synonyms
        const synonyms = definitionData.meanings.flatMap(meaning => meaning.definitions.flatMap(def => def.synonyms || []));
        const synonymText = synonyms.length > 0 ? synonyms.slice(0, 5).join(', ') : '❌ No synonyms available';

        const wordInfo = `
📖 *Word*: *${definitionData.word}*  
🗣️ *Pronunciation*: _${phonetics}_  
📚 *Definitions*:  
${meanings}  

📝 *Synonyms*: ${synonymText}  

> 🔗 *Powered by Malvin King*`;

        // Send pronunciation audio if available
        if (audio) {
            await conn.sendMessage(from, { audio: { url: audio }, mimetype: 'audio/mpeg' }, { quoted: mek });
        }

        return reply(wordInfo);
    } catch (e) {
        console.error("❌ Error:", e);
        if (e.response?.status === 404) {
            return reply("🚫 *Word not found.* Please check the spelling and try again.");
        }
        return reply("⚠️ An error occurred while fetching the definition. Please try again later.");
    }
});
