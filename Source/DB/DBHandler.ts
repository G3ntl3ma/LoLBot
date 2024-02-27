/**
 * Contains all functions needed for Connecrion to the DB
 */

import serverConfig from './serverConfig.js';

let mongoose = require('mongoose');
let localconnection = 'mongodb://127.0.0.1:27017/LoLBotDB'
mongoose.connect(localconnection).then((result: any) =>{console.log("Connected to Database")})

export async function addGuild(id:string){

const config = new serverConfig({

    _id: id,
})
    return await config.save();
}
