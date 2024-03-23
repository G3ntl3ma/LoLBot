"use strict";
/**
 * Contains all functions needed for Connection to the DB
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.find = exports.findGame = exports.getServerInfo = exports.addTeamSub = exports.updateOutput = exports.deleteGuild = exports.addGuild = void 0;
const serverConfig_js_1 = __importStar(require("./serverConfig.js"));
let mongoose = require('mongoose');
const config_1 = require("../config");
let onlineConnection = config_1.ONLINE_CONNECTION;
let localconnection = 'mongodb://127.0.0.1:27017/LoLBotDB';
mongoose.connect(localconnection).then((result) => { console.log("Connected to Database"); });
/**
 * Add a Guild to the Database
 * @param id the ID of the Guild
 */
function addGuild(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const config = new serverConfig_js_1.default({
            _id: id,
            out: ""
        });
        return yield config.save();
    });
}
exports.addGuild = addGuild;
/**
 * Delete a Guild from the Database
 * @param id The ID of the Guild that should be deleted
 */
function deleteGuild(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return serverConfig_js_1.default.deleteOne({ _id: id });
    });
}
exports.deleteGuild = deleteGuild;
function updateOutput(channelId, GuildId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield serverConfig_js_1.default.findOneAndUpdate({ _id: GuildId }, { out: channelId });
    });
}
exports.updateOutput = updateOutput;
function addTeamSub(TeamId, GuildId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield serverConfig_js_1.default.findOneAndUpdate({ _id: GuildId }, { $push: { teamSubs: { code: TeamId } } });
    });
}
exports.addTeamSub = addTeamSub;
/**
 * Get the Information about a certain Guild
 * @param GuildId The Guild Id
 */
function getServerInfo(GuildId) {
    return __awaiter(this, void 0, void 0, function* () {
        let info;
        try {
            //@ts-ignore
            info = yield serverConfig_js_1.default.findById(GuildId);
        }
        catch (e) {
            console.log("Server could not be found");
            info = {
                _id: "",
                out: "",
                teamSubs: [{}],
                leagueSubs: [{}],
            };
        }
        return info;
    });
}
exports.getServerInfo = getServerInfo;
function findGame(game) {
    return __awaiter(this, void 0, void 0, function* () {
        return serverConfig_js_1.gameConfig.find(game);
    });
}
exports.findGame = findGame;
function find() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield serverConfig_js_1.gameConfig.find();
    });
}
exports.find = find;
