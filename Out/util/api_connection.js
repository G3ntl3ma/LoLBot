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
exports.getGames = exports.retrievePicUrl = exports.findTeam = void 0;
const config_1 = require("../config");
/*
/**
 *  returns all Games in the League scheduled on the Date
 * @param league String with the Name of the League
 * @param date The Date of the Games in Form YYYY-MM-DD
 *
export async function getLeagueGames(league: string, date: string) {
    let query: string = BASE_URL +
        `ScoreboardGames&fields=Team1,Team2, DateTime_UTC, Tournament&where=DateTime_UTC like "${date}%" and Tournament like "${league} %"`;
    let games: game[] = new Array<game>()
    try {
        const matches = await fetch(query);
        const data = await matches.json();
        for (let i in data.cargoquery) {
            console.log(data.cargoquery[i].title)
            let game: game = {
                Team1: data.cargoquery[i].title.Team1,
                Team2: data.cargoquery[i].title.Team2,
                'DateTime UTC': data.cargoquery[i].title["DateTime UTC"],
                Tournament : data.cargoquery[i].title.Tournament
            }
            games.push(game)
        }
    } catch (e: any) {
        console.log("Query has failed: " + e);
    }
    return games
}
*/
/*
 * return all Games of the specified Team on the date
 * @param team The Team
 * @param date YYYY-MM-DD HH:MM:SS Any Part from the end can be missing
 *
export async function getTeamGames(team: string, date: string) {
    let query: string = BASE_URL +
        `ScoreboardGames&fields=Team1,Team2, DateTime_UTC&where=DateTime_UTC like "${date}%" AND (Team1 like "${team}%" or Team2 like "${team}%")`;
    let games: game[] = new Array<game>()
    try {
        const matches = await fetch(query);
        const data = await matches.json();
        for (let i in data.cargoquery) {
            let game: game = {
                Team1: data.cargoquery[i].title.Team1,
                Team2: data.cargoquery[i].title.Team2,
                'DateTime UTC': data.cargoquery[i].title["DateTime UTC"],
                Tournament : data.cargoquery[i].title.Tournament
            }
            games.push(game)
        }
    } catch (e: any) {
        console.log("Query has failed: " + e);
    }
    return games
}
*/
function findTeam(team) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = config_1.BASE_URL + `Teams&fields=Name&where= (Name = "${team}" OR Short = "${team}") AND isDisbanded = "false"`; // OR (Short LIKE"%${team}% OR Medium Like(%${team}%)")
        let Team = [];
        try {
            const teams = yield fetch(query);
            const data = yield teams.json();
            for (let i in data.cargoquery) {
                Team.push(data.cargoquery[i].title.Name);
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
            return null;
        }
    });
}
exports.retrievePicUrl = retrievePicUrl;
/**
 * Get all Games on a certain Day
 * @param date YYYY-MM-DD in UTC
 */
function getGames(date) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const info = yield fetch(config_1.BASE_URL +
                `MatchSchedule&fields=Team1,Team2, DateTime_UTC, Winner&where=DateTime_UTC like "${date}%"`);
            const data = yield info.json();
            console.log(data);
            let games = [];
            for (let i in data.cargoquery) {
                games.push({
                    Team1: data.cargoquery[i].title.Team1,
                    Team2: data.cargoquery[i].title.Team2,
                    'DateTime UTC': data.cargoquery[i].title["DateTime UTC"],
                    Tournament: "",
                    Winner: data.cargoquery[i].title.Winner
                });
            }
            return games;
        }
        catch (e) {
            console.log(e);
            return {};
        }
    });
}
exports.getGames = getGames;
