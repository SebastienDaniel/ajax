var compileRequestHeaders = require("./compileRequestHeaders"),
    responseListener = require("./responseListener");

/**
 * @memberof ajax
 * @summary executes the XMLHttpRequest
 * @private
 * @param c {object} request configuration hash
 */
module.exports = function makeRequest(c) {
    var req = new XMLHttpRequest(),
        headers = compileRequestHeaders(c.headers);

    // start XMLHttpRequest
    req.open(c.method, c.url, true);

    // set request headers
    // must be done after open()
    Object.keys(headers).forEach(function(h) {
        req.setRequestHeader(h, headers[h]);
    });

    // request now going through
    req.onreadystatechange = function() {
        responseListener(req, c);
    };

    // handle timeout
    if (c.timeout) {
        req.timeout = c.timeout;
        if (c.onTimeout) {
            req.ontimeout = c.onTimeout;
        }
    }

    req.send(c.data);

    return req;
};
