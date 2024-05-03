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
        .setName("out")
        .setDescription("set the output Channel of the Bot")
        .addChannelOption((option) => option
        .setName("channelname")
        .setDescription("The Name of the Channel where the Bot writes the Output")
        .setRequired(true)
        .addChannelTypes(discord_js_1.ChannelType.GuildText)),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const channel = interaction.options.getChannel("channelname");
            yield (yield (0, DBHandler_1.getGuild)()).findOneAndUpdate({ _id: interaction.guildId }, { out: channel.id });
            yield interaction.reply("Outputchannel has been sucessfully set!");
            return;
        });
    },
};
