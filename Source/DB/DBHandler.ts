/**
 * Contains all functions needed for Connection to the DB
 */

import serverConfig, {gameConfig} from './serverConfig.js';
let mongoose = require('mongoose');
import {ONLINE_CONNECTION} from "../config";
import {serverInfo, game} from "../util/Types";

let onlineConnection = ONLINE_CONNECTION
let localconnection = 'mongodb://127.0.0.1:27017/LoLBotDB'
mongoose.connect(localconnection).then((result: any) =>{console.log("Connected to Database")})

/**
 * Add a Guild to the Database
 * @param id the ID of the Guild
 */
export async function addGuild(id:string){

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

export async function updateOutput(channelId: string, GuildId:string){
   return await serverConfig.findOneAndUpdate({_id: GuildId}, {out: channelId});
}

export async function addTeamSub(TeamId: string, GuildId:string){
    return await serverConfig.findOneAndUpdate({_id :GuildId}, {$push: {teamSubs: {code: TeamId}}})
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

    return gameConfig.find(game);
}

export async function find(){
    return await gameConfig.find();
}