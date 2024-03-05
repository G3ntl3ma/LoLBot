"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendUpcomingGame = void 0;
const discord_js_1 = require("discord.js");
function sendUpcomingGame(game) {
    const Embed = new discord_js_1.EmbedBuilder()
        .setColor(0x0099FF)
        .setDescription("Upcoming Game from one of your Subscriptions")
        .setTitle('Upcoming Game:')
        .setThumbnail('https://imgur.com/deu1U5t.jpeg')
        .addFields({ name: 'LPL', value: 'JDG vs BLG' });
    return Embed;
}
exports.sendUpcomingGame = sendUpcomingGame;
