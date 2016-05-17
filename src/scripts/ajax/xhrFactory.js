var responseListener = require("./responseListener");

/**
 * @memberof ajax
 * @summary executes the XMLHttpRequest
 * @private
 * @param c {object} - request configuration hash
 * @param listeners {function[]} - callback functions for each event type  
 */
module.exports = function xhr(c, listeners) {
    "use strict";
    var req = new XMLHttpRequest();

    // early abort, if config invalid
    if (Object.prototype.toString.call(c) !== "[object Object]") {
        return;
    }

    // bind listeners
    req.onreadystatechange = function() {
        responseListener(req, c.responseType || "text", listeners);
    };

    // start XMLHttpRequest
    req.open(c.method, c.url, true);

    // set request headers
    // must be done after open()
    Object.keys(c.headers || {}).forEach(function(h) {
        req.setRequestHeader(h, c.headers[h]);
    });

    // handle timeout
    if (c.timeout) {
        req.timeout = c.timeout;
        req.ontimeout = function() {
            listeners.timeout.forEach(function(cb) {
                cb(req);
            });
        };
    }

    req.send(c.data);

    return req;
};
