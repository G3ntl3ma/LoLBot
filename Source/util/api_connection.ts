/**
 * This File handles all requests to the leaguepedia API
 */

import {BASE_URL} from "../config";
import {game} from "./Types"

/**
 *  returns all Games in the League scheduled on the Date
 * @param league String with the Name of the League
 * @param date The Date of the Games in Form YYYY-MM-DD
 */
export async function getLeagueGames(league: string, date: string) {
    let query: string = BASE_URL +
        `ScoreboardGames&fields=Team1,Team2, DateTime_UTC&where=DateTime_UTC like "${date}%" and Tournament like "${league} %"`;
    let games: game[] = new Array<game>()
    try {
        const matches = await fetch(query);
        const data = await matches.json();
        for (let i in data.cargoquery) {
            let game: game = {
                Team1: data.cargoquery[i].title.Team1,
                Team2: data.cargoquery[i].title.Team2,
                'DateTime UTC': data.cargoquery[i].title["DateTime UTC"]
            }
            games.push(game)
        }
    } catch (e: any) {
        console.log("Query has failed: " + e);
    }
    return games
}

/**
 * return all Games of the specified Team on the date
 * @param team The Team
 * @param date YYYY-MM-DD HH:MM:SS Any Part from the end can be missing
 */
export async function getTeamGames(team: string, date: string) {
    let query: string = BASE_URL +
        `ScoreboardGames&fields=Team1,Team2, DateTime_UTC&where=DateTime_UTC like "${date}%" AND (Team1 like "${team}%" or Team2 like "${team}%")`;
    console.log(query);
    let games: game[] = new Array<game>()
    try {
        const matches = await fetch(query);
        const data = await matches.json();
        for (let i in data.cargoquery) {
            let game: game = {
                Team1: data.cargoquery[i].title.Team1,
                Team2: data.cargoquery[i].title.Team2,
                'DateTime UTC': data.cargoquery[i].title["DateTime UTC"]
            }
            games.push(game)
        }
    } catch (e: any) {
        console.log("Query has failed: " + e);
    }
    return games
}

export async function findTeam(team: string){
    let query: string = BASE_URL + `Teams&fields=Short&where= (Name = "${team}" OR Short = "${team}") AND isDisbanded = "false"`// OR (Short LIKE"%${team}% OR Medium Like(%${team}%)")
    let Team: string[] = new Array<string>()

    console.log(query)
    try {
        const teams = await fetch(query);
        const data = await teams.json();
        console.log(data.cargoquery[0].title)

        for(let i in data.cargoquery){
            Team.push(data.cargoquery[i].title.Short)
        }
    }

    catch (e) {
        console.log("Query has failed")
    }

    return Team
}

/**
 * Get the Url of a Team Logo to set as a Source
 * @param team the Team of which you want the Logo of
 */
export async function retrievePicUrl(team: String){
    try {
        const info = await fetch(`https://lol.fandom.com/api.php?action=query&format=json&prop=imageinfo&titles=File:${team}logo%20square.png&iiprop=url`);
        const data = await info.json();
        for (let i in data["query"]["pages"]) {
            return data["query"]["pages"][i]["imageinfo"][0]["url"]
        }
    }
    catch (e) {
        console.log(e)
        return ""
    }
}