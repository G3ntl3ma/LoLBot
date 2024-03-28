/**
 * Main file of the Bot
 */

import {Client, IntentsBitField, REST, Routes, Events, Collection} from "discord.js";
import {DISCORD_TOKEN, DISCORD_CLIENT_ID} from "./config";
import fs from "fs";
import path from "path";
import {updateFinishedGames} from "./util/updateGameFiles";

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent]
});

client.login(DISCORD_TOKEN)

//@ts-ignore
client.commands = new Collection()
//Get all commands and store them in commands
// @ts-ignore
let commands = [];
const commandpath = path.join(__dirname, "commands")
const commandFolders = fs.readdirSync(commandpath)
for (const folder of commandFolders) {
    const commandsPath = path.join(commandpath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        // Set a new item in the Collection with the key as the command name and the value as the exported module
        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
            //@ts-ignore
            client.commands.set(command.data.name, command)
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(DISCORD_TOKEN);

// and deploy your commands!
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            Routes.applicationCommands(DISCORD_CLIENT_ID),
            { body: commands },
        );

        // @ts-ignore
        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
})();

//Load Event Files
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }

}
updateFinishedGames(client).then(res => console.log("Finished"))