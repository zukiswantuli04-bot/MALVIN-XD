

const { malvin } = require('../malvin');
const axios = require('axios');
const fs = require('fs');

const verifiedUsersFile = "./data/verified_users.json";
const BOT_REPO = "XdKing2/MALVIN-XD";
const CHANNEL_URL = "https://whatsapp.com/channel/0029VbA6MSYJUM2TVOzCSb2A";
const VERIFICATION_EXPIRATION_DAYS = 30;

// Load verified users safely
let verifiedUsers;
try {
    const content = fs.existsSync(verifiedUsersFile) ? fs.readFileSync(verifiedUsersFile, 'utf-8') : "{}";
    verifiedUsers = content.trim() ? JSON.parse(content) : {};
} catch (error) {
    console.error("Error loading verified users file:", error);
    verifiedUsers = {};
    fs.writeFileSync(verifiedUsersFile, "{}"); // reset broken file
}

// Check if GitHub user exists
async function verifyGitHubUser(username) {
    try {
        const response = await axios.get(`https://api.github.com/users/${username}`);
        return response.status === 200;
    } catch {
        return false;
    }
}

// Check if user has forked the bot repository
async function hasForkedRepo(username) {
    try {
        const response = await axios.get(`https://api.github.com/repos/${BOT_REPO}/forks`);
        return response.data.some(fork => fork.owner.login.toLowerCase() === username.toLowerCase());
    } catch {
        return false;
    }
}

// Simulate WhatsApp channel check
async function hasJoinedChannel(senderId) {
    try {
        const response = await axios.get(`https://api.whatsapp.com/channel/0029VbA6MSYJUM2TVOzCSb2A/members/${senderId}`);
        return response.status === 200;
    } catch {
        return false;
    }
}

// Check if verification expired
function isVerificationExpired(timestamp) {
    return Date.now() - timestamp > VERIFICATION_EXPIRATION_DAYS * 24 * 60 * 60 * 1000;
}

// Force disconnect if not verified
async function autoVerifyUser(conn, mek, m) {
    const senderId = mek.sender.split('@')[0];

    if (!verifiedUsers[senderId] || isVerificationExpired(verifiedUsers[senderId].timestamp)) {
        try {
            await conn.leaveGroup(m.chat);
            await conn.sendMessage(senderId, "❌ You are not verified! Please verify by forking the repository, joining the channel, and using `.verify yourGitHubUsername`.");
        } catch (error) {
            console.error("Error disconnecting user:", error);
        }
    }
}

// Middleware to check verification
async function checkUserVerification(conn, mek, m, next) {
    const senderId = mek.sender.split('@')[0];
    if (!verifiedUsers[senderId] || isVerificationExpired(verifiedUsers[senderId].timestamp)) {
        return await autoVerifyUser(conn, mek, m);
    }
    next();
}

malvin.use(checkUserVerification);

// Verify Command
malvin({
    pattern: "verify",
    desc: "Verify GitHub username before using the bot. Must have forked the repository and joined the channel.",
    category: "admin",
    filename: __filename,
}, async (conn, mek, m, { reply, args }) => {
    if (!args[0]) return reply("❌ Please provide your GitHub username.\nExample: `.verify yourGitHubUsername`");

    const username = args[0];
    const senderId = mek.sender.split('@')[0];

    if (verifiedUsers[senderId] && !isVerificationExpired(verifiedUsers[senderId].timestamp)) {
        return reply(`✅ You are already verified!`);
    }

    const isValid = await verifyGitHubUser(username);
    if (!isValid) return reply("❌ Invalid GitHub username!");

    const forked = await hasForkedRepo(username);
    if (!forked) return reply("❌ You must fork the bot's repository before using the bot.");

    const joinedChannel = await hasJoinedChannel(senderId);
    if (!joinedChannel) return reply("❌ You must join the WhatsApp channel before verifying.");

    verifiedUsers[senderId] = { username, timestamp: Date.now() };
    fs.writeFileSync(verifiedUsersFile, JSON.stringify(verifiedUsers, null, 2));

    reply(`✅ GitHub verification successful! Welcome, ${username}.`);
});

// Check verification status
malvin({
    pattern: "checkverify",
    desc: "Check your GitHub verification status.",
    category: "admin",
    filename: __filename,
}, async (conn, mek, m, { reply }) => {
    const senderId = mek.sender.split('@')[0];

    if (!verifiedUsers[senderId]) {
        return reply("❌ You are not verified! Use `.verify yourGitHubUsername`.");
    }

    const { username, timestamp } = verifiedUsers[senderId];

    if (isVerificationExpired(timestamp)) {
        return reply(`⚠️ Your verification for GitHub user **${username}** has expired! Please re-verify.`);
    }

    reply(`✅ Your GitHub verification for **${username}** is still valid.`);
});

// Prompt to verify on start
malvin({
    pattern: "start",
    desc: "Start command to ask user for verification.",
    category: "admin",
    filename: __filename,
}, async (conn, mek, m, { reply }) => {
    const senderId = mek.sender.split('@')[0];

    if (!verifiedUsers[senderId] || isVerificationExpired(verifiedUsers[senderId].timestamp)) {
        reply("❌ You are not verified! Use `.verify yourGitHubUsername`.");
    } else {
        reply("✅ You are already verified!");
    }
});
