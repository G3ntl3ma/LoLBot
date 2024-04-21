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
exports.sendFinishedGame = exports.sendUpcomingGame = void 0;
const discord_js_1 = require("discord.js");
function sendUpcomingGame(game, team) {
    return __awaiter(this, void 0, void 0, function* () {
        let logoURL = "https://imgur.com/deu1U5t.jpeg";
        const info = yield fetch(`https://lol.fandom.com/api.php?action=query&format=json&prop=imageinfo&titles=File:${team}logo%20square.png&iiprop=url`);
        const data = yield info.json();
        for (let i in data["query"]["pages"]) {
            logoURL = data["query"]["pages"][i]["imageinfo"][0]["url"];
        }
        const Embed = new discord_js_1.EmbedBuilder()
            .setColor(0x0099FF)
            .setDescription("Upcoming Game from one of your Subscriptions")
            .setTitle('Upcoming Game:')
            .setThumbnail('https://imgur.com/deu1U5t.jpeg')
            .setImage(logoURL)
            .addFields({ name: "Teams", value: `${game.Team1} vs ${game.Team2}` }, { name: "Time:", value: `${game["DateTime UTC"]} UTC` });
        return Embed;
    });
}
exports.sendUpcomingGame = sendUpcomingGame;
function sendFinishedGame(game) {
    return __awaiter(this, void 0, void 0, function* () {
        const Embed = new discord_js_1.EmbedBuilder()
            .setColor(0x0099FF)
            .setDescription("A Game has finished")
            .setTitle('Finished Game')
            .setThumbnail('https://imgur.com/deu1U5t.jpeg')
            .addFields({ name: "Teams", value: `${game.Team1} vs ${game.Team2}` }, { name: "Time:", value: `${game["DateTime UTC"]} UTC` }, { name: "Winner", value: game["WinTeam"] });
        return Embed;
    });
}
exports.sendFinishedGame = sendFinishedGame;
