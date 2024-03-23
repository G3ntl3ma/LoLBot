import {getGames} from "./api_connection";
import {game} from "./Types";
import {gameConfig} from "../DB/serverConfig";
import {findGame} from "../DB/DBHandler";

/**
 * This File looks for new Games and adds them to the DB.
 * Also Deletes Games when they have been played and updates Games when a Winner is Determined
 */

/**
 * Finds all Games from the current Day to 30 Days ahead
 * and put them in
 */
export async function findNewGames(){
    for(let i = 0; i<=30; i++) {

        let date = new Date()
        date.setDate(date.getUTCDate() + i)
        //@ts-ignore
        const Games: game[]  = await getGames(date.toISOString().substring(0, 10))
        for(let i in Games){
            const foundGame: any = await findGame(Games[i])
            if(foundGame.length == 0 && foundGame.Team1 != "TBD" && foundGame.Team2 != "TBD"){
                let newGame = new gameConfig(Games[i]);
                await newGame.save()
            }

        }
    }
}

findNewGames().then(res => console.log("finished!"))

/**
 * update all Games that have finished with the correct Data
 */
export async function updateFinishedGames(){

}