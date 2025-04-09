// malvin.js (integrating both parts)

var commands = [];
var middlewares = [];

function malvin(info, func) {
    var data = info;
    data.function = func;
    if (!data.dontAddCommandList) data.dontAddCommandList = false;
    if (!info.desc) info.desc = '';
    if (!data.fromMe) data.fromMe = false;
    if (!info.category) info.category = 'misc';
    if (!info.filename) info.filename = "Not Provided";
    commands.push(data);
    return data;
}

// Add middleware support
malvin.use = function (middlewareFn) {
    middlewares.push(middlewareFn);
};

// Command handler function
malvin.handleMessage = async (conn, mek, m) => {
    const text = m.text || '';

    for (const command of commands) {
        const pattern = new RegExp(`^\\.?${command.pattern}`, 'i');
        if (pattern.test(text)) {
            let index = 0;

            const next = async () => {
                if (index < middlewares.length) {
                    const mw = middlewares[index++];
                    await mw(conn, mek, m, next);
                } else {
                    const reply = (txt) => conn.sendMessage(m.chat, { text: txt }, { quoted: mek });
                    const args = text.trim().split(' ').slice(1);

                    await command.function(conn, mek, m, { reply, args });
                }
            };

            await next();
            break;
        }
    }
};

module.exports = {
    malvin,
    AddCommand: malvin,
    Function: malvin,
    Module: malvin,
    commands,
    middlewares,
};
