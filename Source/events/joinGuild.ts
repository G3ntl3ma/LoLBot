import {Events, Guild} from "discord.js";
import {addGuild} from "../DB/DBHandler";

module.exports = {
    name: Events.GuildCreate,
    async execute(guild: Guild ) {
        console.log(guild.id)
        const result = await addGuild(guild.id)
        console.log("New Server has been successfully added!")
    },
};