var compileConfig = require("./compileConfig"),
    makeRequest = require("./makeRequest");

/**
 * @memberof ajax
 * @alias ajax
 *
 * @param c {Object} ajax query configuration object
 * @param {string} c.url - URL to query
 * @param {string} c.method - GET|POST|PUT|DELETE
 * @param {string} c.data - data to send when making POST or PUT request
 * @param {string} c.responseType - arraybuffer|json|text|xml expected data format of response
 * @param {Function} c.onSuccess - callback on 20* http status codes
 * @param {Function} c.onFailure - callback on 40* http status codes
 * @param {Object} c.setHeaders - name:value pairing to add HTTP headers to request
 */
module.exports = function ajax(c) {
    return makeRequest(compileConfig(c));
};
