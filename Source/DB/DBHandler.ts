/**
 * Contains all functions needed for Connecrion to the DB
 */

import serverConfig from './serverConfig.js';
let mongoose = require('mongoose');
import {ONLINE_CONNECTION} from "../config";

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