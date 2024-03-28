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
                        Winner: data.cargoquery[i].title.Winner
                    });
                }
            }
            for (let i in games) {
                const foundGame = yield (0, DBHandler_1.findGame)(games[i]);
                if (foundGame.length == 0 && foundGame.Team1 != "TBD" && foundGame.Team2 != "TBD") {
                    let newGame = new serverConfig_1.gameConfig(games[i]);
                    yield newGame.save();
                }
            }
        }
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
        let fetchrequest = `https://lol.fandom.com/api.php?action=cargoquery&
    format=json&limit=max&tables=ScoreboardGames&fields=WinTeam,Team1,Team2,DateTime_UTC, Tournament&
    where=DateTime_UTC <= '${mutatedNewDate}' AND DateTime_UTC >= '${mutatedOldDate}'`;
        const finished = yield fetch(fetchrequest);
        let date = yield finished.json();
        for (let i in date.cargoquery) {
            console.log(date.cargoquery[i].title);
        }
        const loggedGames = yield (0, DBHandler_1.find)();
        let filter = date.cargoquery.filter((element) => {
            for (let i in loggedGames) {
                if (loggedGames[i]["DateTime UTC"] === element["title"]["DateTime UTC"] && loggedGames[i]["Team1"] == element["title"]["Team1"] && loggedGames[i]["Team2"] === element["title"]["Team2"]) {
                    return true;
                }
            }
            return false;
        });
        const Guilds = yield (0, DBHandler_1.getAllGuilds)();
        for (let i in filter) {
        }
    });
}
exports.updateFinishedGames = updateFinishedGames;
