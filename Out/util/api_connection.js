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
exports.retrievePicUrl = exports.findTeam = exports.getTeamGames = exports.getLeagueGames = void 0;
const config_1 = require("../config");
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
function findTeam(team) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = config_1.BASE_URL + `Teams&fields=Short&where= (Name = "${team}" OR Short = "${team}") AND isDisbanded = "false"`; // OR (Short LIKE"%${team}% OR Medium Like(%${team}%)")
        let Team = new Array();
        console.log(query);
        try {
            const teams = yield fetch(query);
            const data = yield teams.json();
            console.log(data.cargoquery[0].title);
            for (let i in data.cargoquery) {
                Team.push(data.cargoquery[i].title.Short);
            }
        }
        catch (e) {
            console.log("Query has failed");
        }
        return Team;
    });
}
exports.findTeam = findTeam;
/**
 * Get the Url of a Team Logo to set as a Source
 * @param team the Team of which you want the Logo of
 */
function retrievePicUrl(team) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const info = yield fetch(`https://lol.fandom.com/api.php?action=query&format=json&prop=imageinfo&titles=File:${team}logo%20square.png&iiprop=url`);
            const data = yield info.json();
            for (let i in data["query"]["pages"]) {
                return data["query"]["pages"][i]["imageinfo"][0]["url"];
            }
        }
        catch (e) {
            console.log(e);
            return "";
        }
    });
}
exports.retrievePicUrl = retrievePicUrl;
retrievePicUrl("T1").then(url => console.log(url));
retrievePicUrl("JD Gaming").then(url => console.log(url));
