import {EmbedBuilder} from 'discord.js'
import {game} from './Types'
export function sendUpcomingGame(game: game){
    const Embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setDescription("Upcoming Game from one of your Subscriptions")
        .setTitle('Upcoming Game:')
        .setThumbnail('https://imgur.com/deu1U5t.jpeg')
        .addFields(
            { name: 'LPL', value: 'JDG vs BLG' },
        )
    return Embed
}

