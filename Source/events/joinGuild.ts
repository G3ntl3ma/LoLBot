import {Events, Guild} from "discord.js";
import {getGuild} from "../DB/DBHandler";

module.exports = {
    name: Events.GuildCreate,
    async execute(guild: Guild ) {
        //Set a default output channel for the Games
        // @ts-ignore
        const guildConfig = await getGuild();
        const config = new guildConfig({
            _id: guild.id,
            out: guild.systemChannelId,
            timezone: "UTC"
        })
        await config.save()
        console.log("New Server has been successfully added!")
    },
};