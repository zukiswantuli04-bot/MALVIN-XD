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

malvin.commands = commands;
malvin.middlewares = middlewares;

module.exports = {
    malvin,
    AddCommand: malvin,
    Function: malvin,
    Module: malvin,
    commands,
    middlewares,
};
