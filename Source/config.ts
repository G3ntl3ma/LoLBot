import dotenv from "dotenv";

let DISCORD_TOKEN: string;
let DISCORD_CLIENT_ID: string;
let BASE_URL: string;
let ONLINE_CONNECTION: string;

if (process.env.PROD === "true") {
  DISCORD_TOKEN = process.env.DISCORD_TOKEN;
  DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
  BASE_URL = process.env.LOLBOT_BASE_URL;
  ONLINE_CONNECTION = process.env.LOLBOT_ONLINE_CONNECTION;
} else {
  dotenv.config({ path: __dirname + "/../.env" });
  DISCORD_TOKEN = process.env.DISCORD_TOKEN;
  DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
  BASE_URL = process.env.BASE_URL;
  ONLINE_CONNECTION = process.env.ONLINE_CONNECTION;
}
console.log("Discord Token:", DISCORD_TOKEN);
console.log("Client Id:", DISCORD_CLIENT_ID);

if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID) {
  throw new Error("Missing environment variables");
}

export { DISCORD_TOKEN, DISCORD_CLIENT_ID, BASE_URL, ONLINE_CONNECTION };
