var compileConfig = require("./compileConfig"),
    makeRequest = require("./makeRequest");

/**
 * @alias ajax
 * @public
 * @summary validates an ajax request object, bundles the XMLHttpRequest and returns the request object
 *
 * @param {object} c - query configuration object
 * @param {string} c.url - URL to query
 * @param {string} c.method - GET, POST, PUT, DELETE
 * @param {string} [c.data=""] - data to send when making POST or PUT request
 * @param {string} [c.responseType=text] - json, text, arraybuffer, xml
 * @param {Function} [c.onSuccess] - callback on 20* http status codes
 * @param {Function} [c.onFailure] - callback on 40* and 50* http status codes
 * @param {object} [c.headers={}] - name:value pairing to add HTTP headers to request
 * @param {number} [c.timeout] - number of milliseconds before aborting request
 *
 * @return {object} XMLHttpRequest object
 */
module.exports = function ajax(c) {
    return makeRequest(compileConfig(c));
};
