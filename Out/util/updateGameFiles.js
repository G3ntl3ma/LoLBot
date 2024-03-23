"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFinishedGames = exports.findNewGames = void 0;
const api_connection_1 = require("./api_connection");
const serverConfig_1 = require("../DB/serverConfig");
const DBHandler_1 = require("../DB/DBHandler");
/**
 * This File looks for new Games and adds them to the DB.
 * Also Deletes Games when they have been played and updates Games when a Winner is Determined
 */
/**
 * Finds all Games from the current Day to 30 Days ahead
 * and put them in
 */
function findNewGames() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i <= 30; i++) {
            let date = new Date();
            date.setDate(date.getUTCDate() + i);
            //@ts-ignore
            const Games = yield (0, api_connection_1.getGames)(date.toISOString().substring(0, 10));
            for (let i in Games) {
                const foundGame = yield (0, DBHandler_1.findGame)(Games[i]);
                if (foundGame.length == 0 && foundGame.Team1 != "TBD" && foundGame.Team2 != "TBD") {
                    let newGame = new serverConfig_1.gameConfig(Games[i]);
                    yield newGame.save();
                }
            }
        }
    });
}
exports.findNewGames = findNewGames;
findNewGames().then(res => console.log("finished!"));
/**
 * update all Games that have finished with the correct Data
 */
function updateFinishedGames() {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
exports.updateFinishedGames = updateFinishedGames;
