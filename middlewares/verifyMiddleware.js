
const commands = [];
const middlewares = [];

function malvin(config, handler) {
    if (typeof config === 'function') {
        // Middleware registration
        middlewares.push(config);
    } else {
        // Command registration
        commands.push({ ...config, handler });
    }
}

malvin.use = (middleware) => {
    middlewares.push(middleware);
};

malvin.handleMessage = async (conn, mek, m) => {
    for (const command of commands) {
        if (new RegExp(`^${command.pattern}`).test(m.text)) {
            let idx = 0;

            // Middleware executor
            const next = async () => {
                if (idx < middlewares.length) {
                    const mw = middlewares[idx++];
                    await mw(conn, mek, m, next);
                } else {
                    await command.handler(conn, mek, m, {
                        reply: (text) => conn.sendMessage(m.chat, { text }),
                        args: m.text.trim().split(' ').slice(1),
                    });
                }
            };

            await next();
            break;
        }
    }
};

module.exports = { malvin };
