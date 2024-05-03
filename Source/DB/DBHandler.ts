/**
 * Contains all functions needed for Connection to the DB
 */

import serverConfig, {gameConfig} from './serverConfig.js';
let mongoose = require('mongoose');
import {ONLINE_CONNECTION} from "../config";
import {serverInfo, game} from "../util/Types";

let onlineConnection = ONLINE_CONNECTION
let localconnection = 'mongodb://127.0.0.1:27017'


export class connect{
    static connected:boolean = false
    static async connect(){
        if(this.connected)return;
        else{
            await mongoose.connect(localconnection)
            await console.log("Connected to Database")
            this.connected = true
            return
        }
    }

}

/**
 * Add a Guild to the Database
 * @param id the ID of the Guild
 */

export async function getGuild(){
    return await serverConfig;
}


export async function getGames(){
    return await gameConfig
}



/**
 * Get the Information about a certain Guild
 * @param GuildId The Guild Id
 */
export async function getServerInfo(GuildId: string){
    let info : serverInfo;

    try {
        //@ts-ignore
        info = await serverConfig.findById(GuildId);
    }
    catch (e) {
        console.log("Server could not be found")
        info  = {
            _id : "",
            out : "",
            teamSubs :[{}],
            leagueSubs : [ {}],
        }
    }
    return info;
}

export async function deleteGame(id: string){
    return await gameConfig.deleteOne({_id: id})
}