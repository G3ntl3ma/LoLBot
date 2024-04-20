import {game} from "./Types";
import {gameConfig} from "../DB/serverConfig";
import {findGame, getAllGuilds, find, deleteGame} from "../DB/DBHandler";
import {Client} from "discord.js"
import {sendFinishedGame, sendUpcomingGame} from "./sendMessage";

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
            where=DateTime_UTC like '${date.toISOString().substring(0, 10)}%'`);
        const data = await info.json();
        let games : game[] = [] ;

        for(let i in data.cargoquery) {
            if (typeof (data.cargoquery[i].title["DateTime UTC"]) != "undefined") {
                games.push({
                    Team1: data.cargoquery[i].title.Team1,
                    Team2: data.cargoquery[i].title.Team2,
                    'DateTime UTC': data.cargoquery[i].title["DateTime UTC"],
                    Tournament: "",
                    'Winning Team': data.cargoquery[i].title.Winner
                })
            }
        }
        for (let i in games) {
            const foundGame: any = await (await findGame()).find(games[i])
            if (foundGame.length == 0 && foundGame.Team1 != "TBD" && foundGame.Team2 != "TBD") {

                let newGame = new gameConfig(games[i]);
                await newGame.save()
            }
        }
    }
    console.log("New Games Iteration Finished")
}

/**
 * When a Game finishes, a Message of the Teams get sent to all Subscribers and the Game gets Deleted
 */
export async function updateFinishedGames(client: Client) {

    //get all Games with a Date between the Past and the Last Day
    let newDate = new Date()
    newDate.setDate(newDate.getUTCDate())
    let mutatedNewDate = newDate.toISOString().substring(0, 4) +
        newDate.toISOString().substring(5, 7) +
        newDate.toISOString().substring(8, 10) +
        newDate.toISOString().substring(11, 13) +
        newDate.toISOString().substring(14, 16) +
        newDate.toISOString().substring(17, 19)
    let oldDate = new Date()
    oldDate.setDate(oldDate.getUTCDate() - 1)
    const mutatedOldDate = oldDate.toISOString().substring(0, 4) +
        oldDate.toISOString().substring(5, 7) +
        oldDate.toISOString().substring(8, 10) +
        oldDate.toISOString().substring(11, 13) +
        oldDate.toISOString().substring(14, 16) +
        oldDate.toISOString().substring(17, 19)
    let fetchRequest: string =  `https://lol.fandom.com/api.php?action=cargoquery&
    format=json&limit=max&tables=ScoreboardGames&fields=WinTeam,Team1,Team2,DateTime_UTC, Tournament&
    where=DateTime_UTC <= '${mutatedNewDate}' AND DateTime_UTC >= '${mutatedOldDate}'`
    const finished = await fetch(fetchRequest)
    let date: returnQuery = await finished.json()
    const loggedGames = await find()
    let filter = date.cargoquery.filter((element: returnItems) => {
        for (let i in loggedGames) {
            if (loggedGames[i]["DateTime UTC"] === element["title"]["DateTime UTC"] &&
                loggedGames[i]["Team1"] == element["title"]["Team1"] &&
                loggedGames[i]["Team2"] === element["title"]["Team2"]) {
                deleteGame(loggedGames[i]["_id"].toString())
                return true
            }
        }
        return false
    })
    const Guilds = await getAllGuilds()
    for (let game in filter) {
        for(let guild in Guilds){
            for(let team in Guilds[guild]["teamSubs"]){
                console.log("Team 1: ", filter[game].title.Team1)
                console.log("Team 2: ", filter[game].title.Team2)
                console.log("Subscription: ", Guilds[guild]["teamSubs"][team].code)
                if(filter[game].title.Team1 === Guilds[guild]["teamSubs"][team].code ||
                    filter[game].title.Team2 === Guilds[guild]["teamSubs"][team].code){
                    console.log("Match Found")
                    //@ts-ignore
                    let channel:any = client.channels.fetch(Guilds[guild].out)
                    channel.send({embeds: [sendFinishedGame(filter[game].title)]})
                }
            }
        }
    }
    console.log("Finished Games iteration Finished")
}

