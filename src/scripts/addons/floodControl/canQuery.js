/**
 * Tests a query with the cached time of it's last request.
 * @param {string} key - unique id of the request
 * @param {number} delay - delay to test against, in milliseconds
 * @returns {boolean}
 */
module.exports = function canQuery(key, delay) {
    "use strict";
    var val = this.get(key);

    if (val) {
        if (val >= Date.now() - delay) {
            return false;
        } else {
            this.update(key, Date.now());
            return true;
        }
    } else {
        this.add(key, Date.now());
        return true;
    }
};
