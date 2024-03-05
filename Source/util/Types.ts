/**
 * All necessary Types are defined in this File
 */


/**
 * return Type of api_connection functions
 */
export type game = {
    Team1: string,
    Team2: string,
    'DateTime UTC': string
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