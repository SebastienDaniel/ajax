var parseResponse = require("./parseResponse");

/**
 * @summary triggers existing listeners based on state of request.
 * @param req
 * @param {string} responseType - configuration object responseType, to account for XHRv2 not being supported (i.e. can't set xhr.responseType value)
 * @param {object} listeners - object of eventName:array of callbacks
 */
module.exports = function(req, responseType, listeners) {
    "use strict";
    var resp;

    // Headers & status are received
    if (req.readyState === 2) {
        listeners.headers.forEach(function(cb) {
            cb(req);
        });
    }

    // request is complete
    if (req.readyState === 4) {
        // dispatch to callbacks
        if (listeners.success && /2|3/.test(req.status.toString().charAt(0))) {
            try {
                resp = parseResponse(req.response, responseType);
            } catch (e) {
                if (e instanceof SyntaxError) {
                    throw new SyntaxError("unable to parse response of type: " + responseType + " for\n" + req.response);
                } else {
                    throw Error(e);
                }
            }

            // SUCCESS
            listeners.success.forEach(function(cb) {
                cb(resp, req);
            });
        } else if (listeners.failure && /4|5/.test(req.status.toString().charAt(0))) {
            // FAILURE
            listeners.failure.forEach(function(cb) {
                cb(req);
            });
        }
    }
};
