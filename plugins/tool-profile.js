const { malvin } = require('../malvin');
const { getBuffer, fetchJson } = require('../lib/functions');

malvin({
    pattern: "person",
    react: "👤",
    alias: ["userinfo", "profile"],
    desc: "Get complete user profile information",
    category: "utility",
    use: '.person [@tag or reply]',
    filename: __filename
},
async (conn, mek, m, { from, sender, isGroup, reply, quoted, participants }) => {
    try {
        console.log("Fetching user profile...");

        // 1. DETERMINE TARGET USER
        let userJid = quoted?.sender || 
                     mek.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || 
                     sender;

        // 2. VERIFY USER EXISTS
        const [user] = await conn.onWhatsApp(userJid).catch(() => []);
        if (!user?.exists) return reply("❌ User not found on WhatsApp");

        // 3. GET PROFILE PICTURE
        let ppUrl;
        try {
            ppUrl = await conn.profilePictureUrl(userJid, 'image');
        } catch {
            ppUrl = 'https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png';
        }

        // 4. GET NAME (PRIORITIZED ORDER)
        let userName = userJid.split('@')[0]; // Default username
        try {
            // Check presence first
            const presence = await conn.presenceSubscribe(userJid).catch(() => null);
            if (presence?.pushname) userName = presence.pushname;

            // Check group participant info
            if (isGroup) {
                const member = participants.find(p => p.id === userJid);
                if (member?.notify) userName = member.notify;
            }

            // Check contact DB if still default name
            if (userName === userJid.split('@')[0] && conn.contactDB) {
                const contact = await conn.contactDB.get(userJid).catch(() => null);
                if (contact?.name) userName = contact.name;
            }
        } catch (e) {
            console.log("Name fetch error:", e);
        }

        // 5. GET BIO/ABOUT
        let bio = {};
        try {
            const statusData = await conn.fetchStatus(userJid).catch(() => null);
            if (statusData?.status) {
                bio = {
                    text: statusData.status,
                    type: "Personal",
                    updated: statusData.setAt ? new Date(statusData.setAt * 1000) : null
                };
            } else {
                // Try business profile as fallback
                const businessProfile = await conn.getBusinessProfile(userJid).catch(() => null);
                if (businessProfile?.description) {
                    bio = {
                        text: businessProfile.description,
                        type: "Business",
                        updated: null
                    };
                }
            }
        } catch (e) {
            console.log("Bio fetch error:", e);
        }

        // 6. GET LAST SEEN
        let lastSeen = "❌ Hidden";
        try {
            const lastSeenData = await conn.fetchPresence(userJid).catch(() => null);
            if (lastSeenData?.lastSeen) {
                lastSeen = `🕒 ${new Date(lastSeenData.lastSeen * 1000).toLocaleString()}`;
            }
        } catch (e) {
            console.log("Last seen fetch error:", e);
        }

        // 7. GET TWO-STEP VERIFICATION STATUS
        let isTwoStepEnabled = "Unknown";
        try {
            const securityInfo = await conn.fetchSecurity(userJid).catch(() => null);
            if (securityInfo?.isTwoStepEnabled !== undefined) {
                isTwoStepEnabled = securityInfo.isTwoStepEnabled ? "✅ Enabled" : "❌ Disabled";
            }
        } catch (e) {
            console.log("Two-step verification fetch error:", e);
        }

        // 8. GET GROUP ROLE
        let groupRole = isGroup ? "👥 Member" : "N/A";
        if (isGroup) {
            const participant = participants.find(p => p.id === userJid);
            if (participant?.admin) groupRole = "👑 Admin";
        }

        // 9. FORMAT OUTPUT
        const formattedBio = bio.text ? 
            `${bio.text}\n└─ 📌 ${bio.type} Bio${bio.updated ? ` | 🕒 ${bio.updated.toLocaleString()}` : ''}` : 
            "No bio available";

        const userInfo = `
*GC MEMBER INFORMATION 🧊*

📛 *Name:* ${userName}
🔢 *Number:* ${userJid.replace(/@.+/, '')}
📌 *Account Type:* ${user.isBusiness ? "💼 Business" : user.isEnterprise ? "🏢 Enterprise" : "👤 Personal"}

*📝 About:*
${formattedBio}

*⚙️ Account Info:*
✅ Registered: ${user.isUser ? "Yes" : "No"}
🛡️ Verified: ${user.verifiedName ? "✅ Verified" : "❌ Not verified"}
🕒 *Last Seen:* ${lastSeen}
🔐 *Two-Step Verification:* ${isTwoStepEnabled}
${isGroup ? `👥 *Group Role:* ${groupRole}` : ''}
`.trim();

        // 10. SEND RESULT
        await conn.sendMessage(from, {
            image: { url: ppUrl },
            caption: userInfo,
            mentions: [userJid]
        }, { quoted: mek });

        console.log("User profile sent successfully!");
    } catch (e) {
        console.error("Person command error:", e);
        reply(`❌ Error: ${e.message || "Failed to fetch profile"}`);
    }
});
