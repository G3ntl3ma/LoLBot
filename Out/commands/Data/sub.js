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
const api_connection_1 = require("../../util/api_connection");
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
            const teamName = yield (0, api_connection_1.findTeam)(interaction.options.getString("teamname"));
            if (teamName.length === 0) {
                interaction.reply("No Team with this Name has been found");
                return;
            }
            else {
                try {
                    const serverInfo = yield (0, DBHandler_1.getServerInfo)(interaction.guildId);
                    let alreadySubbed = false;
                    for (let i in serverInfo.teamSubs) {
                        if (serverInfo.teamSubs[i].code == teamName[0])
                            alreadySubbed = true;
                    }
                    if (alreadySubbed) {
                        interaction.reply(`You are already Subscribed to ${teamName[0]}!`);
                        return;
                    }
                    else {
                        yield (0, DBHandler_1.addTeamSub)(teamName[0], interaction.guildId);
                        const channel = yield interaction.client.channels.fetch(serverInfo.out);
                        let games = yield (0, DBHandler_2.find)();
                        console.log(games[0]);
                        for (let i in games) {
                            console.log(games[i].Team1);
                            if (games[i].Team1 == teamName[0] || games[i].Team2 == teamName[0]) {
                                console.log(games[i]);
                                //@ts-ignore
                                const sendEmbed = yield (0, sendMessage_1.sendUpcomingGame)(games[i], teamName[0]);
                                yield channel.send({ embeds: [sendEmbed] });
                            }
                        }
                        interaction.reply(`You subscribed to ${teamName[0]}!`);
                        return;
                    }
                }
                catch (e) {
                    console.log(e);
                    interaction.reply("An Error has ocurred!");
                }
            }
        });
    },
};
