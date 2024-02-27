"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
require('discord.js');
module.exports = {
    name: discord_js_1.Events.ClientReady,
    once: true,
    execute(client) {
        // @ts-ignore
        console.log(`Ready! Logged in as ${client.user.tag}`);
    },
};
