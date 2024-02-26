/**
 * Main file of the Bot
 */

import {Client, IntentsBitField} from "discord.js";
import {DISCORD_TOKEN} from "./config";

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent]
});

client.login(DISCORD_TOKEN)
client.once("ready", () => {
    console.log("Bot is ready!");
})