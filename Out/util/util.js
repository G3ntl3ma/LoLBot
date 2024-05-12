"use strict";
/**
 * Various Utility Classes that are used all over the place
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.localDateString = void 0;
function localDateString(dateString, locale) {
    const date = new Date(Date.UTC(Number(dateString.substring(0, 4)), Number(dateString.substring(5, 7)), Number(dateString.substring(8, 10)), Number(dateString.substring(11, 13)), Number(dateString.substring(14, 16)), 0, 0));
    return date.toLocaleString(locale);
}
exports.localDateString = localDateString;
