var parseResponse = require("./parseResponse");

module.exports = function(req, c) {
    var resp;

    // Headers & status are received
    if (req.readyState === 2) {
        if (c.onHeaders) {
            c.onHeaders(req.getAllResponseHeaders());
        }
    }

    // request is complete and successful
    if (req.readyState === 4) {
        try {
            resp = parseResponse(req.response, c.responseType);
        } catch (e) {
            if (e instanceof SyntaxError) {
                throw new SyntaxError("unable to parse response of type: " + c.responseType + " for\n" + req.response);
            } else {
                throw Error(e);
            }
        }

        // dispatch to callbacks
        if (c.onSuccess && req.status.toString().charAt(0) === "2") {
            // SUCCESS
            c.onSuccess({
                response: resp,
                status: req.status,
                getHeader: function(name) {
                    return req.getResponseHeader.call(req, name);
                }
            });
        } else if (c.onSuccess && req.status.toString() === "304") {
            // USE CACHE ???
            c.onSuccess({
                response: resp,
                status: req.status,
                getHeader: function(name) {
                    return req.getResponseHeader.call(req, name);
                }
            });
        } else if (c.onFailure && /4|5/.test(req.status.toString().charAt(0))) {
            // FAILURE
            c.onFailure({
                response: resp,
                status: req.status,
                getHeader: function(name) {
                    return req.getResponseHeader.call(req, name);
                }
            });
        }
    }
};
