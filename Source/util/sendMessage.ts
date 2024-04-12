import {EmbedBuilder} from 'discord.js'
import {game} from './Types'

export async function sendUpcomingGame(game: game, team: string){

    let logoURL : string = "https://imgur.com/deu1U5t.jpeg";
    const info = await fetch(
        `https://lol.fandom.com/api.php?action=query&format=json&prop=imageinfo&titles=File:${team}logo%20square.png&iiprop=url`);
    const data = await info.json();
    console.log(team)
    console.log(data["query"]["pages"])
    for (let i in data["query"]["pages"]) {
        logoURL = data["query"]["pages"][i]["imageinfo"][0]["url"]
    }

    const Embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setDescription("Upcoming Game from one of your Subscriptions")
        .setTitle('Upcoming Game:')
        .setThumbnail('https://imgur.com/deu1U5t.jpeg')
        .setImage(logoURL)
        .addFields(
            { name: "Teams", value: `${game.Team1} vs ${game.Team2}` },
            {name : "Time:", value:`${game["DateTime UTC"]} UTC`}
        )
    return Embed
}

export async function sendFinishedGame(game: game){

    const Embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setDescription("A Game from one of your Subscriptions that has ended")
        .setTitle('Finished Game')
        .setThumbnail('https://imgur.com/deu1U5t.jpeg')
        .addFields(
            { name: "Teams", value: `${game.Team1} vs ${game.Team2}` },
            {name : "Time:", value:`${game["DateTime UTC"]} UTC`},
            {name : "Winner", value: game["Winning Team"]}
        )
    return Embed
}