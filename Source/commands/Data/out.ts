import {SlashCommandBuilder, ChannelType} from "discord.js";
import {getGuild} from "../../DB/DBHandler";

module.exports = {
    data : new SlashCommandBuilder()
        .setName("out")
        .setDescription("set the output Channel of the Bot")
        .addChannelOption((option: any) =>
             option
                 .setName("channelname")
                 .setDescription("The Name of the Channel where the Bot writes the Output")
                 .setRequired(true)
                 .addChannelTypes(ChannelType.GuildText)
        ),
    async execute(interaction: any){
        const channel = interaction.options.getChannel("channelname");
        await (await getGuild()).findOneAndUpdate({_id: channel.id}, {out: interaction.guildId});
        await interaction.reply("Outputchannel has been sucessfully set!");
        return;
    },
};