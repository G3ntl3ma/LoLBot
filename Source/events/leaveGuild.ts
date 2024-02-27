import {Events, Guild} from "discord.js";

import {deleteGuild} from "../DB/DBHandler";
require('discord.js');

module.exports = {
    name: Events.GuildDelete,
    async execute(guild: Guild ) {
        await deleteGuild(guild.id)
        console.log("Server has been sucessfully deleted!")
    },
};