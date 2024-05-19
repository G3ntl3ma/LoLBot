import {EmbedBuilder, SlashCommandBuilder} from "discord.js";
module.exports = {
    data : new SlashCommandBuilder()
        .setName("help")
        .setDescription("get an overview about all commands"),
    async execute(interaction: any){
        const Embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setDescription("Here is an Overview of all the Commands")
            .setTitle('Help')
            .setThumbnail('https://imgur.com/deu1U5t.jpeg')
            .addFields(
                { name: "out", value: `Set the channel where all upcoming Games and finished Games get posted in` },
                {name : "show", value:`Show all current Subscriptions`},
                {name: "sub", value: "Give the full Name of a Team (G2 Esports) or it's short name (G2) to subscribe to it "},
                {name: "unsub", value: "Give the full Name of a Team (Fnatic) or it's short name (FNC) to unsubscribe from it"},
                {name: "zones", value: "Get more info about how the Time Zones for LoLBot works"},
                {name: "time", value: "Set the Time Zone for the Server"}
            )
        await interaction.reply({embeds: [Embed]})
        return
    },
};
