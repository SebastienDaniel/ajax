/**
 * Tests a query with the cached time of it's last request.
 * @param {string} key - unique id of the request
 * @param {number} delay - delay to test against, in milliseconds
 * @returns {boolean}
 */
module.exports = function canQuery(key, delay) {
    "use strict";
    var val = this.get(key);

    if (typeof val === "number" && val >= Date.now() - delay) {
        return false;
    } else {
        this.set(key, Date.now());
        return true;
    }
};
