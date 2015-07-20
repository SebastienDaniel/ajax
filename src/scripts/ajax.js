/**
 * @namespace ajax
 * @summary module to make ajax requests
 */
var ajax = (function() {
    "use strict";

    /**
     * @memberof ajax
     * @summary executes the XMLHttpRequest
     * @private
     * @param c {object} request configuration hash
     */
    function sendRequest(c) {
        var req = new XMLHttpRequest();

        // start XMLHttpRequest
        req.open(c.method, c.url, true);
        setRequestHeaders(req, c.setHeaders);

        // request now going through
        req.onreadystatechange = function() {
            // Headers & status are received
            if (req.readyState === 2) {
                if (c.onHeaders) {
                    c.onHeaders(req.getAllResponseHeaders());
                }
            }

            // request is complete and successful
            if (req.readyState === 4) {
                // process success or failure callbacks
                if (req.status.toString().charAt(0) === "2" && c.onSuccess) {
                    c.onSuccess({
                        response: getResponse(req, c),
                        status: req.status,
                        getHeader: function(name) {
                            return req.getResponseHeader.call(req, name);
                        }
                    });
                } else if (c.onFailure) {
                    c.onFailure({
                        response: getResponse(req, c),
                        status: req.status,
                        getHeader: function(name) {
                            return req.getResponseHeader.call(req, name);
                        }
                    });
                }
            }
        };
        req.send(c.data);
    }

    /**
     * @memberof ajax
     * @summary sets basic headers for the request and sets the additional ones provided by the configuration
     * @private
     * @param req {object} XMLHttpRequest object
     * @param headers {object} additional headers to be injected
     */
    function setRequestHeaders(req, headers) {
        // set default values
        if (!headers["Content-Type"]) {
            headers["Content-Type"] = "application/json;charset=utf-8";
        }

        if (!headers.Accept) {
            headers.Accept = "application/json";
        }

        if (!headers["X-Requested-With"]) {
            headers["X-Requested-With"] = "XMLHttpRequest";
        }

        // get all object (t) keys from own properties
        // inject them as request headers
        Object.keys(headers).forEach(function(header) {
            req.setRequestHeader(header, headers[header]);
        });

        // xhr2 spec
        if (req.responseType) {
            req.responseType = c.responseType; // "arraybuffer", "blob", "document", "json", "text"
        }
    }

    /**
     * @memberof ajax
     * @summary parses the response data based on provided responseType
     * @private
     * @param req {object} XMLHttpRequest object
     * @param c {object} configuration hash
     * @returns the parsed data
     */
    function getResponse(req, c) {
        var r = req.response;

        if (c.responseType && c.responseType === "json" && r !== "") {
            r = JSON.parse(r);
        }

        return r;
    }

    /**
     * @memberof ajax
     * @private
     * @summary verifies content provided by configuration object, throws error on missing critical properties
     * @param c {object} configuration hash
     * @returns {boolean} result of validation (true|false)
     */
    function validateConfig(c) {
        if (Object.prototype.toString.call(c.url) !== "[object String]") {
            throw Error("ajax: requires a URL string");
        }

        if (Object.prototype.toString.call(c.method) === "[object String]") {
            c.method = c.method.toUpperCase();
            if (!["GET","POST","PUT","DELETE"].some(function(method) {
                return method === c.method;
            })) {
                throw new TypeError("ajax: 'method' must have one of the following values:\nGET\nPOST\nPUT\nDelete");
            }
        } else {
            throw Error("ajax: query 'method' is required");
        }

        if (c.setHeaders && Object.prototype.toString.call(c.setHeaders) !== "[object Object]") {
            throw new TypeError("ajax: 'setHeaders' is not an object");
        }

        if (c.onFailure && Object.prototype.toString.call(c.onFailure) !== "[object Function]") {
            throw new TypeError("ajax: onFailure must be a function");
        }
        if (c.onSuccess && Object.prototype.toString.call(c.onSuccess) !== "[object Function]") {
            throw new TypeError("ajax: onSuccess must be a function");
        }
        if (c.onHeaders && Object.prototype.toString.call(c.onHeaders) !== "[object Function]") {
            throw new TypeError("ajax: onHeaders must be a function");
        }

        if (c.responseType) {
            if (!["json","text","arraybuffer","document","blob"].some(function(value) {
                    return value === c.responseType;
                })) {
                throw new Error("ajax: responseType must have one of the following value:\njson\ntext\ndocument\nblob\narraybuffer");
            }
        }

        if (c.data && Object.prototype.toString.call(c.data) !== "[object String]") {
            throw new TypeError("ajax: data must be a string");
        }

        return true;
    }

    /**
     * @memberof ajax
     * @private
     * @summary builds the final request configuration object
     * @param c {object} configuration hash
     * @returns {
     *  {
     *   async: boolean,
     *   data: (object|null),
     *   setHeaders: (object|{}),
     *   method: string,
     *   onFailure: (function|null),
     *   onHeaders: (function|null),
     *   onSuccess: (function|null),
     *   responseType: (string),
     *   url: string,
     *   loaderTarget: (Element|null)
     *   }
     *  }
     */
    function finalizeConfig(c) {
        return {
            data: c.data || null,
            setHeaders: c.setHeaders || {},
            method: c.method,
            onFailure: c.onFailure || null,
            onHeaders: c.onHeaders || null,
            onSuccess: c.onSuccess || null,
            responseType: c.responseType || "text",
            url: encodeURI(c.url).replace(/%5B/g, "[").replace(/%5D/g, "]")
        };
    }

    function query(c) {
        if (validateConfig(c)) {
            sendRequest(finalizeConfig(c));
        }
    }

    return query;
}());

// adding commonJS exports if module.exports is part of the env. otherwise expose as a global module.
if (typeof module !== undefined && typeof module.exports !== undefined) {
    module.exports = ajax;
} else {
    window.ajax = ajax;
}
