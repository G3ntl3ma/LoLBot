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
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName("help")
        .setDescription("get an overview about all commands"),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const Embed = new discord_js_1.EmbedBuilder()
                .setColor(0x0099FF)
                .setDescription("Here is an Overview of all the Commands")
                .setTitle('Help')
                .setThumbnail('https://imgur.com/deu1U5t.jpeg')
                .addFields({ name: "out", value: `Set the channel where all upcoming Games and finished Games get posted in` }, { name: "show", value: `Show all current Subscriptions` }, { name: "sub", value: "give the full Name of a Team (G2 Esports) or it's short name (G2) to subscribe to it " }, { name: "unsub", value: "give the full Name of a Team (Fnatic) or it's short name (FNC) to unsubscribe from it" });
            yield interaction.reply({ embeds: [Embed] });
            return;
        });
    },
};
