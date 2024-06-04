"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatSQLString = exports.allTimeZones = exports.localDateString = void 0;
const timezones_list_1 = __importDefault(require("timezones-list"));
/**
 * Various Utility Classes that are used all over the place
 */
function localDateString(dateString, zone) {
    console.log(zone);
    const date = new Date(Date.UTC(Number(dateString.substring(0, 4)), Number(dateString.substring(5, 7)), Number(dateString.substring(8, 10)), Number(dateString.substring(11, 13)), Number(dateString.substring(14, 16)), 0, 0));
    return date.toLocaleString("de-DE", { timeZone: zone });
}
exports.localDateString = localDateString;
/**
 * Returns a List with all Timezones
 */
function allTimeZones() {
    let list = [];
    for (let i of timezones_list_1.default) {
        list.push(i.tzCode);
    }
    return list;
}
exports.allTimeZones = allTimeZones;
/**
 * Format a JS Date to an SQL date String for Comparisons
  */
function formatSQLString(date) {
    const mutatedNewDate = date.toISOString().substring(0, 4) +
        date.toISOString().substring(5, 7) +
        date.toISOString().substring(8, 10) +
        date.toISOString().substring(11, 13) +
        date.toISOString().substring(14, 16) +
        date.toISOString().substring(17, 19);
    return mutatedNewDate;
}
exports.formatSQLString = formatSQLString;
