// malvin.js
const commands = [];
const middlewares = [];

function malvin(config, handler) {
    if (typeof config === 'function') {
        // Register middleware
        middlewares.push(config);
    } else {
        // Register command
        commands.push({ ...config, handler });
    }
}

malvin.use = (middleware) => {
    middlewares.push(middleware);
};

// Dispatcher that runs middlewares before commands
malvin.handleMessage = async (conn, mek, m) => {
    const text = m.text || '';

    for (const command of commands) {
        const pattern = new RegExp(`^\\.?${command.pattern}`, 'i'); // allow dot prefix
        if (pattern.test(text)) {
            let index = 0;

            const next = async () => {
                if (index < middlewares.length) {
                    const mw = middlewares[index++];
                    await mw(conn, mek, m, next);
                } else {
                    const reply = (txt) => conn.sendMessage(m.chat, { text: txt }, { quoted: mek });
                    const args = text.trim().split(' ').slice(1);

                    await command.handler(conn, mek, m, { reply, args });
                }
            };

            await next();
            break;
        }
    }
};

module.exports = { malvin };
