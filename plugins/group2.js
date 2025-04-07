const config = require('../settings')
const { malvin, commands } = require('../malvin')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')


malvin({
    pattern: "taggp",
    react: "🔊",
    alias: ["tggp","djtaggp"],
    desc: "To Tag all Members for Message",
    category: "group",
    use: '.tag Hi',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, mentionByTag , args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
		if ( !m.quoted ) return reply('*Please mention a message* ℹ️')
		if(!q) return reply('*Please add a Group Jid* ℹ️')
		//if ( q == "120363372230280282@g.us" ) { if ( !isDev ) return reply("❌ *Acai wage ! You can send Tag messages to Official Support Group*") }
		let teks = `${m.quoted.msg}`
        conn.sendMessage(q, { text: teks, mentions: participants.map(a => a.id) }, { quoted: mek })
                
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`❌ *Error Accurated !!*\n\n${e}`)
}
} )

malvin({
    pattern: "ginfo2",
    desc: "Get group information.",
    category: "group",
    filename: __filename,
}, async (conn, mek, m, {
    from,
    isGroup,
    isAdmins,
    isOwner,
    isBotAdmins,
    reply
}) => {
    try {
        // Ensure the command is used in a group
        if (!isGroup) return reply("*`[❌]`This command can only be used in groups.*");

        // Only admins or the owner can use this command
        if (!isAdmins && !isOwner) return reply("*`[❌]`Only admins and the owner can use this command.*");

        // Ensure the bot has admin privileges
        if (!isBotAdmins) return reply("*`[❌]`I need admin privileges to execute this command.*");

        // Get group metadata
        const groupMetadata = await conn.groupMetadata(from);
        const groupName = groupMetadata.subject;
        const memberCount = groupMetadata.participants.length;

        // Get group creator
        let creator = groupMetadata.owner ? `@${groupMetadata.owner.split('@')[0]}` : 'Unknown';

        // Get list of admins
        const groupAdmins = groupMetadata.participants
            .filter(member => member.admin)
            .map((admin, index) => `${index + 1}. @${admin.id.split('@')[0]}`)
            .join("\n") || "No admins found";

        // Get creation date (convert from timestamp)
        const creationDate = groupMetadata.creation 
            ? new Date(groupMetadata.creation * 1000).toLocaleString('en-US', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
            }) 
            : 'Unknown';

        // Format the output message
        const message = `
╭───「 *GROUP INFORMATION* 」───◆  
│ 🏷️ *Group Name:* ${groupName}  
│ 🆔 *Group ID:* ${from}  
│ 👥 *Total Members:* ${memberCount}  
│ 👑 *Creator:* ${creator}  
│ 📅 *Created On:* ${creationDate}  
│ 🚻 *Admins:*  
│ ${groupAdmins}  
╰───────────────────◆`;

        // Send the group information with mentions
        await conn.sendMessage(from, {
            text: message,
            mentions: groupMetadata.participants
                .filter(member => member.admin)
                .map(admin => admin.id)
        }, { quoted: mek });

    } catch (error) {
        console.error("Error in ginfo command:", error);
        reply("❌ An error occurred while retrieving the group information.");
    }
});