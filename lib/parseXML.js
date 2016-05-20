/**
 * @alias parseXML
 * @private
 * @author jQuery
 * @copyright jQuery foundation
 * @license https://github.com/jquery/jquery/blob/master/LICENSE.txt
 *
 * @summary Parses XML string content
 * @param {string} data - content
 * @returns {xml}
 */
module.exports = function parseXML(data) {
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
};
