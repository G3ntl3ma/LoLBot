import {SlashCommandBuilder} from "discord.js";
module.exports = {
    data : new SlashCommandBuilder()
        .setName("unsub")
        .setDescription("reply pong to a user"),
    async execute(interaction: any){
        await interaction.reply("Pong!")
    },
};