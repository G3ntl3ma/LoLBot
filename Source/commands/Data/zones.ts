import {SlashCommandBuilder} from "discord.js";

module.exports = {
    data : new SlashCommandBuilder()
        .setName("zones")
        .setDescription("Get an Overview of all Possible Timezones"),
    async execute(interaction: any){

        let replyString = "Here are some Time Zones: \n" +
            "Europe/Berlin \n" +
            "Europe/Paris \n" +
            "America/New_York \n" +
            "America/Los_Angeles \n" +
            "Asia/Seoul \n" +
            "If you can't find your Time zone use \n" +
            "https://www.timezoneconverter.com/cgi-bin/findzone";

        await interaction.reply(replyString);
        return
    },
};
