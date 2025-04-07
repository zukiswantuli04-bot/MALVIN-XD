const fs = require('fs');
const axios = require('axios');

const VERIFIED_USERS_FILE = "./data/verified_users.json";
const VERIFICATION_EXPIRATION_MS = 30 * 24 * 60 * 60 * 1000;
let verifiedUsers = {};

// Load users once at startup
try {
    verifiedUsers = fs.existsSync(VERIFIED_USERS_FILE)
        ? JSON.parse(fs.readFileSync(VERIFIED_USERS_FILE))
        : {};
} catch (err) {
    console.error("Error loading verified users:", err);
}

// Utility function
function isVerificationExpired(timestamp) {
    return Date.now() - timestamp > VERIFICATION_EXPIRATION_MS;
}

// Disconnect unverified users
async function autoVerifyUser(conn, mek, m) {
    const senderId = mek.sender.split('@')[0];
    const user = verifiedUsers[senderId];

    if (!user || isVerificationExpired(user.timestamp)) {
        try {
            await conn.leaveGroup(m.chat);
            await conn.sendMessage(senderId, "❌ You are not verified! Please verify by forking the repository, joining the channel, and using `.verify yourGitHubUsername`.");
        } catch (err) {
            console.error("Error disconnecting unverified user:", err);
        }
    }
}

// Middleware function
async function checkUserVerification(conn, mek, m, next) {
    const senderId = mek.sender.split('@')[0];
    const user = verifiedUsers[senderId];

    if (!user || isVerificationExpired(user.timestamp)) {
        return await autoVerifyUser(conn, mek, m);
    }

    next();
}

module.exports = { checkUserVerification };
