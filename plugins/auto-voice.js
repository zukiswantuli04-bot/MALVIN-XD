const fs = require('fs');
const path = require('path');
const config = require('../settings');
const { malvin } = require('../malvin');

malvin({
  on: "body"
},
async (conn, mek, m, { from, body }) => {
    const filePath = path.join(__dirname, '../autos/autovoice.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    for (const text in data) {
        if (body.toLowerCase() === text.toLowerCase()) {
            if (config.AUTO_VOICE === 'true') {
                const voicePath = path.join(__dirname, '../autos/autovoice', data[text]);

                if (fs.existsSync(voicePath)) {
                    const voiceBuffer = fs.readFileSync(voicePath);

                    await conn.sendPresenceUpdate('recording', from);
                    await conn.sendMessage(from, {
                        audio: voiceBuffer,
                        mimetype: 'audio/mp4',
                        ptt: true
                    }, { quoted: mek });
                } else {
                    console.warn(`Voice file not found: ${voicePath}`);
                }
            }
        }
    }
});