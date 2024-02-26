import dotenv from "dotenv";

dotenv.config({path: __dirname + '/../.env'});

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const BASE_URL = process.env.BASE_URL;

if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID) {
    throw new Error("Missing environment variables");
}

export {
    DISCORD_TOKEN,
    DISCORD_CLIENT_ID,
    BASE_URL
};
