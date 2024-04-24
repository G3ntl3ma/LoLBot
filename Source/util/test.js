
//get all Games with a Date between the Past and the Last Day
let newDate = new Date()
newDate.setDate(newDate.getUTCDate())
let mutatedNewDate = newDate.toISOString().substring(0, 4) +
    newDate.toISOString().substring(5, 7) +
    newDate.toISOString().substring(8, 10) +
    newDate.toISOString().substring(11, 13) +
    newDate.toISOString().substring(14, 16) +
    newDate.toISOString().substring(17, 19)
let oldDate = new Date()
oldDate.setDate(oldDate.getUTCDate() - 1)
const mutatedOldDate = oldDate.toISOString().substring(0, 4) +
    oldDate.toISOString().substring(5, 7) +
    oldDate.toISOString().substring(8, 10) +
    oldDate.toISOString().substring(11, 13) +
    oldDate.toISOString().substring(14, 16) +
    oldDate.toISOString().substring(17, 19)
let fetchRequest = `https://lol.fandom.com/api.php?action=cargoquery&
    format=json&limit=max&tables=ScoreboardGames&fields=WinTeam,Team1,Team2,DateTime_UTC, Tournament&
    where=DateTime_UTC >= '${mutatedOldDate}'`

let secondRequest =  `https://lol.fandom.com/api.php?action=cargoquery&
    format=json&limit=max&tables=MatchSchedule&fields=Winner,Team1,Team2,DateTime_UTC&
    where=DateTime_UTC >= '${mutatedOldDate}'`

Promise.all([
    fetch(fetchRequest).then(res => res.json()),
    fetch(secondRequest).then(res => res.json())
]).then(([res1, res2]) => {

    let common = []
    for(let i of res1.cargoquery){
        for(let j of res2.cargoquery){
            console.log(i.title.Team1)
            console.log(j.title.Team1)
            if(i.title.Team1 === j.title.Team1 && j.title.Team2 === i.title.Team2 && j.title["DateTime UTC"] === i.title["DateTime UTC"]){
                common.push(i.title)
            }
        }
    }
    console.log(common)
})