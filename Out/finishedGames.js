"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const worker_threads_1 = require("worker_threads");
const updateGameFiles_1 = require("./util/updateGameFiles");
const config_1 = require("./config");
const DBHandler_1 = require("./DB/DBHandler");
let finishedGamesInterval = "";
// @ts-ignore
worker_threads_1.parentPort.on("message", () => {
    DBHandler_1.connect.connect().then(() => {
        const client = new discord_js_1.Client({
            intents: [
                discord_js_1.IntentsBitField.Flags.Guilds,
                discord_js_1.IntentsBitField.Flags.GuildMessages,
                discord_js_1.IntentsBitField.Flags.MessageContent
            ]
        });
        client.login(config_1.DISCORD_TOKEN);
        (0, updateGameFiles_1.updateFinishedGames)(client).then(() => finishedGamesInterval = setInterval(updateGameFiles_1.updateFinishedGames, 3600000, client));
        console.log("Finished Games Worker is Working");
    });
});
