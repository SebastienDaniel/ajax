var parseResponse = require("./parseResponse");

module.exports = function(req, c) {
    var resp;

    // Headers & status are received
    if (req.readyState === 2) {
        if (c.onHeaders) {
            c.onHeaders(req.getAllResponseHeaders());
        }
    }

    // readyState === 3
    // content is downloading

    // request is complete
    if (req.readyState === 4) {
        // dispatch to callbacks
        if (c.onSuccess && /2|3/.test(req.status.toString().charAt(0))) {
            try {
                resp = parseResponse(req.response, c.responseType);
            } catch (e) {
                if (e instanceof SyntaxError) {
                    throw new SyntaxError("unable to parse response of type: " + c.responseType + " for\n" + req.response);
                } else {
                    throw Error(e);
                }
            }

            // SUCCESS
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
                response: req.response,
                status: req.status,
                getHeader: function(name) {
                    return req.getResponseHeader.call(req, name);
                }
            });
        }
    }
};
