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
        .setName("zones")
        .setDescription("Get an Overview of all Possible Timezones"),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            let replyString = "Here are some Time Zones: \n" +
                "Europe/Berlin \n" +
                "Europe/Paris \n" +
                "America/New_York \n" +
                "America/Los_Angeles \n" +
                "Asia/Seoul \n" +
                "or use GMT Time Zones like GMT+0" +
                "If you can't find your Time zone use \n" +
                "https://www.timezoneconverter.com/cgi-bin/findzone";
            yield interaction.reply(replyString);
            return;
        });
    },
};
