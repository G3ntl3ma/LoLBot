import {game} from "./Types";
import {gameConfig} from "../DB/serverConfig";
import {findGame, getAllGuilds, find} from "../DB/DBHandler";
import {Client} from "discord.js"
import {BASE_URL} from "../config";

/**
 * This File looks for new Games and adds them to the DB.
 * Also Deletes Games when they have been played and updates Games when a Winner is Determined
 */

/**
 * Finds all Games from the current Day to 30 Days ahead
 * and put them in
 */

type returnItems = {
    title: {
        "Winning Team": string,
        Team1: string,
        Team2: string,
        "DateTime UTC": string,
        Tournament: string
    }
}
type returnQuery = {
    limits: {cargoquery : number},
    cargoquery: [returnItems]
}

export async function findNewGames() {
    for (let i = 0; i <= 30; i++) {

        let date = new Date()
        date.setDate(date.getUTCDate() + i)
        const info = await fetch(
            `https://lol.fandom.com/api.php?action=cargoquery&
            format=json&limit=max&tables=MatchSchedule&fields=Team1,Team2, DateTime_UTC, Winner&
            where=DateTime_UTC like "${date.toISOString().substring(0, 10)}%"`);
        const data = await info.json();
        let games : game[] = [] ;

        for(let i in data.cargoquery) {
            if (typeof (data.cargoquery[i].title["DateTime UTC"]) != "undefined") {
                games.push({
                    Team1: data.cargoquery[i].title.Team1,
                    Team2: data.cargoquery[i].title.Team2,
                    'DateTime UTC': data.cargoquery[i].title["DateTime UTC"],
                    Tournament: "",
                    Winner: data.cargoquery[i].title.Winner
                })
            }
        }
        for (let i in games) {
            const foundGame: any = await findGame(games[i])
            if (foundGame.length == 0 && foundGame.Team1 != "TBD" && foundGame.Team2 != "TBD") {

                let newGame = new gameConfig(games[i]);
                await newGame.save()
            }

        }
    }
}

/**
 * When a Game finishes, a Message of the Teams get sent to all Subscribers and the Game gets Deleted
 */
export async function updateFinishedGames(client: Client) {

    //get all Games with a Date between the Past and the Last Day
    let newDate = new Date()
    newDate.setDate(newDate.getUTCDate())
    let mutatedNewDate = newDate.toISOString().substring(0, 10) + " " + newDate.toISOString().substring(11, 19)

    let oldDate = new Date()
    oldDate.setDate(oldDate.getUTCDate() - 1)
    const mutatedOldDate = oldDate.toISOString().substring(0, 10) + " " + oldDate.toISOString().substring(11, 19)

    let fetchrequest: string =  `https://lol.fandom.com/api.php?action=cargoquery&
    format=json&limit=max&tables=ScoreboardGames&fields=WinTeam,Team1,Team2,DateTime_UTC, Tournament&
    where=DateTime_UTC <= '${mutatedNewDate}' AND DateTime_UTC >= '${mutatedOldDate}'`
    const finished = await fetch(fetchrequest)
    let date: returnQuery = await finished.json()


    const loggedGames = await find()
    let filter = date.cargoquery.filter((element: returnItems) => {
        for (let i in loggedGames) {
            if (loggedGames[i]["DateTime UTC"] === element["title"]["DateTime UTC"] && loggedGames[i]["Team1"] == element["title"]["Team1"] && loggedGames[i]["Team2"] === element["title"]["Team2"]) {
                return true
            }
        }
        return false
    })
    const Guilds = await getAllGuilds()

    for (let i in filter) {

    }
}

