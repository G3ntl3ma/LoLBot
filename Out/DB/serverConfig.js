"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const serverConfigSchema = new Schema({
    _id: {
        type: String,
        required: true,
    },
    out: {
        type: String,
        required: false
    },
    teamSubs: [{
            code: {
                type: String,
                required: true
            }
        }],
    leagueSubs: [{
            code: {
                type: String,
                required: true
            }
        }], //Array of all Leagues the Person is subscribed to
});
const LoLConfig = mongoose_1.default.model("users", serverConfigSchema);
exports.default = LoLConfig;
