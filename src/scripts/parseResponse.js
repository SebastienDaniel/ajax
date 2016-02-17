/**
 * @memberof ajax
 * @summary parses the response data based on provided responseType
 * @private
 * @param response {string} XMLHttpRequest response string
 * @param type {string} expected response type (json|text|arraybuffer|xml)
 * @returns {object|string}
 */
module.exports = function parseResponse(response, type) {
    if (response && response !== "") {
        if (type === "json") {
            return JSON.parse(response);
        }
    }

    return response;
};
