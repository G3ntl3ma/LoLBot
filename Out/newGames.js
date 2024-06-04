"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DBHandler_1 = require("./DB/DBHandler");
const updateGameFiles_1 = require("./util/updateGameFiles");
const worker_threads_1 = require("worker_threads");
const config_1 = require("./config");
const discord_js_1 = require("discord.js");
const discord_js_2 = require("discord.js");
//Connect to Database
let newGamesInterval = "";
// @ts-ignore
worker_threads_1.parentPort.on('message', () => {
    DBHandler_1.connect.connect().then(res => {
        const client = new discord_js_1.Client({
            intents: [
                discord_js_2.IntentsBitField.Flags.Guilds,
                discord_js_2.IntentsBitField.Flags.GuildMessages,
                discord_js_2.IntentsBitField.Flags.MessageContent
            ]
        });
        client.login(config_1.DISCORD_TOKEN);
        (0, updateGameFiles_1.findNewGames)(client)
            .then(res => newGamesInterval = setInterval(updateGameFiles_1.findNewGames, 3600000, client));
        console.log("newGames Worker is Working");
    });
});
