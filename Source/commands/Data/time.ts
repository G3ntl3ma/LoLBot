import {SlashCommandBuilder} from "discord.js";
import {allTimeZones} from "../../util/util";
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
        const GMTZones =
            ["GMT+0", "GMT+1", "GMT+2", "GMT+3", "GMT+4", "GMT+5", "GMT+6", "GMT+7", "GMT+8", "GMT+9", "GMT+10", "GMT+11", "GMT+12",
            "GMT-0", "GMT-1", "GMT-2", "GMT-3", "GMT-4", "GMT-5", "GMT-6", "GMT-7", "GMT-8", "GMT-9", "GMT-10", "GMT-11", "GMT-12", "GMT-13", "GMT-14"
            ]
        if(GMTZones.indexOf(zone) !== -1){
            await (await getGuild()).updateOne({_id: interaction.guildId}, {timezone:`Etc/${zone}`})
            await interaction.reply("The Time Zone has been set!")
            return
        }
        if(allTimeZones().indexOf(zone) !== -1) {
            await (await getGuild()).updateOne({_id: interaction.guildId}, {timezone: zone})
            await interaction.reply("The Time Zone has been successfully set!")
        }
        else{
            await interaction.reply(`${zone} is not a valid Time Zone! Use /zones to find out more`)
        }
        return
    },
};
