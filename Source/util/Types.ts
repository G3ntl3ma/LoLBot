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
    Tournament: string,
    "Winning Team": string
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

export enum LocaleOptions {
    "ar-SA" = "Arabic (Saudi Arabia)",
    "bn-BD" = "Bangla (Bangladesh)",
    "bn-IN" = "Bangla (India)",
    "cs-CZ" = "Czech (Czech Republic)",
    "da-DK" = "Danish (Denmark)",
    "de-AT" = "Austrian German",
    "de-CH" = "Swiss German",
    "de-DE" = "Standard German (Germany)",
    "el-GR" = "Modern Greek",
    "en-AU" = "Australian English",
    "en-CA" = "Canadian English",
    "en-GB" = "British English",
    "en-IE" = "Irish English",
    "en-IN" = "Indian English",
    "en-N" = "New Zealand English",
    "en-US" = "US English",
    "en-ZA" = "English (South Africa)",
    "es-AR" = "Argentine Spanish",
    "es-CL" = "Chilean Spanish",
    "es-CO" = "Colombian Spanish",
    "es-ES" = "Castilian Spanish (Central-Northern Spain)",
    "es-MX" = "Mexican Spanish",
    "es-US" = "American Spanish",
    "fa-IR" = "Iranian (Iran)",
    "fi-FI" = "Finnish (Finland)",
    "fr-BE" = "Belgian French",
    "fr-CA" = "Canadian French",
    "fr-CH" = "Swiss French",
    "fr-FR" = "Standard French (France)",
    "he-IL" = "Hebrew (Israel)",
    "hi-IN" = "Hindi (India)",
    "hu-HU" = "Hungarian (Hungary)",
    "id-ID" = "Indonesian (Indonesia)",
    "it-CH" = "Swiss Italian",
    "it-IT" = "Standard Italian (Italy)",
    "ja-JP" = "Japanese (Japan)",
    "ko-KR" = "Korean (Republic of Korea)",
    "nl-BE" = "Belgian Dutch",
    "nl-NL" = "Standard Dutch (Netherlands)",
    "no-NO" = "Norwegian (Norway)",
    "pl-PL" = "Polish (Poland)",
    "pt-BR" = "Brazilian Portuguese",
    "pt-PT" = "European Portuguese (Portugal)",
    "ro-RO" = "Romanian (Romania)",
    "ru-RU" = "Russian (Russian Federation)",
    "sk-SK" = "Slovak (Slovakia)",
    "sv-SE" = "Swedish (Sweden)",
    "ta-IN" = "Indian Tamil",
    "ta-LK" = "Sri Lankan Tamil",
    "th-TH" = "Thai (Thailand)",
    "tr-TR" = "Turkish (Turkey)",
    "zh-CN" = "Mainland China, simplified characters",
    "zh-HK" = "Hong Kong, traditional characters",
    "zh-TW" = "Taiwan, traditional characters"
}