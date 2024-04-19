"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const DBHandler_1 = require("../../DB/DBHandler");
const sendMessage_1 = require("../../util/sendMessage");
const DBHandler_2 = require("../../DB/DBHandler");
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName("sub")
        .setDescription("Subscribe to a Team")
        .addStringOption((option) => option
        .setName("teamname")
        .setDescription("The Team you want to subscribe to (Lower/UpperCase Matters!)")
        .setRequired(true)),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            let teamName = interaction.options.getString("teamname");
            let query = `https://lol.fandom.com/api.php?action=cargoquery&
        format=json&limit=max&tables=Teams&fields=Name&
        where=(Name = "${teamName}" OR Short = "${teamName}") AND isDisbanded = "false"`;
            let Team = [];
            try {
                const teams = yield fetch(query);
                const data = yield teams.json();
                for (let i in data.cargoquery) {
                    Team.push(data.cargoquery[i].title.Name);
                }
            }
            catch (e) {
                console.log("Query has failed");
            }
            if (Team.length === 0) {
                console.log("No Team found");
                yield interaction.reply("No Team with this Name has been found");
                return;
            }
            else {
                const serverInfo = yield (0, DBHandler_1.getServerInfo)(interaction.guildId);
                let alreadySubbed = false;
                for (let i in serverInfo.teamSubs) {
                    if (serverInfo.teamSubs[i].code == Team[0])
                        alreadySubbed = true;
                }
                console.log(alreadySubbed);
                if (alreadySubbed) {
                    console.log("Already subbed");
                    yield interaction.reply(`You are already Subscribed to ${Team[0]}!`);
                    return;
                }
                else {
                    yield (0, DBHandler_1.addTeamSub)(Team[0], interaction.guildId);
                    const channel = yield interaction.client.channels.fetch(serverInfo.out);
                    let games = yield (0, DBHandler_2.find)();
                    for (let i in games) {
                        if (games[i].Team1 == Team[0] || games[i].Team2 == Team[0]) {
                            //@ts-ignore
                            const sendEmbed = yield (0, sendMessage_1.sendUpcomingGame)(games[i], Team[0]);
                            yield channel.send({ embeds: [sendEmbed] });
                        }
                    }
                    console.log("subbed");
                    yield interaction.reply(`You subscribed to ${Team[0]}!`);
                    return;
                }
            }
        });
    },
};
