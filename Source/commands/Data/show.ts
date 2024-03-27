import {SlashCommandBuilder} from "discord.js";
import {getServerInfo} from "../../DB/DBHandler";

module.exports = {
    data : new SlashCommandBuilder()
        .setName("show")
        .setDescription("Show all Subscriptions"),
    async execute(interaction: any) {
        let guild = await getServerInfo(interaction.guildId)
        let output :string = 'This are the Teams you are currently subscribed to:\n'
        for(let i in guild.teamSubs){
            output = output + `${guild.teamSubs[i].code}\n`
        }
        interaction.reply(output)
    }
};