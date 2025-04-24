const fs = require('fs');
const path = require('path');
const { CURRENT_STATUS, ALWAYS_ONLINE, FAKE_TYPING } = require('../settings'); 
const { malvin } = require('../malvin');

// Simulate typing presence (body command)
malvin({
    pattern: 'body',
    react: '📝',
    desc: 'Simulate typing status (composing).',
    category: 'tools',
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    if (CURRENT_STATUS === true) {
        await conn.sendPresenceUpdate('composing', mek.key.remoteJid);
        reply("✍️ Bot is now simulating typing...");
    } else {
        await conn.sendPresenceUpdate('available', mek.key.remoteJid);
        reply("✅ Bot is now showing as available.");
    }
});

// Set availability presence (available command)
malvin({
    pattern: 'available',
    react: '🟢',
    desc: 'Set bot availability status.',
    category: 'tools',
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    if (ALWAYS_ONLINE === true) {
        await conn.sendPresenceUpdate('available', mek.key.remoteJid);
        reply("🟢 Bot status set to *available* (always online).");
    } else {
        await conn.sendPresenceUpdate('unavailable', mek.key.remoteJid);
        reply("🔴 Bot status set to *unavailable* (offline).");
    }
});

// Simulate typing manually (composing command)
malvin({
    pattern: 'composing',
    react: '✍️',
    desc: 'Manually trigger fake typing status.',
    category: 'tools',
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    if (FAKE_TYPING === true) {
        await conn.sendPresenceUpdate('composing', mek.key.remoteJid);
        reply("✍️ Fake typing triggered manually.");
    } else {
        reply("❌ Fake typing is disabled in settings.");
    }
});

// Show bot status (status command)
malvin({
    pattern: 'status',
    react: '⚙️',
    desc: 'Display the current bot status settings.',
    category: 'tools',
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    const statusMessage = `
*🤖 Bot Status Settings:*

• Current Status: ${CURRENT_STATUS ? '✅ Active' : '❌ Inactive'}
• Always Online: ${ALWAYS_ONLINE ? '🟢 Enabled' : '🔴 Disabled'}
• Fake Typing: ${FAKE_TYPING ? '✍️ Enabled' : '🚫 Disabled'}
`.trim();
    reply(statusMessage);
});
