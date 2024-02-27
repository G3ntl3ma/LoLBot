"use strict";
/**
 * Contains all functions needed for Connecrion to the DB
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGuild = exports.addGuild = void 0;
const serverConfig_js_1 = __importDefault(require("./serverConfig.js"));
let mongoose = require('mongoose');
const config_1 = require("../config");
let onlineConnection = config_1.ONLINE_CONNECTION;
let localconnection = 'mongodb://127.0.0.1:27017/LoLBotDB';
mongoose.connect(onlineConnection).then((result) => { console.log("Connected to Database"); });
function addGuild(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const config = new serverConfig_js_1.default({
            _id: id,
        });
        return yield config.save();
    });
}
exports.addGuild = addGuild;
function deleteGuild(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return serverConfig_js_1.default.deleteOne({ _id: id });
    });
}
exports.deleteGuild = deleteGuild;
