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
 * @param response {string} XMLHttpRequest response string
 * @param type {string} expected response type (json|text|arraybuffer|xml)
 * @returns {object|string}
 */
module.exports = function parseResponse(response, type) {
    if (typeof response === "string") {
        if (response !== "") {
            if (type === "json") {
                return JSON.parse(response);
            } else if (type === "text/xml" || type === "xml") {
                return parseXML(response);
            }
        }
    }

    return response;
};