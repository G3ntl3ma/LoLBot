import {Events, Guild} from "discord.js";

import {getGuild} from "../DB/DBHandler";
require('discord.js');

module.exports = {
    name: Events.GuildDelete,
    async execute(guild: Guild ) {
        await (await getGuild()).deleteOne({_id: guild.id})
        console.log("Server has been sucessfully deleted!")
    },
};