"use strict";
/**
 * Main file of the Bot
 */
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const config_1 = require("./config");
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.IntentsBitField.Flags.Guilds,
        discord_js_1.IntentsBitField.Flags.GuildMessages,
        discord_js_1.IntentsBitField.Flags.MessageContent
    ]
});
client.login(config_1.DISCORD_TOKEN);
client.once("ready", () => {
    console.log("Bot is ready!");
});
