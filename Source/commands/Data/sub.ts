import {SlashCommandBuilder, ChannelType} from "discord.js";
import {addTeamSub, getServerInfo} from "../../DB/DBHandler";
import {findTeam} from "../../util/api_connection";
import {serverInfo} from "../../util/Types";
import {sendUpcomingGame} from "../../util/sendMessage";

module.exports = {
    data : new SlashCommandBuilder()
        .setName("sub")
        .setDescription("Subscribe to a Team")
        .addStringOption((option:any) =>
            option
                .setName("teamname")
                .setDescription("The Team you want to subscribe to (Lower/UpperCase Matters!)")
                .setRequired(true)
        ),
    async execute(interaction: any){
        const teamName: string[] = await findTeam(interaction.options.getString("teamname"));

        if(!teamName){
            interaction.reply("No Team with this Name has been found");
            return;
        }

        else{
            try{
                const serverInfo : serverInfo = await getServerInfo(interaction.guildId);
                let alreadySubbed : boolean = false;
                for(let i in serverInfo.teamSubs){
                    if(serverInfo.teamSubs[i].code == teamName[0]) alreadySubbed = true;
                }
                const channel = await interaction.client.channels.fetch(serverInfo.out)
                await channel.send(
                {embeds : [sendUpcomingGame({
                        Team1: "T1",
                        Team2: "T2",
                        "DateTime UTC": "LOLOL"
                })]})
                if(alreadySubbed){
                    interaction.reply(`You are already Subscribed to ${teamName[0]}!`);
                    return;
                }

                else {
                    await addTeamSub(teamName[0], interaction.guildId);
                    interaction.reply(`You subscribed to ${teamName[0]}!`)
                    return;
                }
            }

            catch (e) {
                console.log(e)
                interaction.reply("An Error has ocurred!")
            }
        }
    },
};