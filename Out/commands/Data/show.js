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
        .setName("show")
        .setDescription("Show all Subscriptions"),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            let guild = yield (0, DBHandler_1.getServerInfo)(interaction.guildId);
            let output = 'This are the Teams you are currently subscribed to:\n';
            for (let i in guild.teamSubs) {
                output = output + `${guild.teamSubs[i].code}\n`;
            }
            yield interaction.reply(output);
            return;
        });
    }
};
