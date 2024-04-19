import {SlashCommandBuilder} from "discord.js";
import {getServerInfo, deleteTeamSub} from "../../DB/DBHandler";
import {serverInfo} from "../../util/Types";

module.exports = {
    data : new SlashCommandBuilder()
        .setName("unsub")
        .setDescription("Unsubscribe from a Team")
        .addStringOption((option:any) =>
            option
                .setName("team")
                .setDescription("Unsubscribe from a Team")
                .setRequired(true)
        ),
    async execute(interaction: any){
        let teamName: string = interaction.options.getString("team")
        const serverInfo: serverInfo = await getServerInfo(interaction.guildId);

        let query: string = `https://lol.fandom.com/api.php?action=cargoquery&
        format=json&limit=max&tables=Teams&fields=Name&
        where=(Name = "${teamName}" OR Short = "${teamName}") AND isDisbanded = "false"`

        let Team: string[] = []
        try {
            const teams = await fetch(query);
            const data = await teams.json();
            for (let i in data.cargoquery) {
                console.log("Teams: ", data.cargoquery[i].title.Name)
                Team.push(data.cargoquery[i].title.Name)
            }
        } catch (e) {
            console.log("Query has failed")
        }

        if (Team.length === 0) {
            await interaction.reply("No Team with this Name has been found");
            return;
        } else {
            let isSubbed: boolean = false;
            for (let i in serverInfo.teamSubs) {
                console.log("Stored Data: ", serverInfo.teamSubs[i])
                if (serverInfo.teamSubs[i].code === Team[0]) isSubbed = true;
            }

            if (isSubbed) {
                console.log(Team[0])
                console.log(await deleteTeamSub(Team[0], interaction.guildId));
                await interaction.reply(`You unsubscribed from ${Team[0]}!`);
                return;
            } else {
                await interaction.reply(`You are not subscribed to ${Team[0]}!`);
                return;
            }
        }
    },
};