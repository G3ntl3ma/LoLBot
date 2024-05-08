import {game} from "./Types";
import {gameConfig} from "../DB/serverConfig";
import {getGames, getGuild} from "../DB/DBHandler";
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
        "Winner": string,
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

export async function findNewGames(client:Client) {
    for (let i = 0; i <= 30; i++) {

        let date = new Date()
        date.setDate(date.getUTCDate() + i)
        const matchSchedule = await fetch(
            `https://lol.fandom.com/api.php?action=cargoquery&
            format=json&limit=max&tables=MatchSchedule&fields=Team1,Team2, DateTime_UTC, Winner&
            where=DateTime_UTC like '${date.toISOString().substring(0, 10)}%'`);
        const matchScheduleData = await matchSchedule.json();

        const scoreBoardGames = await fetch(
         `https://lol.fandom.com/api.php?action=cargoquery&
        format=json&limit=max&tables=ScoreboardGames&fields=WinTeam,Team1,Team2,DateTime_UTC, Tournament&
        where=DateTime_UTC like '${date.toISOString().substring(0, 10)}%'`
        )
        const scoreBoardGamesData = await scoreBoardGames.json();
        let games : game[] = [] ;

        for(let i of matchScheduleData.cargoquery) {
            if (typeof (i.title["DateTime UTC"]) != "undefined" && i.title["Winner"] == null) {
                games.push({
                    Team1: i.title.Team1,
                    Team2: i.title.Team2,
                    'DateTime UTC': i.title["DateTime UTC"],
                    Tournament: "",
                    'Winning Team': i.title.Winner
                })
            }
        }

        for(let i of scoreBoardGamesData.cargoquery) {
            if (typeof (i.title["DateTime UTC"]) != "undefined" && i.title["WinTeam"] == null) {
                games.push({
                    Team1: i.title.Team1,
                    Team2: i.title.Team2,
                    'DateTime UTC': i.title["DateTime UTC"],
                    Tournament: i.title.Tournament,
                    'Winning Team': i.title.WinTeam
                })
            }
        }

        const Guilds = await (await getGuild()).find()
        for (let i in games) {
            const foundGame: any = await (await getGames()).find(games[i])
            if (foundGame.length == 0 && foundGame.Team1 != "TBD" && foundGame.Team2 != "TBD") {

                let newGame = new gameConfig(games[i]);
                await newGame.save()

                for(let guild in Guilds) {

                    //Check so one Game doesnt get sent twice per Server
                    let sent: boolean = false;

                    for (let team in Guilds[guild]["teamSubs"]) {

                        if ((games[i].Team1 === Guilds[guild]["teamSubs"][team] ||
                            games[i].Team2 === Guilds[guild]["teamSubs"][team]) && !sent) {
                            console.log("Match Found")
                            console.log(sent)
                            //@ts-ignore
                            sent = true
                            let channel: any = await client.channels.fetch(Guilds[guild].out)
                            await channel.send({embeds: [await sendUpcomingGame(games[i], Guilds[guild]["teamSubs"][team])]})
                        }
                    }
                }
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
    oldDate.setDate(oldDate.getUTCDate() - 2)
    const mutatedOldDate = oldDate.toISOString().substring(0, 4) +
        oldDate.toISOString().substring(5, 7) +
        oldDate.toISOString().substring(8, 10) +
        oldDate.toISOString().substring(11, 13) +
        oldDate.toISOString().substring(14, 16) +
        oldDate.toISOString().substring(17, 19)
    let scheduleGamesRequest: string =  `https://lol.fandom.com/api.php?action=cargoquery&
    format=json&limit=max&tables=MatchSchedule&fields=Winner,Team1,Team2,DateTime_UTC&
    where=DateTime_UTC <= '${mutatedNewDate}' AND DateTime_UTC >= '${mutatedOldDate}'`
    const scheduleGamesResponse = await fetch(scheduleGamesRequest)
    const scheduleGamesData: returnQuery = await scheduleGamesResponse.json()

    const scoreBoardGamesRequest: string =  `https://lol.fandom.com/api.php?action=cargoquery&
    format=json&limit=max&tables=ScoreboardGames&fields=WinTeam,Team1,Team2,DateTime_UTC&
    where=DateTime_UTC <= '${mutatedNewDate}' AND DateTime_UTC >= '${mutatedOldDate}'`
    const scoreBoardGamesResponse = await fetch(scoreBoardGamesRequest)
    const scoreBoardGamesData: returnQuery = await scoreBoardGamesResponse.json()

    const loggedGames = await (await getGames()).find()
    let filter = []
    for(let j of scheduleGamesData.cargoquery) {
        for (let i of loggedGames) {
            if (j["title"]["Winner"] != null&&
                i["DateTime UTC"] ===j["title"]["DateTime UTC"] &&
                i["Team1"] === j["title"]["Team1"] &&
                i["Team2"] ===j["title"]["Team2"]) {
                await (await getGames()).deleteOne({_id:i["_id"].toString()})
                filter.push(j)
            }
        }
    }

    for(let j of scoreBoardGamesData.cargoquery) {
        for (let i of loggedGames) {
            // @ts-ignore
            if (j["title"]["WinTeam"] != null&&
                i["DateTime UTC"] ===j["title"]["DateTime UTC"] &&
                i["Team1"] === j["title"]["Team1"] &&
                i["Team2"] ===j["title"]["Team2"]) {
                await (await getGames()).deleteOne({_id:i["_id"].toString()})
                filter.push(j)
            }
        }
    }

    const Guilds = await (await getGuild()).find()
    for (let game in filter) {
        for(let guild in Guilds){
            let sent: boolean = false;
            for(let team in Guilds[guild]["teamSubs"]){
                if((filter[game].title.Team1 === Guilds[guild]["teamSubs"][team] ||
                    filter[game].title.Team2 === Guilds[guild]["teamSubs"][team]) && !sent){
                    console.log("Match Found")
                    sent = true;
                    //@ts-ignore
                    let channel:any = await client.channels.fetch(Guilds[guild].out)
                    await channel.send({embeds: [await sendFinishedGame(filter[game].title)]})
                }
            }
        }
    }
    console.log("Finished Games iteration Finished")
}

