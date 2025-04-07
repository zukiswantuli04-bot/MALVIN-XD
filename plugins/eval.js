const { malvin } = require('../malvin');
const util = require('util');
const fs = require("fs");
const path = require("path");

malvin({
    pattern: "eval",
    desc: "Evaluate JavaScript code",
    category: "tools",
    filename: __filename,
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    
    // Check if the user is the owner or an admin, for security purposes
    if (!isOwner) {
        return reply("⚠️ You are not authorized to use this command.");
    }

    let codeToEval = q;
    if (!codeToEval) return reply("❌ Please provide code to evaluate.");

    try {
        // Limit the context for eval to avoid security risks
        const result = await evalInSandbox(codeToEval);
        
        // Ensure the result is a string for sending the reply
        let resultStr = util.inspect(result);
        
        // Limit the length of output to avoid excessive replies
        if (resultStr.length > 3000) {
            resultStr = resultStr.slice(0, 3000) + "\n... (output truncated)";
        }

        await reply(resultStr);
    } catch (e) {
        // Catch and send any errors
        await reply(`❌ Error: ${util.format(e)}`);
    }
});

// Function to evaluate code safely within a controlled sandbox context
async function evalInSandbox(code) {
    // Create a safe environment for eval to run
    return new Promise((resolve, reject) => {
        try {
            // Use `vm` module for a safer evaluation in a restricted context
            const vm = require('vm');
            const context = { console, setTimeout, setInterval, clearTimeout, clearInterval, require, module, exports };
            vm.createContext(context); // Create the context
            const script = new vm.Script(code);
            const result = script.runInContext(context); // Execute code in the sandbox
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
}
