const { malvin } = require("../malvin");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const { exec } = require("child_process");
const config = require("../settings");
const chalk = require("chalk");
const fetch = require("node-fetch");
const moment = require("moment-timezone");

malvin({
  pattern: "setpp",
  desc: "Set your profile picture.",
  category: "owner1",
  alias: ["setmypp"],
  react: "🖼️",
  filename: __filename,
  use: "[Reply to an image]",
  async execute(m, { conn, image }) {
    try {
      if (!image) return m.reply("Please reply to an image to set your profile picture.");
      await conn.updateProfilePicture(m.sender, image);
      m.reply("Profile picture updated successfully!");
    } catch (err) {
      m.reply("Failed to update profile picture. Make sure you're replying to a valid image.");
    }
  },
});

malvin({
  pattern: "setname",
  desc: "Change your WhatsApp name.",
  category: "admin",
  alias: ["waname", "setmyname"],
  react: "✏️",
  filename: __filename,
  use: "[new name]",
  async execute(m, { text, conn }) {
    if (!text) return m.reply("Please provide a new name.");
    try {
      await conn.updateProfileName(text);
      m.reply(`Your name has been updated to *${text}*.`);
    } catch (err) {
      m.reply("Failed to update name. Please try again later.");
    }
  },
});

malvin({
  pattern: "blocklist",
  desc: "View all blocked contacts.",
  category: "admin",
  alias: ["blocked"],
  react: "🚫",
  filename: __filename,
  async execute(m, { conn }) {
    try {
      let blocked = await conn.fetchBlocklist();
      if (!blocked || blocked.length === 0) return m.reply("You have no blocked contacts.");
      let list = blocked.map((num, i) => `${i + 1}. @${num.replace(/[^0-9]/g, "")}`).join("\n");
      m.reply(`*Blocked Contacts:*\n${list}`, { mentions: blocked });
    } catch (err) {
      m.reply("Failed to retrieve blocked list. Please try again later.");
    }
  },
});

malvin({
  pattern: "getprivacy",
  desc: "Check current privacy settings.",
  category: "owner1",
  alias: ["privacy"],
  react: "🔒",
  filename: __filename,
  async execute(m, { conn }) {
    try {
      let settings = await conn.fetchPrivacySettings();
      let msg = "*Current Privacy Settings:*\n\n";
      for (let key in settings) {
        msg += `- *${key.replace(/_/g, " ")}:* ${settings[key]}\n`;
      }
      m.reply(msg);
    } catch (err) {
      m.reply("Failed to retrieve privacy settings. Please try again later.");
    }
  },
});

malvin({
  pattern: "setprivacy",
  desc: "Update your privacy settings.",
  category: "owner1",
  react: "⚙️",
  filename: __filename,
  use: "[setting] [value]",
  async execute(m, { text, conn }) {
    let [setting, value] = text.split(" ");
    if (!setting || !value) return m.reply("Usage: *setprivacy [setting] [value]*");
    try {
      await conn.updatePrivacySetting(setting, value);
      m.reply(`Privacy setting *${setting}* updated to *${value}*.`);
    } catch (err) {
      m.reply("Failed to update privacy settings. Ensure correct inputs.");
    }
  },
});
