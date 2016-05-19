var mapCallbacks = require("./mapCallbacks");

/**
 * @summary enforces required properties of the request configuration object.
 * @param {object} c - request configuration object
 */
function finalizeParams(c) {
    "use strict";

    if (Object.prototype.toString.call(c) !== "[object Object]") {
        throw new TypeError("ajax request expects an object argument. Provided\n" + c + " (" + typeof c + ")");
    }

    // url must be string
    if (typeof c.url !== "string") {
        throw new TypeError("ajax request object expects prop 'url' to be a string. Provided\n" + c.url + " (" + typeof c.url + ")");
    }

    // timeout can be set
    if (c.timeout && typeof c.timeout !== "number") {
        throw new TypeError("ajax request object timeout property must be an integer. Provided\n" + c.timeout + " (" + typeof c.timeout + ")");
    }

    // request method must be uppercase string === GET | POST | PUT | DELETE
    if (typeof c.method === "string") {
        // enforce proper case
        c.method = c.method.toUpperCase();

        if (["GET","POST","PUT","DELETE"].indexOf(c.method) === -1) {
            throw new RangeError("ajax: 'method' must have one of the following values:\nGET\nPOST\nPUT\nDELETE\nProvided: " + c.method);
        }
    } else {
        throw new RangeError("ajax request object expects property 'method' to be one of:\n GET, POST, PUT, DELETE\n Provided:\n" + c.method);
    }

    // optional
    if (c.responseType) {
        // enforce proper case
        c.responseType = c.responseType.toLowerCase();

        if (["json","text","xml","text/xml","text/html","arraybuffer","blob"].indexOf(c.responseType) === -1) {
            throw new RangeError("ajax: responseType must have one of the following values:\narraybuffer\nblob\njson\ntext\nxml\ntext/xml\ntext/html\n\nProvided: " + c.responseType);
        }
    } else {
        c.responseType = "text";
    }

    // force mandatory X-Requested-With header
    if (c.headers) {
        if (Object.prototype.toString.call(c.headers) !== "[object Object]") {
            throw new TypeError("ajax request object expects prop 'headers' to be an object of key:value pairing for header:value\nProvided:\n" + c.headers);
        } else {
            Object.keys(c.headers).forEach(function(key) {
                if (typeof c.headers[key] !== "string") {
                    throw new TypeError("ajax request object 'headers' properties must all be strings.\nProvided " + typeof c.headers[key] + " for " + key);
                }
            });

            if (!c.headers["X-Requested-With"]) {
                c.headers["X-Requested-With"] = "XMLHttpRequest";
            }
        }
    } else {
        c.headers = {
            "X-Requested-With": "XMLHttpRequest"
        };
    }

    if (c.method === "POST" || c.method === "PUT") {
        if (typeof c.data !== "string") {
            throw new TypeError("ajax request object prop 'data' must be present on POST or PUT requests and must be a string. Provided\n" + c.data + " (" + typeof c.data + ")");
        }
    }

    ["onOpen", "onHeaders", "onSuccess", "onFailure"].forEach(function(key) {
        c[key] = mapCallbacks(c[key]);
    });

    return c;
}

module.exports = finalizeParams;
