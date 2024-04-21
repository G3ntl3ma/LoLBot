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
exports.updateFinishedGames = exports.findNewGames = void 0;
const serverConfig_1 = require("../DB/serverConfig");
const DBHandler_1 = require("../DB/DBHandler");
const sendMessage_1 = require("./sendMessage");
function findNewGames() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i <= 30; i++) {
            let date = new Date();
            date.setDate(date.getUTCDate() + i);
            const info = yield fetch(`https://lol.fandom.com/api.php?action=cargoquery&
            format=json&limit=max&tables=MatchSchedule&fields=Team1,Team2, DateTime_UTC, Winner&
            where=DateTime_UTC like '${date.toISOString().substring(0, 10)}%'`);
            const data = yield info.json();
            let games = [];
            for (let i in data.cargoquery) {
                if (typeof (data.cargoquery[i].title["DateTime UTC"]) != "undefined") {
                    games.push({
                        Team1: data.cargoquery[i].title.Team1,
                        Team2: data.cargoquery[i].title.Team2,
                        'DateTime UTC': data.cargoquery[i].title["DateTime UTC"],
                        Tournament: "",
                        'Winning Team': data.cargoquery[i].title.Winner
                    });
                }
            }
            for (let i in games) {
                const foundGame = yield (yield (0, DBHandler_1.findGame)()).find(games[i]);
                if (foundGame.length == 0 && foundGame.Team1 != "TBD" && foundGame.Team2 != "TBD") {
                    let newGame = new serverConfig_1.gameConfig(games[i]);
                    yield newGame.save();
                }
            }
        }
        console.log("New Games Iteration Finished");
    });
}
exports.findNewGames = findNewGames;
/**
 * When a Game finishes, a Message of the Teams get sent to all Subscribers and the Game gets Deleted
 */
function updateFinishedGames(client) {
    return __awaiter(this, void 0, void 0, function* () {
        //get all Games with a Date between the Past and the Last Day
        let newDate = new Date();
        newDate.setDate(newDate.getUTCDate());
        let mutatedNewDate = newDate.toISOString().substring(0, 4) +
            newDate.toISOString().substring(5, 7) +
            newDate.toISOString().substring(8, 10) +
            newDate.toISOString().substring(11, 13) +
            newDate.toISOString().substring(14, 16) +
            newDate.toISOString().substring(17, 19);
        let oldDate = new Date();
        oldDate.setDate(oldDate.getUTCDate() - 1);
        const mutatedOldDate = oldDate.toISOString().substring(0, 4) +
            oldDate.toISOString().substring(5, 7) +
            oldDate.toISOString().substring(8, 10) +
            oldDate.toISOString().substring(11, 13) +
            oldDate.toISOString().substring(14, 16) +
            oldDate.toISOString().substring(17, 19);
        let fetchRequest = `https://lol.fandom.com/api.php?action=cargoquery&
    format=json&limit=max&tables=ScoreboardGames&fields=WinTeam,Team1,Team2,DateTime_UTC, Tournament&
    where=DateTime_UTC <= '${mutatedNewDate}' AND DateTime_UTC >= '${mutatedOldDate}'`;
        const finished = yield fetch(fetchRequest);
        let date = yield finished.json();
        const loggedGames = yield (0, DBHandler_1.find)();
        let filter = [];
        for (let j of date.cargoquery) {
            for (let i of loggedGames) {
                if (i["DateTime UTC"] === j["title"]["DateTime UTC"] &&
                    i["Team1"] === j["title"]["Team1"] &&
                    i["Team2"] === j["title"]["Team2"]) {
                    (0, DBHandler_1.deleteGame)(i["_id"].toString());
                    filter.push(j);
                }
            }
        }
        console.log(filter);
        const Guilds = yield (0, DBHandler_1.getAllGuilds)();
        for (let game in filter) {
            for (let guild in Guilds) {
                for (let team in Guilds[guild]["teamSubs"]) {
                    if (filter[game].title.Team1 === Guilds[guild]["teamSubs"][team].code ||
                        filter[game].title.Team2 === Guilds[guild]["teamSubs"][team].code) {
                        console.log("Match Found");
                        let currentGuild = yield client.guilds.fetch(Guilds[guild]["_id"]);
                        console.log(Guilds[guild]["_id"]);
                        console.log(Guilds[guild].out);
                        //@ts-ignore
                        let channel = yield client.channels.fetch(Guilds[guild].out);
                        yield channel.send({ embeds: [yield (0, sendMessage_1.sendFinishedGame)(filter[game].title)] });
                    }
                }
            }
        }
        console.log("Finished Games iteration Finished");
    });
}
exports.updateFinishedGames = updateFinishedGames;
