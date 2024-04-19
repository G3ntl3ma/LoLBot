import {connect} from "./DB/DBHandler";
import {findNewGames, updateFinishedGames} from "./util/updateGameFiles";
import {parentPort} from "worker_threads"

//Connect to Database
let newGamesInterval:any = "";

// @ts-ignore
parentPort.on('message', () => {
    connect.connect().then(res => {
        findNewGames()
            .then(res => newGamesInterval = setInterval(findNewGames, 86_400_000))

        console.log("newGames Worker is Working")
    })
})