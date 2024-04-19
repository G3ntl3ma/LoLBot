import {Client} from "discord.js";
import {parentPort} from "worker_threads";
import {updateFinishedGames} from "./util/updateGameFiles";

// @ts-ignore
parentPort.on("message",(client:Client) => {
    console.log("Finished Games Worker is Working")
} )