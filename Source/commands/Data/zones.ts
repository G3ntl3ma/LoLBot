import {SlashCommandBuilder} from "discord.js";
import {LocaleOptions} from "../../util/Types"

module.exports = {
    data : new SlashCommandBuilder()
        .setName("zones")
        .setDescription("Get an Overview of all Possible Timezones"),
    async execute(interaction: any){

        let replyString = "Here are all Locale Options: \n";

        for(let i in LocaleOptions){
            // @ts-ignore
            replyString = replyString + `${i}  ${LocaleOptions[i]}\n`
        }

        await interaction.reply(replyString);
        return
    },
};
