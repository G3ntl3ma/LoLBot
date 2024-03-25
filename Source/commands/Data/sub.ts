import {SlashCommandBuilder, ChannelType} from "discord.js";
import {addTeamSub, getServerInfo} from "../../DB/DBHandler";
import {serverInfo} from "../../util/Types";
import {sendUpcomingGame} from "../../util/sendMessage";
import {find} from "../../DB/DBHandler"

module.exports = {
    data: new SlashCommandBuilder()
        .setName("sub")
        .setDescription("Subscribe to a Team")
        .addStringOption((option: any) =>
            option
                .setName("teamname")
                .setDescription("The Team you want to subscribe to (Lower/UpperCase Matters!)")
                .setRequired(true)
        ),
    async execute(interaction: any) {
        let teamName = interaction.options.getString("teamname")
        let query: string = `https://lol.fandom.com/api.php?action=cargoquery&
        format=json&limit=max&tables=Teams&fields=Name&
        where=(Name = "${teamName}" OR Short = "${teamName}") AND isDisbanded = "false"`

        let Team: string[] = []
        try {
            const teams = await fetch(query);
            const data = await teams.json();

            for (let i in data.cargoquery) {
                Team.push(data.cargoquery[i].title.Name)
            }
        } catch (e) {
            console.log("Query has failed")
        }

        if (Team.length === 0) {
            interaction.reply("No Team with this Name has been found");
            return;
        } else {
            const serverInfo: serverInfo = await getServerInfo(interaction.guildId);
            let alreadySubbed: boolean = false;
            for (let i in serverInfo.teamSubs) {
                if (serverInfo.teamSubs[i].code == Team[0]) alreadySubbed = true;
            }

            if (alreadySubbed) {
                interaction.reply(`You are already Subscribed to ${Team[0]}!`);
                return;
            } else {
                await addTeamSub(Team[0], interaction.guildId);

                const channel = await interaction.client.channels.fetch(serverInfo.out)
                let games = await find();
                for (let i in games) {


                    if (games[i].Team1 == Team[0] || games[i].Team2 == Team[0]) {
                        //@ts-ignore
                        const sendEmbed = await sendUpcomingGame(games[i], Team[0])
                        await channel.send(
                            {embeds: [sendEmbed]})
                    }
                }
                interaction.reply(`You subscribed to ${Team[0]}!`)
                return;
            }
        }
    },
};