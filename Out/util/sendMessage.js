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
function sendUpcomingGame(game, team, time) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(time);
        let logoURL = "https://imgur.com/deu1U5t.jpeg";
        const info = yield fetch(`https://lol.fandom.com/api.php?action=query&format=json&prop=imageinfo&titles=File:${team}logo%20square.png&iiprop=url`);
        const data = yield info.json();
        for (let i in data["query"]["pages"]) {
            logoURL = data["query"]["pages"][i]["imageinfo"][0]["url"];
        }
        const Embed = new discord_js_1.EmbedBuilder()
            .setColor(0x0099FF)
            .setDescription(`${game.Team1} vs ${game.Team2}`)
            .setTitle('Upcoming Game:')
            .setThumbnail('https://imgur.com/deu1U5t.jpeg')
            .setImage(logoURL)
            .addFields({ name: "Time:", value: time });
        return Embed;
    });
}
exports.sendUpcomingGame = sendUpcomingGame;
function sendFinishedGame(game, time) {
    return __awaiter(this, void 0, void 0, function* () {
        let Winner = "";
        if (game.WinTeam = undefined) {
            Winner = game.WinTeam;
        }
        else if (game.Winner === "1") {
            Winner = game.Team1;
        }
        else {
            Winner = game.Team2;
        }
        const vsString = `${game.Team1} vs ${game.Team2}`;
        let logoURL = "https://imgur.com/deu1U5t.jpeg";
        const info = yield fetch(`https://lol.fandom.com/api.php?action=query&format=json&prop=imageinfo&titles=File:${Winner}logo%20square.png&iiprop=url`);
        const data = yield info.json();
        for (let i in data["query"]["pages"]) {
            logoURL = data["query"]["pages"][i]["imageinfo"][0]["url"];
        }
        const Embed = new discord_js_1.EmbedBuilder()
            .setColor(0x0099FF)
            .setDescription(vsString)
            .setTitle('Finished Game')
            .setThumbnail('https://imgur.com/deu1U5t.jpeg')
            .addFields({ name: "Time:", value: time }, { name: "Winner", value: Winner })
            .setImage(logoURL);
        return Embed;
    });
}
exports.sendFinishedGame = sendFinishedGame;
