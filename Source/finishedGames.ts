import {Client, IntentsBitField} from "discord.js";
import {parentPort} from "worker_threads";
import {updateFinishedGames} from "./util/updateGameFiles";
import {DISCORD_TOKEN} from "./config";
import {connect} from "./DB/DBHandler"

let finishedGamesInterval:any = ""
// @ts-ignore
parentPort.on("message",() => {
    connect.connect().then(() => {

        const client = new Client({
            intents: [
                IntentsBitField.Flags.Guilds,
                IntentsBitField.Flags.GuildMessages,
                IntentsBitField.Flags.MessageContent]
        });
        client.login(DISCORD_TOKEN)

        updateFinishedGames(client).then(() => finishedGamesInterval = setInterval(updateFinishedGames, 3_600_000, client))
        console.log("Finished Games Worker is Working")
    })
} )