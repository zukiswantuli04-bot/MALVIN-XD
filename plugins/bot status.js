








const fs = require('fs');
const path = require('path');
const { CURRENT_STATUS, ALWAYS_ONLINE, FAKE_TYPING } = require('../settings'); 
const { malvin, commands } = require('../malvin');

// Commande body
malvin({
    pattern: 'body',
    react: '📝',
    desc: 'Sends typing status.',
    category: 'tools',
    filename: __filename
}, async (_conn, _mek, _m, { body, reply }) => {
    if (CURRENT_STATUS === true) {
        _conn.sendPresenceUpdate('composing', _mek.key.remoteJid);
    } else {
        _conn.sendPresenceUpdate('available', _mek.key.remoteJid);
    }
});

// Commande available
malvin({
    pattern: 'available',
    react: '🟢',
    desc: 'Sets bot status as available or unavailable.',
    category: 'tools',
    filename: __filename
}, async (_conn, _mek, _m, { isOwner, reply }) => {
    if (ALWAYS_ONLINE === true) {
        _conn.sendPresenceUpdate('available', _mek.key.remoteJid);
    } else {
        _conn.sendPresenceUpdate('unavailable', _mek.key.remoteJid);
    }
});

// Commande composing (fake typing)
malvin({
    pattern: 'composing',
    react: '✍️',
    desc: 'Simulates typing.',
    category: 'tools',
    filename: __filename
}, async (_conn, _mek, _m, { body, reply }) => {
    if (FAKE_TYPING === true) {
        _conn.sendPresenceUpdate('composing', _mek.key.remoteJid);
    }
});

// Commande pour afficher l'état du bot
malvin({
    pattern: 'status',
    react: '⚙️',
    desc: 'Display the current status of the bot.',
    category: 'tools',
    filename: __filename
}, async (_conn, _mek, _m, { reply }) => {
    let statusMessage = `Bot status:\n`;
    statusMessage += `Current status: ${CURRENT_STATUS ? 'Active' : 'Inactive'}\n`;
    statusMessage += `Always online: ${ALWAYS_ONLINE ? 'Yes' : 'No'}\n`;
    statusMessage += `Fake typing: ${FAKE_TYPING ? 'Enabled' : 'Disabled'}`;
    reply(statusMessage);
});