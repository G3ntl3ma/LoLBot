/**
 * Main file of the Bot
 */

import {Client, IntentsBitField} from "discord.js";

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent]
});

client.once("ready", ()=> {
    console.log("Bot is ready!");
})