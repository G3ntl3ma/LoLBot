"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameConfig = exports.LoLConfig = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
/**
 * Config for storage of User Information
 */
const userConfigSchema = new Schema({
    _id: {
        type: String,
        required: true,
    },
    out: {
        type: String,
        required: true
    },
    teamSubs: [{
            type: String,
            required: true
        }
    ],
    leagueSubs: [{
            type: String,
            required: true
        }],
    playerSubs: [{
            type: String,
            required: true
        }],
    timeZone: { type: String, required: true }
});
/**
 * Config for Storing Game Information
 */
const gameConfigSchema = new Schema({
    Team1: {
        type: String,
        required: true
    },
    Team2: {
        type: String,
        required: true
    },
    Winner: {
        type: String,
        required: false
    },
    "DateTime UTC": {
        type: String,
        required: true
    },
    Tournament: {
        type: String,
        required: false
    }
});
exports.LoLConfig = mongoose_1.default.model("users", userConfigSchema);
exports.default = exports.LoLConfig;
exports.gameConfig = mongoose_1.default.model("games", gameConfigSchema);
