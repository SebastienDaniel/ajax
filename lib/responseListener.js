var parseResponse = require("./parseResponse");

/**
 * @summary triggers existing listeners based on state of XMLHttpRequest.
 * @param xhr
 * @param {object} c - configuration object
 */
module.exports = function(xhr, c) {
    "use strict";
    var resp;

    switch (xhr.readyState) {
        case 1: {
            if (c.onOpen.length) {
                c.onOpen.forEach(function (cb) {
                    cb(xhr);
                });
            }
            break;
        }
        case 2: {
            if (c.onHeaders.length) {
                c.onHeaders.forEach(function (cb) {
                    cb(xhr);
                });
            }
            break;
        }
        case 4: {
            // dispatch to callbacks
            if (c.onSuccess.length && /2|3/.test(xhr.status.toString().charAt(0))) {
                try {
                    resp = parseResponse(xhr.response, c.responseType);
                } catch (e) {
                    if (e instanceof SyntaxError) {
                        throw new SyntaxError("unable to parse response of type: " + c.responseType + " for\n" + xhr.response);
                    } else {
                        throw Error(e);
                    }
                }

                // SUCCESS
                c.onSuccess.forEach(function(cb) {
                    cb(xhr, resp);
                });
            } else if (c.onFailure.length && /4|5/.test(xhr.status.toString().charAt(0))) {
                // FAILURE
                c.onFailure.forEach(function(cb) {
                    cb(xhr);
                });
            }
            break;
        }
        default: {
            break;
        }
    }
};
