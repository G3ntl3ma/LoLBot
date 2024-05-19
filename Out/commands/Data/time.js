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
const util_1 = require("../../util/util");
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
            const GMTZones = ["GMT+0", "GMT+1", "GMT+2", "GMT+3", "GMT+4", "GMT+5", "GMT+6", "GMT+7", "GMT+8", "GMT+9", "GMT+10", "GMT+11", "GMT+12",
                "GMT-0", "GMT-1", "GMT-2", "GMT-3", "GMT-4", "GMT-5", "GMT-6", "GMT-7", "GMT-8", "GMT-9", "GMT-10", "GMT-11", "GMT-12", "GMT-13", "GMT-14"
            ];
            if (GMTZones.indexOf(zone) !== -1) {
                yield (yield (0, DBHandler_1.getGuild)()).updateOne({ _id: interaction.guildId }, { timezone: `Etc/${zone}` });
                yield interaction.reply("The Time Zone has been set!");
                return;
            }
            if ((0, util_1.allTimeZones)().indexOf(zone) !== -1) {
                yield (yield (0, DBHandler_1.getGuild)()).updateOne({ _id: interaction.guildId }, { timezone: zone });
                yield interaction.reply("The Time Zone has been successfully set!");
            }
            else {
                yield interaction.reply(`${zone} is not a valid Time Zone! Use /zones to find out more`);
            }
            return;
        });
    },
};
