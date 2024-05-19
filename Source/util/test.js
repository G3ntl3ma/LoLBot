let timezones = require("timezones-list")
let date = new Date()
console.log(date.toLocaleString("en-US", {timeZone: "Etc/GMT+1", hour12: false}))

let zones = []
for(let i of timezones.default){
    zones.push(i.tzCode)
}
console.log(zones.indexOf("Etc/GMT+1"))