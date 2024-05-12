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
const Types_1 = require("../../util/Types");
const DBHandler_1 = require("../../DB/DBHandler");
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName("time")
        .setDescription("set the time zone of the current user")
        .addStringOption(option => option
        .setName("zone")
        .setRequired(true)
        .setDescription("Set the Local Zone to Convert Time correctly.")),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const zone = yield interaction.options.getString("zone");
            if (Object.keys(Types_1.LocaleOptions).includes(zone)) {
                yield (yield (0, DBHandler_1.getGuild)()).updateOne({ _id: interaction.guildId }, { timezone: zone });
                yield interaction.reply("The Locale has been successfully set!");
            }
            else {
                yield interaction.reply(`${zone} is not a valid Zone! Use /zones to get all Zones`);
            }
            return;
        });
    },
};
