import {SlashCommandBuilder, Interaction} from "discord.js";
import {getGames, getGuild, getServerInfo} from "../../DB/DBHandler";
import {serverInfo} from "../../util/Types";
import {sendUpcomingGame} from "../../util/sendMessage";

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
        await interaction.deferReply();
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
            console.log("No Team found")
            await interaction.editReply("No Team with this Name has been found");
            return;
        } else {
            const serverInfo: serverInfo = await getServerInfo(interaction.guildId);
            let alreadySubbed: boolean = false;
            for (let i in serverInfo.teamSubs) {
                if (serverInfo.teamSubs[i].code == Team[0]) alreadySubbed = true;
            }
            console.log(alreadySubbed)
            if (alreadySubbed) {
                console.log("Already subbed")
                await interaction.editReply(`You are already Subscribed to ${Team[0]}!`);
                return;

            } else {
                await (await getGuild()).findOneAndUpdate({_id:interaction.guildId}, {$push: {teamSubs: {code: Team[0]}}});
                const channel = await interaction.client.channels.fetch(serverInfo.out)
                let games = await (await getGames()).find();
                for (let i in games) {

                    if (games[i].Team1 == Team[0] || games[i].Team2 == Team[0]) {
                        //@ts-ignore
                        const sendEmbed = await sendUpcomingGame(games[i], Team[0])
                        await channel.send(
                            {embeds: [sendEmbed]})
                    }
                }
                console.log("subbed")
                await interaction.editReply(`You subscribed to ${Team[0]}!`)
                return;
            }
        }
    },
};