"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BASE_URL = exports.DISCORD_CLIENT_ID = exports.DISCORD_TOKEN = void 0;
var dotenv_1 = require("dotenv");
dotenv_1.default.config({ path: '../.env' });
var DISCORD_TOKEN = process.env.DISCORD_TOKEN;
exports.DISCORD_TOKEN = DISCORD_TOKEN;
var DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
exports.DISCORD_CLIENT_ID = DISCORD_CLIENT_ID;
var BASE_URL = process.env.BASE_URL;
exports.BASE_URL = BASE_URL;
if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID) {
    throw new Error("Missing environment variables");
}
