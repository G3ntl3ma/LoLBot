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
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName("unsub")
        .setDescription("Unsubscribe from a Team")
        .addStringOption((option) => option
        .setName("team")
        .setDescription("Unsubscribe from a Team")
        .setRequired(true)),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            let teamName = interaction.options.getString("team");
            const serverInfo = yield (0, DBHandler_1.getServerInfo)(interaction.guildId);
            let query = `https://lol.fandom.com/api.php?action=cargoquery&
        format=json&limit=max&tables=Teams&fields=Name&
        where=(Name = "${teamName}" OR Short = "${teamName}") AND isDisbanded = "false"`;
            let Team = [];
            try {
                const teams = yield fetch(query);
                const data = yield teams.json();
                for (let i in data.cargoquery) {
                    console.log("Teams: ", data.cargoquery[i].title.Name);
                    Team.push(data.cargoquery[i].title.Name);
                }
            }
            catch (e) {
                console.log("Query has failed");
            }
            if (Team.length === 0) {
                yield interaction.reply("No Team with this Name has been found");
                return;
            }
            else {
                let isSubbed = false;
                for (let i in serverInfo.teamSubs) {
                    console.log("Stored Data: ", serverInfo.teamSubs[i]);
                    if (serverInfo.teamSubs[i].code === Team[0])
                        isSubbed = true;
                }
                if (isSubbed) {
                    console.log(Team[0]);
                    yield (yield (0, DBHandler_1.getGuild)()).findOneAndUpdate({ _id: interaction.guildId }, { $pull: { 'teamSubs': Team[0] } });
                    yield interaction.reply(`You unsubscribed from ${Team[0]}!`);
                    return;
                }
                else {
                    yield interaction.reply(`You are not subscribed to ${Team[0]}!`);
                    return;
                }
            }
        });
    },
};
