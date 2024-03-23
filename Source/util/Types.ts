/**
 * All necessary Types are defined in this File
 */


/**
 * return Type of api_connection functions
 */
export type game = {
    'DateTime UTC': string,
    Team1: string,
    Team2: string,
    Tournament: string | undefined |null,
    Winner: string |undefined |null
}
/**
 * The Format of how Infos about a Guild are stored
 */
export type serverInfo = {
    _id: string,
        //ServerID
    out: string,
     //Output Channel
    teamSubs: [{
        code?: string
    }],
    //Array of all teams that the Server is subscribed to
    leagueSubs : [{
        code?: string
    }]
}