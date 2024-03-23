import {EmbedBuilder} from 'discord.js'
import {game} from './Types'
import {retrievePicUrl} from "./api_connection";

export async function sendUpcomingGame(game: game, team: string){
    //Get the Picture URL
    let picURL :string = "";
    const picInfo = await fetch(
        `https://lol.fandom.com/api.php?action=query&format=json&prop=imageinfo&titles=File:${team}logo%20square.png&iiprop=url`)
    const data = await picInfo.json();
    console.log(data)
    /*
    for (let i in data["query"]["pages"]) {
        picURL = data["query"]["pages"][i]["imageinfo"][0]["url"]
    }
    */
    let url = await retrievePicUrl(team)
    let Tournament: string;
    if(typeof(game.Tournament) === "string" && game.Tournament.length >= 1){
        Tournament = game.Tournament;
    }
    else{
        Tournament = "Teams"
    }
    const Embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setDescription("Upcoming Game from one of your Subscriptions")
        .setTitle('Upcoming Game:')
        .setThumbnail('https://imgur.com/deu1U5t.jpeg')
        .setImage(url)
        .addFields(
            { name: Tournament, value: `${game.Team1} vs ${game.Team2}` },
            {name : "Time:", value:`${game["DateTime UTC"]} UTC`}
        )
    return Embed
}