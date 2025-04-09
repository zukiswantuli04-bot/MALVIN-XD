//---------------------------------------------------------------------------
//           MALVIN-XD  
//---------------------------------------------------------------------------
//  ⚠️ DO NOT MODIFY THIS FILE ⚠️  
//---------------------------------------------------------------------------
const { malvin, commands } = require('../malvin');
const config = require('../settings');
const prefix = config.PREFIX;
const fs = require('fs');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, sleep, fetchJson } = require('../lib/functions2');
const { writeFileSync } = require('fs');
const path = require('path');

let antilinkAction = "off"; // Default state
let warnCount = {}; // Track warnings per user

//--------------------------------------------
//  SET PREFIX COMMANDS
//--------------------------------------------
malvin({
    pattern: "prefix",
    alias: ["prefix"],
    react: "🔧",
    desc: "Change the bot's command prefix.",
    category: "settings",
    filename: __filename,
}, async (conn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 Only the owner can use this command!*");

    const newPrefix = args[0]; // Get the new prefix from the command arguments
    if (!newPrefix) return reply("❌ Please provide a new prefix. Example: `.prefix !`");

    // Update the prefix in memory
    config.PREFIX = newPrefix;

    return reply(`✅ Prefix successfully changed to *${newPrefix}*`);
});
//--------------------------------------------
//  CHATBOT COMMANDS
//--------------------------------------------

malvin({
    pattern: "chatbot",
    description: "Enable or disable auto-typing feature.",
    category: "admin",
    filename: __filename
},    
async (conn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    if (!["on", "off"].includes(status)) {
        return reply("*🫟 ᴇxᴀᴍᴘʟᴇ:  .chatbot ᴏɴ*");
    }

    config.CHAT_BOT = status === "on" ? "true" : "false";
    return reply(`Chatbot has been turned ${status}.`);
});
//--------------------------------------------
//  BOT MODE COMMANDS
//--------------------------------------------

malvin({
    pattern: "mode",
    desc: "Set bot mode to private or public.",
    category: "settings",
    filename: __filename,
}, async (conn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 Only the owner can use this command!*");

    // Si aucun argument n'est fourni, afficher le mode actuel et l'usage
    if (!args[0]) {
        return reply(`📌 Current mode: *${config.MODE}*\n\nUsage: .mode private OR .mode public`);
    }

    const modeArg = args[0].toLowerCase();

    if (modeArg === "private") {
        config.MODE = "private";
        return reply("✅ Bot mode is now set to *PRIVATE*.");
    } else if (modeArg === "public") {
        config.MODE = "public";
        return reply("✅ Bot mode is now set to *PUBLIC*.");
    } else {
        return reply("❌ Invalid mode. Please use `.mode private` or `.mode public`.");
    }
});

//--------------------------------------------
//  AUTO TYPING COMMANDS
//--------------------------------------------

malvin({
    pattern: "autotyping",
    description: "Enable or disable auto-typing feature.",
    category: "settings",
    filename: __filename
},    
async (conn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    if (!["on", "off"].includes(status)) {
        return reply("*🫟 ᴇxᴀᴍᴘʟᴇ:  .ᴀᴜᴛᴏᴛʏᴘɪɴɢ ᴏɴ*");
    }

    config.AUTO_TYPING = status === "on" ? "true" : "false";
    return reply(`Auto typing has been turned ${status}.`);
});
//--------------------------------------------
// ALWAYS_ONLINE COMMANDS
//--------------------------------------------
malvin({
    pattern: "alwaysonline",
    alias: ["alwaysonline"],
    description: "Set bot status to always online or offline.",
    category: "settings",
    filename: __filename
},    
async (conn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    if (!["on", "off"].includes(status)) {
        return reply("*🫟 ᴇxᴀᴍᴘʟᴇ:  .ᴀʟᴡᴀʏsᴏɴʟɪɴᴇ ᴏɴ*");
    }

    config.ALWAYS_ONLINE = status === "on" ? "true" : "false";
    await conn.sendPresenceUpdate(status === "on" ? "available" : "unavailable", from);
    return reply(`Bot is now ${status === "on" ? "online" : "offline"}.`);
});
//--------------------------------------------
//  AUTO_RECORDING COMMANDS
//--------------------------------------------
malvin({
    pattern: "autorecording",
    alias: ["autorecoding"],
    description: "Enable or disable auto-recording feature.",
    category: "settings",
    filename: __filename
},    
async (conn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    if (!["on", "off"].includes(status)) {
        return reply("*🫟 ᴇxᴀᴍᴘʟᴇ: .ᴀᴜᴛᴏʀᴇᴄᴏʀᴅɪɴɢ ᴏɴ*");
    }

    config.AUTO_RECORDING = status === "on" ? "true" : "false";
    if (status === "on") {
        await conn.sendPresenceUpdate("recording", from);
        return reply("Auto recording is now enabled. Bot is recording...");
    } else {
        await conn.sendPresenceUpdate("available", from);
        return reply("Auto recording has been disabled.");
    }
});


//--------------------------------------------
//  FAKE TYPING COMMANDS
//--------------------------------------------

malvin({
    pattern: "faketyping",
    alias: ["faketyping"],
    desc: "Enable or disable fake typing of status",
    category: "settings",
    filename: __filename
},    
async (conn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    // Default value for FAKE_TYPING is "false"
    if (args[0] === "on") {
        config.FAKE_TYPING = "true";
        return reply("Fake Typing is now enabled.");
    } else if (args[0] === "off") {
        config.FAKE_TYPING = "false";
        return reply("fake typing is now disabled.");
    } else {
        return reply(`Example: .faketyping on`);
    }
});

//--------------------------------------------
//  FAKE RECORDING COMMANDS
//--------------------------------------------

malvin({
    pattern: "fakerecording",
    alias: ["fakerecording"],
    desc: "Enable or disable fake recording of statuses",
    category: "settings",
    filename: __filename
},    
async (conn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    // Default value for FAKE_RECORDING is "false"
    if (args[0] === "on") {
        config.FAKE_RECORDING = "true";
        return reply("fake recording of status is now enabled.");
    } else if (args[0] === "off") {
        config.FAKE_RECORDING = "false";
        return reply("fake recording of status is now disabled.");
    } else {
        return reply(`Example: .fakerecording on`);
    }
});

//--------------------------------------------
// AUTO_VIEW_STATUS COMMANDS
//--------------------------------------------
malvin({
    pattern: "autoseen",
    alias: ["autostatusview"],
    desc: "Enable or disable auto-viewing of statuses",
    category: "settings",
    filename: __filename
},    
async (conn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    // Default value for AUTO_VIEW_STATUS is "false"
    if (args[0] === "on") {
        config.AUTO_STATUS_SEEN = "true";
        return reply("Auto-viewing of statuses is now enabled.");
    } else if (args[0] === "off") {
        config.AUTO_STATUS_SEEN = "false";
        return reply("Auto-viewing of statuses is now disabled.");
    } else {
        return reply(`*🫟 ᴇxᴀᴍᴘʟᴇ:  .ᴀᴜᴛᴏsᴇᴇɴ ᴏɴ*`);
    }
}); 
//--------------------------------------------
// AUTO_LIKE_STATUS COMMANDS
//--------------------------------------------
malvin({
    pattern: "statusreact",
    alias: ["statusreaction"],
    desc: "Enable or disable auto-liking of statuses",
    category: "settings",
    filename: __filename
},    
async (conn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    // Default value for AUTO_LIKE_STATUS is "false"
    if (args[0] === "on") {
        config.AUTO_STATUS_REACT = "true";
        return reply("Auto-liking of statuses is now enabled.");
    } else if (args[0] === "off") {
        config.AUTO_STATUS_REACT = "false";
        return reply("Auto-liking of statuses is now disabled.");
    } else {
        return reply(`Example: . statusreact on`);
    }
});


//--------------------------------------------
//  ANTICALL COMMANDS
//--------------------------------------------

malvin({
    pattern: "anticall",
    alias: ["statusreaction"],
    desc: "Enable or disable anti-call of statuses",
    category: "settings",
    filename: __filename
},    
async (conn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    // Default value for AUTO_LIKE_STATUS is "false"
    if (args[0] === "on") {
        config.ANTICALL = "true";
        return reply("anti-call of statuses is now enabled.");
    } else if (args[0] === "off") {
        config.ANTICALL = "false";
        return reply("anti-call of statuses is now disabled.");
    } else {
        return reply(`Example: .anticall on`);
    }
});
//--------------------------------------------
//  READ-MESSAGE COMMANDS
//--------------------------------------------
malvin({
    pattern: "readmessage",
    alias: ["autoread"],
    desc: "enable or disable readmessage.",
    category: "settings",
    filename: __filename
},    
async (conn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    // Check the argument for enabling or disabling the anticall feature
    if (args[0] === "on") {
        config.READ_MESSAGE = "true";
        return reply("readmessage feature is now enabled.");
    } else if (args[0] === "off") {
        config.READ_MESSAGE = "false";
        return reply("readmessage feature is now disabled.");
    } else {
        return reply(`_example:  .readmessage on_`);
    }
});

// ALWAYS_ONLINE

malvin({
    pattern: "alwaysonline",
    alias: ["alwaysonline"],
    desc: "enable or disable always online.",
    category: "settings",
    filename: __filename
},    
async (conn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    // Check the argument for enabling or disabling the always online feature
    if (args[0] === "on") {
        config.ALWAYS_ONLINE = "true";
        return reply("always online feature is now enabled.");
    } else if (args[0] === "off") {
        config.ALWAYS_ONLINE = "false";
        return reply("always online feature is now disabled.");
    } else {
        return reply(`_example:  .alwaysonline on_`);
    }
});


//--------------------------------------------
//  ANTI-BAD COMMANDS
//--------------------------------------------
malvin({
    pattern: "antibad",
    alias: ["antibadword"],
    desc: "enable or disable antibad.",
    category: "settings",
    filename: __filename
},    
async (conn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    // Check the argument for enabling or disabling the anticall feature
    if (args[0] === "on") {
        config.ANTI_BAD_WORD = "true";
        return reply("*anti bad word is now enabled.*");
    } else if (args[0] === "off") {
        config.ANTI_BAD_WORD = "false";
        return reply("*anti bad word feature is now disabled*");
    } else {
        return reply(`_example:  .antibad on_`);
    }
});
//--------------------------------------------
//  AUTO-STICKER COMMANDS
//--------------------------------------------
malvin({
    pattern: "autosticker",
    alias: ["autosticker"],
    desc: "enable or disable auto-sticker.",
    category: "settings",
    filename: __filename
},    
async (conn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    // Check the argument for enabling or disabling the anticall feature
    if (args[0] === "on") {
        config.AUTO_STICKER = "true";
        return reply("auto-sticker feature is now enabled.");
    } else if (args[0] === "off") {
        config.AUTO_STICKER = "false";
        return reply("auto-sticker feature is now disabled.");
    } else {
        return reply(`_example:  .autosticker on_`);
    }
});
//--------------------------------------------
//  AUTO-REPLY COMMANDS
//--------------------------------------------
malvin({
    pattern: "autoreply",
    alias: ["autoreply"],
    desc: "enable or disable auto-reply.",
    category: "settings",
    filename: __filename
},    
async (conn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    // Check the argument for enabling or disabling the anticall feature
    if (args[0] === "on") {
        config.AUTO_REPLY = "true";
        return reply("*auto-reply  is now enabled.*");
    } else if (args[0] === "off") {
        config.AUTO_REPLY = "false";
        return reply("auto-reply feature is now disabled.");
    } else {
        return reply(`*🫟 ᴇxᴀᴍᴘʟᴇ: . ᴀᴜᴛᴏʀᴇᴘʟʏ ᴏɴ*`);
    }
});

//--------------------------------------------
//   AUTO-REACT COMMANDS
//--------------------------------------------
malvin({
    pattern: "autoreact",
    alias: ["autoreact"],
    desc: "Enable or disable the autoreact feature",
    category: "settings",
    filename: __filename
},    
async (conn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    // Check the argument for enabling or disabling the anticall feature
    if (args[0] === "on") {
        config.AUTO_REACT = "true";
        await reply("*autoreact feature is now enabled.*");
    } else if (args[0] === "off") {
        config.AUTO_REACT = "false";
        await reply("autoreact feature is now disabled.");
    } else {
        await reply(`*🫟 ᴇxᴀᴍᴘʟᴇ: .ᴀᴜᴛᴏʀᴇᴀᴄᴛ ᴏɴ*`);
    }
});
//--------------------------------------------
//  STATUS-REPLY COMMANDS
//--------------------------------------------
malvin({
    pattern: "statusreply",
    alias: ["autostatusreply"],
    desc: "enable or disable status-reply.",
    category: "settings",
    filename: __filename
},    
async (conn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    // Check the argument for enabling or disabling the anticall feature
    if (args[0] === "on") {
        config.AUTO_STATUS_REPLY = "true";
        return reply("status-reply feature is now enabled.");
    } else if (args[0] === "off") {
        config.AUTO_STATUS_REPLY = "false";
        return reply("status-reply feature is now disabled.");
    } else {
        return reply(`*🫟 ᴇxᴀᴍᴘʟᴇ:  .sᴛᴀᴛᴜsʀᴇᴘʟʏ ᴏɴ*`);
    }
});

//--------------------------------------------
//  AUTO VOICE COMMAND
//--------------------------------------------

malvin({
    pattern: "autovoice",
    alias: ["autovoice"],
    desc: "Enable or disable autovoice",
    category: "settings",
    filename: __filename
},    
async (conn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    // Default value for AUTO_VOICE is "false"
    if (args[0] === "on") {
        config.AUTO_VOICE = "true";
        return reply("auto voice feature is now enabled.");
    } else if (args[0] === "off") {
        config.AUTO_VOICE = "false";
        return reply("auto voice feature is now disabled.");
    } else {
        return reply(`Example: .autovoice on`);
    }
});


//--------------------------------------------
//  ANTILINK1 COMMANDS
//--------------------------------------------
malvin({
    pattern: "antilink",
    desc: "Enable Antilink (warn/delete/kick) or turn off",
    category: "group",
    filename: __filename
}, async (conn, mek, m, { q, reply }) => {
    if (!q) {
        return reply(`*Current Antilink Action:* ${antilinkAction.toUpperCase()}\n\nUse *antilink warn/delete/kick/off* to change it.`);
    }

    const action = q.toLowerCase();
    if (["warn", "delete", "kick", "off"].includes(action)) {
        antilinkAction = action;
        return reply(`*Antilink action set to:* ${action.toUpperCase()}`);
    } else {
        return reply("❌ *Invalid option!* Use *antilink warn/delete/kick/off*.");
    }
});
malvin({
    on: "body"
}, async (conn, mek, m, { from, body, isGroup, sender, isBotAdmins, isAdmins, reply }) => {
    if (!isGroup || antilinkAction === "off") return;
    
    if (isUrl(body)) { // Using isUrl to detect links
        if (!isBotAdmins || isAdmins) return;

        return reply(`⚠️ *Warning! Links are not allowed here.*`);
        await conn.sendMessage(from, { delete: mek.key });

        switch (antilinkAction) {
            case "warn":
                warnCount[sender] = (warnCount[sender] || 0) + 1;
                if (warnCount[sender] >= 3) {
                    delete warnCount[sender];
                    await conn.groupParticipantsUpdate(from, [sender], "remove");
                }
                break;

            case "kick":
                await conn.groupParticipantsUpdate(from, [sender], "remove");
                break;
        }
    }
});


let antibotAction = "off"; // Default action is off
let warnings = {}; // Store warning counts per user

malvin({
    pattern: "antibot",
    alias: ["antibot"],
    desc: "Enable Antibot and set action (off/warn/delete/kick)",
    category: "group",
    filename: __filename
}, async (conn, mek, m, { q, reply }) => {
    if (!q) {
        return reply(`*Current Antibot Action:* ${antibotAction.toUpperCase()}\n\nUse *antibot off/warn/delete/kick* to change it.`);
    }

    const action = q.toLowerCase();
    if (["off", "warn", "delete", "kick"].includes(action)) {
        antibotAction = action;
        return reply(`*Antibot action set to:* ${action.toUpperCase()}`);
    } else {
        return reply("*🫟 ᴇxᴀᴍᴘʟᴇ: . ᴀɴᴛɪʙᴏᴛ ᴏғғ/ᴡᴀʀɴ/ᴅᴇʟᴇᴛᴇ/ᴋɪᴄᴋ*");
    }
});

malvin({
    on: "body"
}, async (conn, mek, m, { from, isGroup, sender, isBotAdmins, isAdmins, reply }) => {
    if (!isGroup || antibotAction === "off") return; // Check if antibot is enabled

    const messageId = mek.key.id;
    if (!messageId || !messageId.startsWith("3EB")) return; // Detect bot-generated messages

    if (!isBotAdmins) return reply("*_I'm not an admin, so I can't take action!_*");
    if (isAdmins) return; // Ignore admins

    await conn.sendMessage(from, { delete: mek.key }); // Delete the detected bot message

    switch (antibotAction) {
        case "kick":
            await conn.groupParticipantsUpdate(from, [sender], "remove");
            break;

        case "warn":
            warnings[sender] = (warnings[sender] || 0) + 1;
            if (warnings[sender] >= 3) {
                delete warnings[sender]; // Reset warning count after kicking
                await conn.groupParticipantsUpdate(from, [sender], "remove");
            } else {
                return reply(`⚠️ @${sender.split("@")[0]}, warning ${warnings[sender]}/3! Bots are not allowed!`, { mentions: [sender] });
            }
            break;
    }
});

//--------------------------------------------
// ACCEPT_ALL COMMANDS
//--------------------------------------------
malvin({
  pattern: "acceptall",
  alias: ["approve"],
  category: "group",
  desc: "Accept all participant requests in the group.",
  filename: __filename,
}, async (conn, mek, m, { from, isGroup, body, sender, groupMetadata, participants, config, reply }) => {
  try {
    if (!isGroup) {
      return reply("This command can only be used in groups.");
    }

    const jid = from; // Group ID (from the message)
    const groupParticipants = groupMetadata.participants; // List of participants in the group

    const pendingRequests = groupParticipants.filter(p => p.isPending); // Filter pending participants

    if (pendingRequests.length === 0) {
      return reply("No pending participants to accept.");
    }

    const userJids = pendingRequests.map(p => p.id); // Get JIDs of the pending participants

    const response = await conn.groupRequestParticipantsUpdate(jid, userJids, 'approve');
    console.log(response);
    reply(`${userJids.length} participant(s) have been accepted.`);
  } catch (e) {
    return reply(`*An error occurred while processing your request.*\n\n_Error:_ ${e.message}`);
  }
});
//--------------------------------------------
// REJECT_ALL COMMANDS
//--------------------------------------------
malvin({
  pattern: "rejectall",
  alias: ["rejects"],
  category: "group",
  desc: "Reject all participant requests in the group.",
  filename: __filename,
}, async (conn, mek, m, { from, isGroup, body, sender, groupMetadata, participants, config, reply }) => {
  try {
    if (!isGroup) {
      return reply("This command can only be used in groups.");
    }

    const jid = from; // Group ID (from the message)
    const groupParticipants = groupMetadata.participants; // List of participants in the group

    const pendingRequests = groupParticipants.filter(p => p.isPending); // Filter pending participants

    if (pendingRequests.length === 0) {
      return reply("No pending participants to reject.");
    }

    const userJids = pendingRequests.map(p => p.id); // Get JIDs of the pending participants

    const response = await conn.groupRequestParticipantsUpdate(jid, userJids, 'reject');
    console.log(response);
    reply(`${userJids.length} participant(s) have been rejected.`);
  } catch (e) {
    return reply(`*An error occurred while processing your request.*\n\n_Error:_ ${e.message}`);
  }
});
//--------------------------------------------
//  ANTILINK COMMANDS
//--------------------------------------------
malvin({
  pattern: "antilink1",
  alias: ["antilink1"],
  desc: "Enable or disable anti-link feature in groups",
  category: "group",
  react: "🚫",
  filename: __filename
}, async (conn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  try {
    // Check for group, bot admin, and user admin permissions
    if (!isGroup) return reply('This command can only be used in a group.');
    if (!isBotAdmins) return reply('Bot must be an admin to use this command.');
    if (!isAdmins) return reply('You must be an admin to use this command.');

    // Enable or disable anti-link feature
    if (args[0] === "on") {
      config.ANTI_LINK = "true";
      await reply("Anti-link feature is now enabled in this group.");
    } else if (args[0] === "off") {
      config.ANTI_LINK = "false";
      await reply("Anti-link feature is now disabled in this group.");
    } else {
      await reply(`*Invalid input! Use either 'on' or 'off'. Example:antilink on*`);
    }
  } catch (error) {
    return reply(`*An error occurred while processing your request.*\n\n_Error:_ ${error.message}`);
  }
});
//--------------------------------------------
//   POLL COMMANDS
//--------------------------------------------
malvin({
  pattern: "poll",
  category: "group",
  desc: "Create a poll with a question and options in the group.",
  filename: __filename,
}, async (conn, mek, m, { from, isGroup, body, sender, groupMetadata, participants, prefix, pushname, reply }) => {
  try {
    let [question, optionsString] = body.split(";");
    
    if (!question || !optionsString) {
      return reply(`Usage: ${prefix}poll question;option1,option2,option3...`);
    }

    let options = [];
    for (let option of optionsString.split(",")) {
      if (option && option.trim() !== "") {
        options.push(option.trim());
      }
    }

    if (options.length < 2) {
      return reply("*Please provide at least two options for the poll.*");
    }

    await conn.sendMessage(from, {
      poll: {
        name: question,
        values: options,
        selectableCount: 1,
        toAnnouncementGroup: true,
      }
    }, { quoted: mek });
  } catch (e) {
    return reply(`*An error occurred while processing your request.*\n\n_Error:_ ${e.message}`);
  }
});

//  NEW_GC COMMANDS
//--------------------------------------------
malvin({
  pattern: "newgc",
  category: "group",
  desc: "Create a new group and add participants.",
  filename: __filename,
}, async (conn, mek, m, { from, isGroup, body, sender, groupMetadata, participants, reply }) => {
  try {
    if (!body) {
      return reply(`Usage: !newgc group_name;number1,number2,...`);
    }

    const [groupName, numbersString] = body.split(";");
    
    if (!groupName || !numbersString) {
      return reply(`Usage: !newgc group_name;number1,number2,...`);
    }

    const participantNumbers = numbersString.split(",").map(number => `${number.trim()}@s.whatsapp.net`);

    const group = await conn.groupCreate(groupName, participantNumbers);
    console.log('created group with id: ' + group.id); // Use group.id here

    const inviteLink = await conn.groupInviteCode(group.id); // Use group.id to get the invite link

    await conn.sendMessage(group.id, { text: 'hello there' });

    reply(`Group created successfully with invite link: https://chat.whatsapp.com/${inviteLink}\nWelcome message sent.`);
  } catch (e) {
    return reply(`*An error occurred while processing your request.*\n\n_Error:_ ${e.message}`);
  }
});

//--------------------------------------------
//  AUTO_RECORDING COMMANDS
//--------------------------------------------
malvin({
    pattern: "invite",
    alias: ["glink"],
    desc: "Get group invite link.",
    category: "group", // Already group
    filename: __filename,
}, async (conn, mek, m, { from, quoted, body, args, q, isGroup, sender, reply }) => {
    try {
        // Ensure this is being used in a group
        if (!isGroup) return reply("𝐓𝐡𝐢𝐬 𝐅𝐞𝐚𝐭𝐮𝐫𝐞 𝐈𝐬 𝐎𝐧𝐥𝐲 𝐅𝐨𝐫 𝐆𝐫𝐨𝐮𝐩❗");

        // Get the sender's number
        const senderNumber = sender.split('@')[0];
        const botNumber = conn.user.id.split(':')[0];
        
        // Check if the bot is an admin
        const groupMetadata = isGroup ? await conn.groupMetadata(from) : '';
        const groupAdmins = groupMetadata ? groupMetadata.participants.filter(member => member.admin) : [];
        const isBotAdmins = isGroup ? groupAdmins.some(admin => admin.id === botNumber + '@s.whatsapp.net') : false;
        
        if (!isBotAdmins) return reply("𝐏𝐥𝐞𝐚𝐬𝐞 𝐏𝐫𝐨𝐯𝐢𝐝𝐞 𝐌𝐞 𝐀𝐝𝐦𝐢𝐧 𝐑𝐨𝐥𝐞 ❗");

        // Check if the sender is an admin
        const isAdmins = isGroup ? groupAdmins.some(admin => admin.id === sender) : false;
        if (!isAdmins) return reply("𝐏𝐥𝐞𝐚𝐬𝐞 𝐏𝐫𝐨𝐯𝐢𝐝𝐞 𝐌𝐞 𝐀𝐝𝐦𝐢𝐧 𝐑𝐨𝐥𝐞 ❗");

        // Get the invite code and generate the link
        const inviteCode = await conn.groupInviteCode(from);
        if (!inviteCode) return reply("Failed to retrieve the invite code.");

        const inviteLink = `https://chat.whatsapp.com/${inviteCode}`;

        // Reply with the invite link
        return reply(`*Here is your group invite link:*\n${inviteLink}`);
        
    } catch (error) {
        console.error("Error in invite command:", error);
        reply(`An error occurred: ${error.message || "Unknown error"}`);
    }
});

//--------------------------------------------
//  GINFO COMMANDS
//--------------------------------------------
malvin({
    pattern: "ginfo",
    desc: "Get group information.",
    category: "group",
    filename: __filename,
}, async (conn, mek, m, { from, quoted, body, args, q, isGroup, sender, reply }) => {
    try {
        if (!isGroup) return reply("𝐓𝐡𝐢𝐬 𝐅𝐞𝐚𝐭𝐮𝐫𝐞 𝐈𝐬 𝐎𝐧𝐥𝐲 𝐅𝐨𝐫 𝐆𝐫𝐨𝐮𝐩❗");

        // Get group metadata
        const groupMetadata = await conn.groupMetadata(from);
        const groupName = groupMetadata.subject;
        const groupAdmins = groupMetadata.participants.filter(member => member.admin);
        const memberCount = groupMetadata.participants.length;
        const adminList = groupAdmins.map(admin => `│ ∘  @${admin.id.split('@')[0]}`).join("\n") || "│ ∘ No admins";

        // Format the output
        let textt = `
╭───「 MALVIN-XD 」───◆  
│ ∘ ɢʀᴏᴜᴘ: ${groupName}  
│ ∘ ɢʀᴏᴜᴘ ɪᴅ: ${from}  
│ ∘ ᴛᴏᴛᴀʟ ᴍᴇᴍʙᴇʀs: ${memberCount}  
│ ∘ ─────────────────  
${adminList}
`;

        // Send the group information
        await conn.sendMessage(from, {
            text: textt,
            mentions: groupAdmins.map(a => a.id),
        }, { quoted: mek });

    } catch (error) {
        console.error("Error in ginfo command:", error);
        reply("An error occurred while retrieving the group information.");
    }
});

//--------------------------------------------
//           BROADCAST COMMANDS
//--------------------------------------------
malvin({
  pattern: "broadcast",
  category: "group",
  desc: "Bot makes a broadcast in all groups",
  filename: __filename,
  use: "<text for broadcast.>"
}, async (conn, mek, m, { q, isGroup, isAdmins, reply }) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups!");
    if (!isAdmins) return reply("❌ You need to be an admin to broadcast in this group!");

    if (!q) return reply("❌ Provide text to broadcast in all groups!");

    let allGroups = await conn.groupFetchAllParticipating();
    let groupIds = Object.keys(allGroups); // Extract group IDs

    reply(`📢 Sending Broadcast To ${groupIds.length} Groups...\n⏳ Estimated Time: ${groupIds.length * 1.5} seconds`);

    for (let groupId of groupIds) {
      try {
        await sleep(1500); // Avoid rate limits
        await conn.sendMessage(groupId, { text: q }); // Sends only the provided text
      } catch (err) {
        console.log(`❌ Failed to send broadcast to ${groupId}:`, err);
      }
    }

    return reply(`✅ Successfully sent broadcast to ${groupIds.length} groups!`);
    
  } catch (err) {
    await m.error(`❌ Error: ${err}\n\nCommand: broadcast`, err);
  }
});
//--------------------------------------------
//  AUTO_RECORDING COMMANDS
//--------------------------------------------
malvin({
    pattern: "setgpp",
    desc: "Set full-screen profile picture for groups.",
    category: "group",
    filename: __filename
}, async (conn, mek, m, { quoted, isGroup, isAdmins, isBotAdmins, reply }) => {
    if (!isGroup) return reply("⚠️ This command can only be used in a group.");
    if (!isAdmins) return reply("❌ You must be an admin to use this command.");
    if (!isBotAdmins) return reply("❌ I need to be an admin to change the group profile picture.");
    if (!quoted || !quoted.image) return reply("⚠️ Reply to an image to set as the group profile picture.");

    try {
        let media = await quoted.download();
        await conn.updateProfilePicture(m.chat, media);
        reply("✅ Group profile picture updated successfully.");
    } catch (e) {
        console.error(e);
        reply(`❌ Failed to update group profile picture: ${e.message}`);
    }
});


malvin({
    pattern: "setvar",
    alias: ["envvar", "cmdlist"],
    react: "📜",
    desc: "List all commands and their current status.",
    category: "settings",
    filename: __filename,
}, async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 Only the owner can use this command!*");

    const cmdList = `
    ----------------------------------------
        MALVIN XD V3 SETTINGS 
    -----------------------------------------
 
🔧 *1. Mode*
   - Current Status: ${config.MODE || "public"}
   - Usage: ${config.PREFIX}mode private/public

🎯 *2. Auto Typing*
   - Current Status: ${config.AUTO_TYPING || "off"}
   - Usage: ${config.PREFIX}autotyping on/off

🌐 *3. Always Online*
   - Current Status: ${config.ALWAYS_ONLINE || "off"}
   - Usage: ${config.PREFIX}alwaysonline on/off

🎙️ *4. Auto Recording*
   - Current Status: ${config.AUTO_RECORDING || "off"}
   - Usage: ${config.PREFIX}autorecording on/off

📖 *5. Auto Read Status*
   - Current Status: ${config.AUTO_STATUS_REACT || "off"}
   - Usage: ${config.PREFIX}autoreadstatus on/off

🚫 *6. Anti Bad Word*
   - Current Status: ${config.ANTI_BAD_WORD || "off"}
   - Usage: ${config.PREFIX}antibad on/off

🗑️ *#. Anti Delete*
   - Current Status: ${config.ANTI_BAD_WORD || "off"}
   - Usage: ${config.PREFIX}antidelete on/off


🖼️ *7. Auto Sticker*
   - Current Status: ${config.AUTO_STICKER || "off"}
   - Usage: ${config.PREFIX}autosticker on/off

💬 *8. Auto Reply*
   - Current Status: ${config.AUTO_REPLY || "off"}
   - Usage: ${config.PREFIX}autoreply on/off

❤️ *9. Auto React*
   - Current Status: ${config.AUTO_REACT || "off"}
   - Usage: ${config.PREFIX}autoreact on/off

📢 *10. Status Reply*
   - Current Status: ${config.AUTO_STATUS_REPLY || "off"}
   - Usage: ${config.PREFIX}autostatusreply on/off

🔗 *11. Anti Link*
   - Current Status: ${config.ANTI_LINK || "off"}
   - Usage: ${config.PREFIX}antilink on/off

🤖 *12. Anti Bot*
   - Current Status: ${antibotAction || "off"}
   - Usage: ${config.PREFIX}antibot off/warn/delete/kick

💖 *13. Heart React*
   - Current Status: ${config.HEART_REACT || "off"}
   - Usage: ${config.PREFIX}heartreact on/off

🔧 *14. Set Prefix*
   - Current Prefix: ${config.PREFIX || "."}
   - Usage: ${config.PREFIX}setprefix <new_prefix>

📊 *15. Poll*
   - Usage: ${config.PREFIX}poll question;option1,option2,...

💞 *16. Random Ship*
   - Usage: ${config.PREFIX}randomship

👥 *17. New Group*
   - Usage: ${config.PREFIX}newgc group_name;number1,number2,...

🚪 *18. Exit Group*
   - Usage: ${config.PREFIX}exit

🔗 *19. Group Invite Link*
   - Usage: ${config.PREFIX}invite2

📢 *20. Broadcast*
   - Usage: ${config.PREFIX}broadcast <text>

🖼️ *21. Set Group Profile Picture*
   - Usage: ${config.PREFIX}setgrouppp (reply to an image)

📌 *Note*: Replace "on/off" with the desired state to enable or disable a feature.
`;

    return reply(cmdList);
});


malvin({
    pattern: "heartreact",
    react: "💖",
    alias: ["heart"],
    desc: "Enable or disable heart react.",
    category: "settings",
    filename: __filename,
}, async (conn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const option = args[0]?.toLowerCase();
    
    if (option === "on" || option === "true") {
        config.HEART_REACT = "true"; // Set to "true" for enabling
        return reply("❤️ Heart react is now enabled.");
    } else if (option === "off" || option === "false") {
        config.HEART_REACT = "false"; // Set to "false" for disabling
        return reply("💔 Heart react is now disabled.");
    } else {
        return reply("*🔥 Example: .heartreact on* or *[.heartreact off]*");
    }
});


// Malvin Kings Code
