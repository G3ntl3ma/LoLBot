import dotenv from "dotenv";

dotenv.config({path: __dirname + '/../.env'});

// @ts-ignore
const DISCORD_TOKEN : string = process.env.DISCORD_TOKEN;
// @ts-ignore
const DISCORD_CLIENT_ID : string = process.env.DISCORD_CLIENT_ID;
// @ts-ignore
const BASE_URL : string = process.env.BASE_URL;

if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID) {
    throw new Error("Missing environment variables");
}

export {
    DISCORD_TOKEN,
    DISCORD_CLIENT_ID,
    BASE_URL
};
