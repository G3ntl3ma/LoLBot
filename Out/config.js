"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BASE_URL = exports.DISCORD_CLIENT_ID = exports.DISCORD_TOKEN = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: __dirname + '/../.env' });
// @ts-ignore
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
exports.DISCORD_TOKEN = DISCORD_TOKEN;
// @ts-ignore
const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
exports.DISCORD_CLIENT_ID = DISCORD_CLIENT_ID;
// @ts-ignore
const BASE_URL = process.env.BASE_URL;
exports.BASE_URL = BASE_URL;
if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID) {
    throw new Error("Missing environment variables");
}
