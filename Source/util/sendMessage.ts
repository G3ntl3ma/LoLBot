import {EmbedBuilder} from 'discord.js'
import {game} from './Types'

export async function sendUpcomingGame(game: game, team: string, time:string){
    console.log(time)
    let logoURL : string = "https://imgur.com/deu1U5t.jpeg";
    const info = await fetch(
        `https://lol.fandom.com/api.php?action=query&format=json&prop=imageinfo&titles=File:${team}logo%20square.png&iiprop=url`);
    const data = await info.json();
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
            {name : "Time:", value: time}
        )
    return Embed
}

export async function sendFinishedGame(game: any, time:string){
    let Winner = ""
    if(game.WinTeam ! = undefined){
        Winner = game.WinTeam
    }
    else if(game.Winner === "1"){
        Winner = game.Team1
    }
    else{
        Winner = game.Team2
    }
    const vsString: string = `${game.Team1} vs ${game.Team2}`;

    let logoURL : string = "https://imgur.com/deu1U5t.jpeg";
    const info = await fetch(
        `https://lol.fandom.com/api.php?action=query&format=json&prop=imageinfo&titles=File:${Winner}logo%20square.png&iiprop=url`);
    const data = await info.json();
    for (let i in data["query"]["pages"]) {
        logoURL = data["query"]["pages"][i]["imageinfo"][0]["url"]
    }

    const Embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setDescription(vsString)
        .setTitle('Finished Game')
        .setThumbnail('https://imgur.com/deu1U5t.jpeg')
        .addFields(
            {name : "Time:", value: time},
            {name : "Winner", value: Winner}
        )
        .setImage(logoURL)
    return Embed
}