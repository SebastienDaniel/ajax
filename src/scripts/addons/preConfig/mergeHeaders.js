/**
 * Merges the properties of the base object into the extends object,
 * if they don't already exist in the extends object
 * @param base {object}
 * @param ext {object}
 * @returns {object}
 */
module.exports = function mergeHeaders(base, ext) {
    "use strict";
    if (base && typeof base === "object") {
        return Object.keys(base).reduce(function (ext, key) {
            if (ext[key] === undefined) {
                ext[key] = base[key];
            }
            return ext;
        }, ext || {});
    } else {
        return ext;
    }
};
