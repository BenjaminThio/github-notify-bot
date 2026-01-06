import { VercelRequest, VercelResponse } from "@vercel/node";
import { webhookCallback } from "grammy";
import { bot } from "./index";

bot.command("start", async (ctx) => {
    await ctx.reply(`Hello! I am ready to notify you.\nYour Chat ID is: \`${ctx.chat.id}\``, {
        parse_mode: "Markdown",
    });
});

bot.command("getid", async (ctx) => {
    const chatType = ctx.chat.type;
    const chatId = ctx.chat.id;

    await ctx.reply(`<b>Chat Type:</b> ${chatType}\n<b>Chat ID:</b> <code>${chatId}</code>`, {
        parse_mode: "HTML",
    });
});

export default async (req: VercelRequest, res: VercelResponse) => {
    return webhookCallback(bot, "http")(req, res);
};