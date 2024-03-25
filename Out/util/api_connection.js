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
exports.getGames = void 0;
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
            return games;
        }
        catch (e) {
            console.log(e);
            return {};
        }
    });
}
exports.getGames = getGames;
