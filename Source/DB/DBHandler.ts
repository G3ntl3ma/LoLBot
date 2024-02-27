/**
 * Contains all functions needed for Connecrion to the DB
 */

import serverConfig from './serverConfig.js';

let mongoose = require('mongoose');
let localconnection = 'mongodb://127.0.0.1:27017/testdb'
let connectionstring = `mongodb+srv://G3ntl3ma:wEA0Yv2PiqnkaD3S@test.p920t4v.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(localconnection).then((result: any) =>{console.log("Connected to Database")})

export async function addGuild(id:string){

const config = new serverConfig({

    _id: id,
})
    return await config.save();
}
