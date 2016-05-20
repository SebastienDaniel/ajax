var parseXML = require("./parseXML");

/**
 * @alias parseResponse
 * @private
 * @summary parses the response data based on provided responseType
 *
 * @param {object} xhr - XMLHttpRequest object
 * @returns {object|string}
 */
module.exports = function parseResponse(xhr) {
    "use strict";

    // only try to parse if not already parsed by xhr
    if (typeof xhr.response === "string" && xhr.response !== "") {
        if (xhr.responseType === "json") {
            return JSON.parse(xhr.response);
        } else if (xhr.type === "text/xml" || xhr.type === "xml") {
            return parseXML(xhr.response);
        }
    }

    return xhr.response;
};
