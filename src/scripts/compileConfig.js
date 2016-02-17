/**
 * @memberof ajax
 * @private
 * @summary verifies content provided by configuration object, throws error on missing critical properties
 * @param c {object} configuration hash
 * @returns {object}
 */

// url = string

function compileFinalConfig(c) {
    var o = {};

    // url must be string
    if (typeof c.url !== "string") {
        throw new TypeError("ajax request object expects prop 'url' to be a string. Provided\n" + c.url + " (" + typeof c.url + ")");
    } else {
        o.url = encodeURI(c.url).replace(/%5B/g, "[").replace(/%5D/g, "]");
    }

    // timeout can be set
    if (c.timeout) {
        if (typeof c.timeout !== "number") {
            throw TypeError("ajax request object timeout property must be an integer. Provided\n" + c.timeout + " (" + typeof c.timeout + ")");
        } else {
            o.timeout = c.timeout;
        }
    }

    // request method must be uppercase string === GET | POST | PUT | DELETE
    if (typeof c.method === "string") {
        if (["GET","POST","PUT","DELETE"].indexOf(c.method.toUpperCase()) === -1) {
            throw new TypeError("ajax: 'method' must have one of the following values:\nGET\nPOST\nPUT\nDELETE");
        } else {
            o.method = c.method.toUpperCase();
        }
    } else {
        throw new TypeError("ajax request object expects property 'method' to one of:\n GET, POST, PUT, DELETE\n Provided:\n" + c.method);
    }

    if (c.setHeaders) {
        if (Object.prototype.toString.call(c.setHeaders) !== "[object Object]") {
            throw new TypeError("ajax request object expects prop 'setHeaders' to be an object of key:value pairing for header:value\nProvided:\n" + c.setHeaders);
        } else {
            o.setHeaders = c.setHeaders;
        }
    } else {
        o.setHeaders = {};
    }

    if (c.onFailure) {
        if (typeof c.onFailure !== "function") {
            throw new TypeError("ajax request object prop 'onFailure' must be a function. Provided\n" + c.onFailure + " (" + typeof c.onFailure + ")");
        } else {
            o.onFailure = c.onFailure;
        }
    }
    if (c.onSuccess) {
        if (typeof c.onSuccess !== "function") {
            throw new TypeError("ajax request object prop 'onSuccess' must be a function. Provided\n" + c.onSuccess + " (" + typeof c.onSuccess + ")");
        } else {
            o.onSuccess = c.onSuccess;
        }
    }
    if (c.onHeaders) {
        if (typeof c.onHeaders !== "function") {
            throw new TypeError("ajax request object prop 'onHeaders' must be a function. Provided\n" + c.onHeaders + " (" + typeof c.onHeaders + ")");
        } else {
            o.onHeaders = c.onHeaders;
        }
    }

    if (c.onTimeout) {
        if (typeof c.onTimeout !== "function") {
            throw new TypeError("ajax request object prop 'onTimeout' must be a function. Provided\n" + c.onTimeout + " (" + typeof c.onTimeout + ")");
        } else {
            o.onTimeout = c.onTimeout;
        }
    }

    if (c.responseType) {
        if (["json","text","arraybuffer","document","blob"].indexOf(c.responseType.toLowerCase())) {
            throw new Error("ajax: responseType must have one of the following values:\njson\ntext\ndocument\nblob\narraybuffer\n\nProvided: " + c.responseType);
        } else {
            o.responseType = c.responseType.toLowerCase();
        }
    } else {
        o.responseType = "text";
    }

    if (c.data) {
        if (typeof c.data !== "string") {
            throw new TypeError("ajax request object prop 'data' must be a string. Provided\n" + c.data + " (" + typeof c.data + ")");
        } else {
            o.data = c.data;
        }
    } else {
        o.data = "";
    }

    return o;
}

module.exports = function compileConfig(c) {
    if (Object.prototype.toString.call(c) !== "[object Object]") {
        throw new TypeError("ajax request expects an object argument. Provided\n" + c + " (" + typeof c + ")");
    }
    return compileFinalConfig(c);
};
