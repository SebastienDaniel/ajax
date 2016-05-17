/**
 * Maps a function to an array of functions, otherwise returns an empty array.
 * @param {function|function[]|undefined|null} v - initial value to map to an array
 * @returns {function[]|array} - array of functions or empty array
 */
module.exports = function mapCallbacks(v) {
    "use strict";

    if (typeof v === "function") {
        return [v];
    }

    if (Array.isArray(v)) {
        v.forEach(function(fn) {
            if (typeof fn !== "function") {
                throw new TypeError("expected function or array of functions for callbacks. Provided\n" + fn + " (" + typeof fn + ")");
            }
        });

        return v;
    }

    if (v === null || v === undefined) {
        return [];
    } else {
        throw new TypeError("expected function or array of functions for callbacks. Provided\n" + v + " (" + typeof v + ")");
    }
};
