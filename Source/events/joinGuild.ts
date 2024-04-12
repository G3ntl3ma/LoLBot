import {Events, Guild} from "discord.js";
import {addGuild} from "../DB/DBHandler";

module.exports = {
    name: Events.GuildCreate,
    async execute(guild: Guild ) {
        // @ts-ignore
        const result = await addGuild(guild.id, guild.channels.cache.filter(c => c.type === 'text').find(x => x.position == 0))
        console.log("New Server has been successfully added!")
    },
};