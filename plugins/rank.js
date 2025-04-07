const { malvin } = require('../malvin');
const fs = require('fs');

// Load user XP data from a file (persistent storage)
const dataFile = '../data/userLevels.json';
let userLevels = fs.existsSync(dataFile) ? JSON.parse(fs.readFileSync(dataFile)) : {};

// Function to save user data
const saveUserData = () => fs.writeFileSync(dataFile, JSON.stringify(userLevels, null, 2));

// Function to calculate level based on XP
const calculateLevel = (xp) => Math.floor(0.1 * Math.sqrt(xp));

malvin({
    pattern: "rank",
    desc: "Check the level of a user.",
    react: "📊",
    category: "utility",
    use: ".rank [@mention or reply]",
    filename: __filename,
}, async (conn, mek, m, { reply, mentionedJid }) => {
    try {
        let target;

        // Determine the target user
        if (mentionedJid?.length > 0) {
            target = mentionedJid[0];
        } else if (m.quoted && m.quoted.sender) {
            target = m.quoted.sender;
        } else {
            target = m.sender;
        }

        if (!target) {
            return reply("❌ Please mention a user or reply to their message to check their rank.");
        }

        // Initialize user data if not present
        if (!userLevels[target]) {
            userLevels[target] = { experience: 0, messages: 0 };
        }

        // Simulate experience gain
        const userData = userLevels[target];
        userData.messages += 1;
        userData.experience += Math.floor(Math.random() * 5) + 5; // Random XP between 5-10
        saveUserData(); // Save progress

        const level = calculateLevel(userData.experience);
        const nextLevelXP = Math.pow((level + 1) / 0.1, 2);
        const currentLevelXP = Math.pow(level / 0.1, 2);
        const progressPercent = Math.floor(((userData.experience - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100);

        // Dynamic Progress Bar
        const barLength = 10;
        const filledBars = Math.floor((progressPercent / 100) * barLength);
        const progressBar = "⭐".repeat(filledBars) + "⚪".repeat(barLength - filledBars);

        // URL of the image for the rank
        const levelImageURL = "https://files.catbox.moe/yfeca5.jpg"; // Replace with your desired image URL

        // Rank message with user mention
        const caption = `📊 *Rank Information*\n\n👤 *User*: @${
            target.split("@")[0]
        }\n🔝 *Level*: ${level}\n🔄 *Progress*: ${progressPercent}%\n${progressBar}\n📩 *Messages Sent*: ${
            userData.messages
        }\n✨ *XP*: ${userData.experience}\n\n> 🤖 POWERED BY MALVIN 🤖`;

        // Send rank image and caption
        await conn.sendMessage(
            m.chat,
            { image: { url: levelImageURL }, caption, mentions: [target] },
            { quoted: mek }
        );

    } catch (error) {
        console.error("Error in rank command:", error);
        reply("❌ An error occurred while fetching the rank. Please try again.");
    }
});
