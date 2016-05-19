/**
 * @author jQuery
 * @copyright jQuery foundation
 * @license https://github.com/jquery/jquery/blob/master/LICENSE.txt
 *
 * Parses XML string content
 * @param {string} data - content
 * @returns {xml}
 */
function parseXML(data) {
    "use strict";
    var xml;

    // Support: IE9
    try {
        xml = (new window.DOMParser()).parseFromString(data, "text/xml");
    } catch (e) {
        xml = undefined;
    }

    if (!xml || xml.getElementsByTagName("parsererror").length) {
        throw new SyntaxError("");
    }

    return xml;
}

/**
 * @memberof ajax
 * @summary parses the response data based on provided responseType
 * @private
 * @param xhr {object} XMLHttpRequest object
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
