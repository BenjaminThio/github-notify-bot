import { VercelRequest, VercelResponse } from "@vercel/node";
import { bot } from "./index";

export default async (req: VercelRequest, res: VercelResponse) => {
    try {
        const event = req.headers["x-github-event"];

        if (event === "push") {
            const payload = req.body;
            const repoName = payload.repository.full_name;
            const pusher = payload.pusher.name;
            const branch = payload.ref.split("/").pop();
            const compareUrl = payload.compare;
            const commits = payload.commits || [];
            const commitList = commits.map((c: any) => `- ${c.message}`).join("\n");
            const message = 
                `🚀 **New Commit Pushed!**\n\n` +
                `📂 **Repo:** [${repoName}](${payload.repository.html_url})\n` +
                `🌿 **Branch:** ${branch}\n` +
                `👤 **Pusher:** ${pusher}\n\n` +
                `**Commits:**\n${commitList}\n\n` +
                `[View Changes](${compareUrl})`;
            const myChatId = process.env.MY_CHAT_ID;

        if (myChatId) {
            await bot.api.sendMessage(myChatId, message, { parse_mode: "Markdown" });
        }
        }

        res.status(200).send("OK");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error processing webhook");
    }
};