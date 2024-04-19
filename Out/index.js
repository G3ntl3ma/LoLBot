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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Main file of the Bot
 */
const discord_js_1 = require("discord.js");
const config_1 = require("./config");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const worker_threads_1 = require("worker_threads");
const updateGameFiles_1 = require("./util/updateGameFiles");
const DBHandler_1 = require("./DB/DBHandler");
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.IntentsBitField.Flags.Guilds,
        discord_js_1.IntentsBitField.Flags.GuildMessages,
        discord_js_1.IntentsBitField.Flags.MessageContent
    ]
});
//Create Thread so the main Thread won't get halted too much
let finishedGamesInterval = "";
DBHandler_1.connect.connect().then(res => {
    const newGamesWorker = new worker_threads_1.Worker(__dirname + "/newGames.js");
    newGamesWorker.postMessage("Start");
    (0, updateGameFiles_1.updateFinishedGames)(client).then(res => finishedGamesInterval = setInterval(updateGameFiles_1.updateFinishedGames, 3600000, client));
});
client.login(config_1.DISCORD_TOKEN);
//@ts-ignore
client.commands = new discord_js_1.Collection();
//Get all commands and store them in commands
// @ts-ignore
let commands = [];
const commandpath = path_1.default.join(__dirname, "commands");
const commandFolders = fs_1.default.readdirSync(commandpath);
for (const folder of commandFolders) {
    const commandsPath = path_1.default.join(commandpath, folder);
    const commandFiles = fs_1.default.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path_1.default.join(commandsPath, file);
        const command = require(filePath);
        // Set a new item in the Collection with the key as the command name and the value as the exported module
        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
            //@ts-ignore
            client.commands.set(command.data.name, command);
        }
        else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}
// Construct and prepare an instance of the REST module
const rest = new discord_js_1.REST().setToken(config_1.DISCORD_TOKEN);
// and deploy your commands!
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);
        // The put method is used to fully refresh all commands in the guild with the current set
        const data = yield rest.put(discord_js_1.Routes.applicationCommands(config_1.DISCORD_CLIENT_ID), { body: commands });
        // @ts-ignore
        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    }
    catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
}))();
//Load Event Files
const eventsPath = path_1.default.join(__dirname, 'events');
const eventFiles = fs_1.default.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const filePath = path_1.default.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    }
    else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}
//const newGamesInterval = setInterval(findNewGames, 86_400_000)
//updateFinishedGames(client).then(res => console.log("Finished Games updated!"))
//const finishedGamesInterval = setInterval(updateFinishedGames, 3_600_000, client)
