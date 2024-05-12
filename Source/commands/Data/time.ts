import {SlashCommandBuilder} from "discord.js";
import {LocaleOptions} from "../../util/Types";
import {getGuild} from "../../DB/DBHandler";


module.exports = {
    data : new SlashCommandBuilder()
        .setName("time")
        .setDescription("set the time zone of the current user")
        .addStringOption(option => option
            .setName("zone")
            .setRequired(true)
            .setDescription("Set the Local Zone to Convert Time correctly.")
        ),
    async execute(interaction: any){

        const zone: string = await interaction.options.getString("zone")
        if(Object.keys(LocaleOptions).includes(zone)) {
            await (await getGuild()).updateOne({_id: interaction.guildId}, {timezone: zone})
            await interaction.reply("The Locale has been successfully set!")
        }
        else{
            await interaction.reply(`${zone} is not a valid Zone! Use /zones to get all Zones`)
        }
        return
    },
};
