import {Events, Interaction} from "discord.js";

require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    once: false,
    async execute(interaction: Interaction ) {
        if (!interaction.isChatInputCommand()) return;

        // @ts-ignore
        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            console.log("Hello")
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
            } else {
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    }
};