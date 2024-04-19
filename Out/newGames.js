"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DBHandler_1 = require("./DB/DBHandler");
const updateGameFiles_1 = require("./util/updateGameFiles");
const worker_threads_1 = require("worker_threads");
//Connect to Database
let newGamesInterval = "";
// @ts-ignore
worker_threads_1.parentPort.on('message', () => {
    DBHandler_1.connect.connect().then(res => {
        (0, updateGameFiles_1.findNewGames)()
            .then(res => newGamesInterval = setInterval(updateGameFiles_1.findNewGames, 86400000));
        console.log("newGames Worker is Working");
    });
});
