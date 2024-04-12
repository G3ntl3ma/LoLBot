/**
 * Contains all functions needed for Connection to the DB
 */

import serverConfig, {gameConfig} from './serverConfig.js';
let mongoose = require('mongoose');
import {ONLINE_CONNECTION} from "../config";
import {serverInfo, game} from "../util/Types";

let onlineConnection = ONLINE_CONNECTION
let localconnection = 'mongodb://mongodb:27017'


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
export async function addGuild(id:string, out:string){
const config = new serverConfig({

    _id: id,
    out: ""
})
    return await config.save();
}

/**
 * Delete a Guild from the Database
 * @param id The ID of the Guild that should be deleted
 */
export async function deleteGuild(id:string){
    return serverConfig.deleteOne({_id: id});
}

/**Update the Output of the Guild Channel
 *
 * @param channelId
 * @param GuildId
 */
export async function updateOutput(channelId: string, GuildId:string){
   return await serverConfig.findOneAndUpdate({_id: GuildId}, {out: channelId});
}

/**add a subscription to a Guild
 *
 * @param TeamId
 * @param GuildId
 */
export async function addTeamSub(TeamId: string, GuildId:string){
    return await serverConfig.findOneAndUpdate({_id :GuildId}, {$push: {teamSubs: {code: TeamId}}})
}

/**
 *
 * @param TeamId
 * @param GuildId
 */
export async function deleteTeamSub(TeamId: string, GuildId:string){
    return await serverConfig.findOneAndUpdate({_id :GuildId}, {$pull: {'teamSubs': {code: TeamId}}})
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

export async function findGame(game :game){
    console.log(game)
    return gameConfig.find(game);
}

export async function find(){
    console.log("Flag 4")
    return await gameConfig.find();
}
export async function getAllGuilds(){
    console.log("Flag 5")
    return await serverConfig.find();
}
export async function deleteGame(id: string){
    return await gameConfig.deleteOne({_id: id})
}