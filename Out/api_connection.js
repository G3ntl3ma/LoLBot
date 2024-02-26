"use strict";
/**
 * This File handles all requests to the leaguepedia API
 */
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
exports.getTeamGames = exports.getLeagueGames = void 0;
const config_1 = require("./config");
/**
 *  returns all Games in the League scheduled on the Date
 * @param league String with the Name of the League
 * @param date The Date of the Games in Form YYYY-MM-DD
 */
function getLeagueGames(league, date) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = config_1.BASE_URL +
            `ScoreboardGames&fields=Team1,Team2, DateTime_UTC&where=DateTime_UTC like "${date}%" and Tournament like "${league} %"`;
        let games = new Array();
        try {
            const matches = yield fetch(query);
            const data = yield matches.json();
            for (let i in data.cargoquery) {
                let game = {
                    Team1: data.cargoquery[i].title.Team1,
                    Team2: data.cargoquery[i].title.Team2,
                    'DateTime UTC': data.cargoquery[i].title["DateTime UTC"]
                };
                games.push(game);
            }
        }
        catch (e) {
            console.log("Query has failed: " + e);
        }
        return games;
    });
}
exports.getLeagueGames = getLeagueGames;
/**
 * return all Games of the specified Team on the date
 * @param team The Team
 * @param date YYYY-MM-DD HH:MM:SS Any Part from the end can be missing
 */
function getTeamGames(team, date) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = config_1.BASE_URL +
            `ScoreboardGames&fields=Team1,Team2, DateTime_UTC&where=DateTime_UTC like "${date}%" AND (Team1 like "${team}%" or Team2 like "${team}%")`;
        console.log(query);
        let games = new Array();
        try {
            const matches = yield fetch(query);
            const data = yield matches.json();
            for (let i in data.cargoquery) {
                let game = {
                    Team1: data.cargoquery[i].title.Team1,
                    Team2: data.cargoquery[i].title.Team2,
                    'DateTime UTC': data.cargoquery[i].title["DateTime UTC"]
                };
                games.push(game);
            }
        }
        catch (e) {
            console.log("Query has failed: " + e);
        }
        return games;
    });
}
exports.getTeamGames = getTeamGames;
