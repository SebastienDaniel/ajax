/**
 * @namespace ajax
 * @description module to make ajax requests
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
                        response: parseResponse(req.response, c.responseType),
                        status: req.status,
                        getHeader: function(name) {
                            return req.getResponseHeader.call(req, name);
                        }
                    });
                } else if (req.status.toString() === "304" && c.onSuccess) {
                    c.onSuccess({
                        response: parseResponse(c.cacheData, c.responseType),
                        status: req.status,
                        getHeader: function(name) {
                            return req.getResponseHeader.call(req, name);
                        }
                    });
                } else if (c.onFailure) {
                    c.onFailure({
                        response: parseResponse(req.response, c.responseType),
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
     * @param response {Object} XMLHttpRequest response string
     * @param type {String} expected response type (json|text|arraybuffer|xml)
     * @returns the parsed data
     */
    function parseResponse(response, type) {
        var final = response || "";
        if (response && response !== "") {
            if (type === "json") {
                final = JSON.parse(response);
            }
        }

        return final;
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

    /**
     * @memberof ajax
     * @private
     * @summary determines how to handle the request based on communication with ajaxCache module
     *
     * @param c {Object} finalized ajax request object
     */
    function queryWithCache(c) {
        switch (c.method) {
            case "GET": {
                var date;

                // check if has passed repeat control
                if (ajaxCache.canQuery(c.url, c.method, c.data)) {
                    date = ajaxCache.getCacheDate(c.url, c.method);
                    // we have a cached copy, send it to the AJAX request
                    if (date) {
                        c.setHeaders["If-Modified-Since"] = date;
                        c.cacheData = ajaxCache.getCacheData(c.url);
                    }
                    // make the ajax request
                    sendRequest(c);
                } else {
                    c.onFailure({
                        response: "same GET request was made in too short an interval",
                        status: "429"
                    });
                }
                break;
            }
            case "POST": {
                if (ajaxCache.canQuery(c.url, c.method, c.data)) {
                    sendRequest(c);
                } else {
                    c.onFailure({
                        response: "same POST was made in too short an interval",
                        status: "429"
                    });
                }
                break;
            }
            case "PUT": {
                if (ajaxCache.canQuery(c.url, c.method, c.data)) {
                    sendRequest(c);
                } else {
                    c.onFailure({
                        response: "same PUT was made in too short an interval",
                        status: "429"
                    });
                }
                break;
            }
            case "DELETE": {
                if (ajaxCache.canQuery(c.url, c.method)) {
                    sendRequest(c);
                } else {
                    c.onFailure({
                        response: "DELETE operation has already been processed for this URI",
                        status: "429"
                    });
                }
                break;
            }
            default: {
                throw Error("somehow a bad request method made it here");
            }
        }
    }
    /**
     * @memberof ajax
     * @alias ajax
     *
     * @param c {Object} ajax query configuration object
     * @param {string} c.url - URL to query
     * @param {string} c.method - GET|POST|PUT|DELETE
     * @param {string} c.data - data to send when making POST or PUT request
     * @param {string} c.responseType - arraybuffer|json|text|xml expected data format of response
     * @param {Function} c.onSuccess - callback on 20* http status codes
     * @param {Function} c.onFailure - callback on 40* http status codes
     * @param {Object} c.setHeaders - name:value pairing to add HTTP headers to request
     */
    function query(c) {
        if (validateConfig(c)) {
            // make regular request
            if (c.ignoreCache || !ajaxCache) {
                sendRequest(finalizeConfig(c));
            } else {
                queryWithCache(finalizeConfig(c));
            }
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
