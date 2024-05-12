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
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName("zones")
        .setDescription("Get an Overview of all Possible Timezones"),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            let replyString = "Here are all Locale Options: \n";
            for (let i in Types_1.LocaleOptions) {
                // @ts-ignore
                replyString = replyString + `${i}  ${Types_1.LocaleOptions[i]}\n`;
            }
            yield interaction.reply(replyString);
            return;
        });
    },
};
