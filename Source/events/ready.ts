import {Events, Client} from "discord.js";

require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client: Client ) {
        // @ts-ignore
        console.log(`Ready! Logged in as ${client.user.tag}`);
    },
};