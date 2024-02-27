/**
 * Contains all functions needed for Connecrion to the DB
 */

import serverConfig from './serverConfig.js';
let mongoose = require('mongoose');
import {ONLINE_CONNECTION} from "../config";

let onlineConnection = ONLINE_CONNECTION
let localconnection = 'mongodb://127.0.0.1:27017/LoLBotDB'
mongoose.connect(onlineConnection).then((result: any) =>{console.log("Connected to Database")})

export async function addGuild(id:string){

const config = new serverConfig({

    _id: id,
})
    return await config.save();
}

export async function deleteGuild(id:string){
    return serverConfig.deleteOne({_id: id});
}