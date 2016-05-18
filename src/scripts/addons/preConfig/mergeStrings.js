/**
 * Merges strings together, in a chain
 * @returns {string}
 */
module.exports = function mergeStrings() {
    "use strict";
    var str = "",
        aL = arguments.length,
        i = 0;

    while (i < aL) {
        if (typeof arguments[i] === "string") {
            str += arguments[i] || "";
        }
        i++;
    }

    return str;
};
