import {Events, Guild} from "discord.js";
import {addGuild} from "../DB/DBHandler";

module.exports = {
    name: Events.GuildCreate,
    async execute(guild: Guild ) {
        //Set a default output channel for the Games
        // @ts-ignore
        const result = await addGuild(guild.id, guild.systemChannelId)
        console.log("New Server has been successfully added!")
    },
};