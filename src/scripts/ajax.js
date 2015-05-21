/**
 * @namespace ajax
 * @summary module to make ajax requests
 */
var ajax = (function() {
    "use strict";
    /**
     * @summary loader HTML element injected into loaderTarget when ajax is running
     * @private
     * @type {Element}
     */
    var loader = document.createElement("div");
    loader.className = "ajax-loader";

    /**
     * @memberof ajax
     * @summary injects the loader element into loaderTarget
     * @private
     * @param target {Element}
     */
    function startLoader(target) {
        target.appendChild(loader);
    }

    /**
     * @memberof ajax
     * @summary removes the loader from loaderTarget
     * @private
     * @param target {Element}
     */
    function stopLoader(target) {
        target.removeChild(loader);
    }

    /**
     * @memberof ajax
     * @summary executes the XMLHttpRequest
     * @private
     * @param c {object} request configuration hash
     */
    function sendRequest(c) {
        var req = new XMLHttpRequest();

        if (c.loaderTarget) {
            startLoader(c.loaderTarget);
        }

        // start XMLHttpRequest
        req.open(c.method, c.url, c.async);
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
                // loader needs to be removed BEFORE callbacks
                if (c.loaderTarget) {
                    stopLoader(c.loaderTarget);
                }

                // process success or failure callbacks
                if (req.status.toString().charAt(0) === "2" && c.onSuccess) {
                    c.onSuccess({
                        response: getResponse(req, c),
                        status: req.status,
                        getHeader: req.getResponseHeader
                    });
                } else if (c.onFailure) {
                    c.onFailure({
                        response: getResponse(req, c),
                        status: req.status,
                        getHeader: req.getResponseHeader
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
     * @summary verifies content provided by configuration object
     * @param c {object} configuration hash
     * @returns {boolean} result of validation (true|false)
     */
    function validateConfig(c) {
        if (Object.prototype.toString.call(c.url) !== "[object String]") {
            throw new TypeError("ajax: requires a URL string");
        }

        if (c.loaderTarget && c.loaderTarget.nodeType !== 1) {
            throw new TypeError("ajax: 'loaderTarget' is not an HTML element");
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
            throw new TypeError("ajax: onFailure must be a function");
        }
        if (c.onHeaders && Object.prototype.toString.call(c.onHEaders) !== "[object Function]") {
            throw new TypeError("ajax: onFailure must be a function");
        }

        if (c.responseType) {
            if (!["json","text","arraybuffer","document","blob"].some(function(value) {
                    return value === c.responseType;
                })) {
                throw new Error("ajax: responseType must have one of the following value:\njson\ntext\ndocument\nblob\narraybuffer");
            }
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
            async: !!c.async,
            data: c.data || null,
            setHeaders: c.setHeaders || {},
            method: c.method,
            onFailure: c.onFailure || null,
            onHeaders: c.onHeaders || null,
            onSuccess: c.onSuccess || null,
            responseType: c.responseType || "text",
            url: encodeURI(c.url).replace(/%5B/g, "[").replace(/%5D/g, "]"),
            loaderTarget: c.loadTarget || null
        };
    }

    function query(c) {
        if (validateConfig(c)) {
            sendRequest(finalizeConfig(c));
        }
    }

    return query;
}());
