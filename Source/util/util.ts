import timezones from "timezones-list"

/**
 * Various Utility Classes that are used all over the place
 */

export function localDateString(dateString: string, zone: string){
    console.log(zone)
    const date: Date = new Date(Date.UTC(
        Number(dateString.substring(0, 4)),
        Number(dateString.substring(5, 7)),
        Number(dateString.substring(8, 10)),
        Number(dateString.substring(11, 13)),
        Number(dateString.substring(14, 16)),
        0,
        0,
    ))
    return date.toLocaleString("de-DE", {timeZone : zone})
}

/**
 * Returns a List with all Timezones
 */
export function allTimeZones(){
    let list : string[] = []
    for(let i of timezones){
        list.push(i.tzCode)
    }
    return list
}

/**
 * Format a JS Date to an SQL date String for Comparisons
  */
export function formatSQLString(date:Date){
const mutatedNewDate :string =
        date.toISOString().substring(0, 4) +
        date.toISOString().substring(5, 7) +
        date.toISOString().substring(8, 10) +
        date.toISOString().substring(11, 13) +
        date.toISOString().substring(14, 16) +
        date.toISOString().substring(17, 19)
  return mutatedNewDate;
}
