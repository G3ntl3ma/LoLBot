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
const util_1 = require("../../util/util");
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
            yield interaction.deferReply();
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
                yield interaction.editReply("No Team with this Name has been found");
                return;
            }
            else {
                const serverInfo = yield (0, DBHandler_1.getServerInfo)(interaction.guildId);
                let alreadySubbed = false;
                for (let i in serverInfo.teamSubs) {
                    if (serverInfo.teamSubs[i] == Team[0])
                        alreadySubbed = true;
                }
                console.log(alreadySubbed);
                if (alreadySubbed) {
                    console.log("Already subbed");
                    yield interaction.editReply(`You are already Subscribed to ${Team[0]}!`);
                    return;
                }
                else {
                    let guild = yield (0, DBHandler_1.getGuild)();
                    yield guild.findOneAndUpdate({ _id: interaction.guildId }, { $push: { teamSubs: Team[0] } });
                    const channel = yield interaction.client.channels.fetch(serverInfo.out);
                    let games = yield (yield (0, DBHandler_1.getGames)()).find();
                    for (let i in games) {
                        if (games[i].Team1 == Team[0] || games[i].Team2 == Team[0]) {
                            let guildInfo = (yield guild.findOne({ _id: interaction.guildId }));
                            let timeZone = "";
                            timeZone = guildInfo.timezone;
                            console.log(timeZone);
                            //@ts-ignore
                            const sendEmbed = yield (0, sendMessage_1.sendUpcomingGame)(games[i], Team[0], (0, util_1.localDateString)(games[i]["DateTime UTC"], timeZone));
                            yield channel.send({ embeds: [sendEmbed] });
                        }
                    }
                    console.log("subbed");
                    yield interaction.editReply(`You subscribed to ${Team[0]}!`);
                    return;
                }
            }
        });
    },
};
