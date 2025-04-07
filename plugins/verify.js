const { malvin } = require('../malvin');
const axios = require('axios');
const fs = require('fs');

const verifiedUsersFile = "./data/verified_users.json";
const BOT_REPO = "XdKing2/MALVIN-XD"; // Replace with your bot's repo
const CHANNEL_URL = "https://whatsapp.com/channel/0029VbA6MSYJUM2TVOzCSb2A"; // Channel URL for verification
const VERIFICATION_EXPIRATION_DAYS = 30;
const REMINDER_DAYS_BEFORE_EXPIRY = 5;

// Load verified users safely
let verifiedUsers;
try {
    verifiedUsers = fs.existsSync(verifiedUsersFile) ? JSON.parse(fs.readFileSync(verifiedUsersFile)) : {};
} catch (error) {
    console.error("Error loading verified users file:", error);
    verifiedUsers = {};
}

// Check if GitHub user exists
async function verifyGitHubUser(username) {
    try {
        const response = await axios.get(`https://api.github.com/users/${username}`);
        return response.status === 200;
    } catch (error) {
        return false;
    }
}

// Check if user has forked the bot repository
async function hasForkedRepo(username) {
    try {
        const response = await axios.get(`https://api.github.com/repos/${BOT_REPO}/forks`);
        const forks = response.data;
        return forks.some(fork => fork.owner.login.toLowerCase() === username.toLowerCase());
    } catch (error) {
        return false;
    }
}

// Check if user has joined the required channel
async function hasJoinedChannel(senderId) {
    // Simulate the check for channel join status using a method to check if the user is a member of the channel.
    // Replace with the actual API or method to check if the user has joined the WhatsApp channel
    try {
        const response = await axios.get(`https://api.whatsapp.com/channel/0029VbA6MSYJUM2TVOzCSb2A/members/${senderId}`);
        return response.status === 200;
    } catch (error) {
        return false;
    }
}

// Check if verification is expired
function isVerificationExpired(timestamp) {
    return Date.now() - timestamp > VERIFICATION_EXPIRATION_DAYS * 24 * 60 * 60 * 1000;
}

// Auto-verify and enforce verification for the user
async function autoVerifyUser(conn, mek, m) {
    const senderId = mek.sender.split('@')[0];

    // Check if the user is verified
    if (!verifiedUsers[senderId] || isVerificationExpired(verifiedUsers[senderId].timestamp)) {
        // Force disconnect if the user is not verified
        try {
            await conn.leaveGroup(m.chat);
            await conn.sendMessage(senderId, "❌ You are not verified! Please verify by forking the repository, joining the channel, and using `.verify yourGitHubUsername`.");
        } catch (error) {
            console.error("Error disconnecting user:", error);
        }
        return;
    }
}

// Middleware to check if the user is verified before executing commands
async function checkUserVerification(conn, mek, m, next) {
    const senderId = mek.sender.split('@')[0];

    if (!verifiedUsers[senderId] || isVerificationExpired(verifiedUsers[senderId].timestamp)) {
        return await autoVerifyUser(conn, mek, m); // Disconnect if not verified
    }

    next();
}

// Apply middleware to all commands
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
        return reply(`✅ You are already verified! No need to verify again.`);
    }

    // Check GitHub username validity
    const isValid = await verifyGitHubUser(username);
    if (!isValid) {
        return reply("❌ Invalid GitHub username! Please enter a valid username.");
    }

    // Check if user has forked the bot repository
    const forked = await hasForkedRepo(username);
    if (!forked) {
        return reply("❌ Verification failed! You must fork the bot's repository before using the bot.\nPlease fork it and try again.");
    }

    // Check if the user has joined the channel
    const joinedChannel = await hasJoinedChannel(senderId);
    if (!joinedChannel) {
        return reply("❌ Verification failed! You must join the WhatsApp channel to proceed.\nPlease join the channel and try again.");
    }

    // If verification is successful
    verifiedUsers[senderId] = { username, timestamp: Date.now() };
    fs.writeFileSync(verifiedUsersFile, JSON.stringify(verifiedUsers, null, 2));

    reply(`✅ GitHub verification successful! Welcome, ${username}.`);
});

// Check Verification Status Command
malvin({
    pattern: "checkverify",
    desc: "Check if your GitHub verification is still valid.",
    category: "admin",
    filename: __filename,
}, async (conn, mek, m, { reply }) => {
    const senderId = mek.sender.split('@')[0];

    if (!verifiedUsers[senderId]) {
        return reply("❌ You are not verified! Use `.verify yourGitHubUsername`.");
    }

    const { username, timestamp } = verifiedUsers[senderId];

    if (isVerificationExpired(timestamp)) {
        return reply(`⚠️ Your verification for GitHub user **${username}** has expired! Please re-verify using \`.verify ${username}\`.`);
    }

    reply(`✅ Your GitHub verification for **${username}** is still valid.`);
});

// Automatically ask for verification when the bot is first deployed
malvin({
    pattern: "start",
    desc: "Start command to ask user for verification.",
    category: "admin",
    filename: __filename,
}, async (conn, mek, m, { reply }) => {
    const senderId = mek.sender.split('@')[0];

    if (!verifiedUsers[senderId] || isVerificationExpired(verifiedUsers[senderId].timestamp)) {
        reply("❌ You are not verified! Please verify by forking the repository, joining the channel, and using `.verify yourGitHubUsername`.");
    } else {
        reply("✅ You are already verified!");
    }
});
