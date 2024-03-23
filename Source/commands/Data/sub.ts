import {SlashCommandBuilder, ChannelType} from "discord.js";
import {addTeamSub, getServerInfo} from "../../DB/DBHandler";
import {findTeam, retrievePicUrl} from "../../util/api_connection";
import {serverInfo} from "../../util/Types";
import {sendUpcomingGame} from "../../util/sendMessage";
import {find} from "../../DB/DBHandler"

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
        if(teamName.length === 0){
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

                if(alreadySubbed){
                    interaction.reply(`You are already Subscribed to ${teamName[0]}!`);
                    return;
                }

                else {
                    await addTeamSub(teamName[0], interaction.guildId);

                    const channel = await interaction.client.channels.fetch(serverInfo.out)
                    let games = await find();
                    for (let i in games) {
                        console.log(games[i].Team1)

                        if (games[i].Team1 == teamName[0] || games[i].Team2 == teamName[0]) {
                            console.log(games[i])
                            //@ts-ignore
                            const sendEmbed = await sendUpcomingGame(games[i], teamName[0])
                            await channel.send(
                                {embeds: [sendEmbed]})
                        }
                    }
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