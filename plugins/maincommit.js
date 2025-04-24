const { malvin } = require('../malvin'); // Assuming you have a command handler
const axios = require('axios'); // For making HTTP requests to GitHub API

// GitHub repository details
const REPO_OWNER = 'XdKing2';
const REPO_NAME = 'MALVIN-XD';
const PLUGINS_FOLDER = 'plugins'; // Folder where plugins are stored

// GitHub API URLs
const GITHUB_API_URL = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${PLUGINS_FOLDER}`;
const GITHUB_COMMITS_URL = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/commits`;

// Function to fetch commit history for a file
async function fetchCommitHistory(filePath) {
    try {
        const { data } = await axios.get(GITHUB_COMMITS_URL, {
            params: { path: filePath, per_page: 1 } // Fetch only the latest commit
        });
        return data.length > 0 ? data[0] : null;
    } catch (error) {
        console.error("❌ Error fetching commit history:", error.response?.data || error.message);
        return null;
    }
}

// Function to check if a commit is within the last 2 hours
function isCommitRecent(commit) {
    if (!commit) return false;
    const commitDate = new Date(commit.commit.author.date);
    return commitDate >= new Date(Date.now() - 2 * 60 * 60 * 1000); // 2 hours ago
}

// Command to list plugins with recent commit history
malvin({
    pattern: "recentplugins",
    alias: ["recentplugs", "newplugins", "whatsnew"],
    use: '.recentplugins',
    react: "🆕",
    desc: "List all plugins with commit history from the last 2 hours.",
    category: "utility",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        // Fetch the list of plugins from GitHub
        const { data: plugins } = await axios.get(GITHUB_API_URL);
        const files = plugins.filter(item => item.type === 'file'); // Ensure only files are listed

        if (files.length === 0) return reply("*📂 No plugins found in the repository.*");

        // Fetch commit history and filter by recent commits
        let recentPlugins = [];
        for (const plugin of files) {
            const commit = await fetchCommitHistory(plugin.path);
            if (isCommitRecent(commit)) {
                recentPlugins.push({ 
                    name: plugin.name, 
                    commit,
                    author: commit.commit.author.name, // Get author name
                    commitMessage: commit.commit.message, // Get commit message
                    commitTime: new Date(commit.commit.author.date).toLocaleTimeString(), // Format commit time
                    commitUrl: commit.html_url // Commit URL
                });
            }
        }

        if (recentPlugins.length === 0) return reply("*⚠️ No plugins have been updated in the last 2 hours.*");

        // Format the list of recent plugins
        let pluginList = `🆕 *RECENTLY UPDATED PLUGINS (Last 2 Hours):*\n\n`;
        recentPlugins.forEach((plugin, index) => {
            pluginList += `${index + 1}. 📜 *${plugin.name}*\n`;
            pluginList += `   👤 *Author:* ${plugin.author}\n`;
            pluginList += `   🕒 *Updated:* ${plugin.commitTime}\n`;
            pluginList += `   📝 *Message:* ${plugin.commitMessage}\n`;
            pluginList += `   🔗 [View Commit](${plugin.commitUrl})\n\n`;
        });

        // Send the list to the user
        await reply(pluginList);
    } catch (error) {
        console.error("❌ Error fetching plugins:", error.response?.data || error.message);
        reply("*🚨 Error: Unable to fetch plugin updates. Please try again later.*");
    }
});
