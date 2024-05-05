import {connect} from "./DB/DBHandler";
import {findNewGames, updateFinishedGames} from "./util/updateGameFiles";
import {parentPort} from "worker_threads"
import {DISCORD_TOKEN} from "./config";
import {Client} from "discord.js";
import {IntentsBitField} from "discord.js";
//Connect to Database
let newGamesInterval:any = "";

// @ts-ignore
parentPort.on('message', () => {
    connect.connect().then(res => {

        const client = new Client({
            intents: [
                IntentsBitField.Flags.Guilds,
                IntentsBitField.Flags.GuildMessages,
                IntentsBitField.Flags.MessageContent]
        });
        client.login(DISCORD_TOKEN)
        findNewGames(client)
            .then(res => newGamesInterval = setInterval(findNewGames, 86_400_000, client))

        console.log("newGames Worker is Working")
    })
})