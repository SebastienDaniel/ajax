/**
 * Created by Sebastien on 2015-02-19.
 */

var ajax = (function() {
    "use strict";
    var loader = document.createElement("div");
    loader.className = "ajax-loader";

    function startLoader(target) {
        target.appendChild(loader);
    }

    function stopLoader(target) {
        target.removeChild(loader);
    }

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

            // downloading data (partials are available)
            //if (req.readyState === 3) {}

            // request is complete and successful
            if (req.readyState === 4) {
                // loader needs to be removed BEFORE callbacks
                if (c.loaderTarget) {
                    stopLoader(c.loaderTarget);
                }

                // process sucess or failure callbacks
                if (req.status.toString().charAt(0) === "2" && c.onSuccess) {
                    c.onSuccess(getResponse(req, c), req.status);
                } else if(c.onFailure) {
                    c.onFailure(getResponse(req, c), req.status);
                }
            }
        };
        req.send(c.data);
    }

    // set request headers based on c.headers
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

    // parse response based on expected return type
    function getResponse(req, c) {
        var r = req.response;

        if (c.responseType && c.responseType === "json" && r !== "") {
            r = JSON.parse(r);
        }

        return r;
    }

    function validateConfig(c) {
        if (Object.prototype.toString.call(c.url) !== "[object String]") {
            throw new TypeError("ajax: requires a URL string");
        }

        if (c.loaderTarget && c.loaderTarget.nodeType !== 1) {
            throw new TypeError("ajax: 'loaderTarget' is not an HTML element");
        }

        if (c.setHeaders && Object.prototype.toString.call(c.setHeaders) !== "[object Object]") {
            throw new TypeError("ajax: 'setHeaders' is not an object");
        }

        if (c.onFailure && Object.prototype.toString.call(c.onFailure) !== "[object Function]") {
            throw new TypeError("ajax: onFailure must be a function");
        }
        if (c.onSuccess && Object.prototype.toString.call(c.onFailure) !== "[object Function]") {
            throw new TypeError("ajax: onFailure must be a function");
        }
        if (c.onHeaders && Object.prototype.toString.call(c.onFailure) !== "[object Function]") {
            throw new TypeError("ajax: onFailure must be a function");
        }

        return true;
    }

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

    // public API
    return {
        "get": function(c) {
            if (validateConfig(c)) {
                c.method = "GET";
                sendRequest(finalizeConfig(c));
            }
        },
        "post": function(c) {
            if (validateConfig(c)) {
                c.method = "POST";
                sendRequest(finalizeConfig(c));
            }
        },
        "put": function(c) {
            if (validateConfig(c)) {
                c.method = "PUT";
                sendRequest(finalizeConfig(c));
            }
        },
        "delete": function(c) {
            if (validateConfig(c)) {
                c.method = "DELETE";
                sendRequest(finalizeConfig(c));
            }
        }
    };
}());
