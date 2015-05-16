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

        if (c.loaderTarget && c.loaderTarget.nodeType === 1) {
            startLoader(c.loaderTarget);
        }

        // start XMLHttpRequest
        req.open(c.method, c.url, c.async);
        setRequestHeaders(req, c);

        // request now going through
        req.onreadystatechange = function() {
            // Headers & status are received
            if (req.readyState === 2) {
                if (c.onHeaders !== null) {
                    c.onHeaders(req.getAllResponseHeaders());
                }
            }

            // downloading data (partials are available)
            //if (req.readyState === 3) {}

            // request is complete and successful
            if (req.readyState === 4) {
                // loader needs to be removed BEFORE callbacks
                if (c.loaderTarget && c.loaderTarget.nodeType === 1) {
                    stopLoader(c.loaderTarget);
                }
                if ((req.status === 200 /* get */ || req.status === 201 /* post */ || req.status === 204) /* delete */ && c.onSuccess !== null) {
                    c.onSuccess(getResponse(req, c), req.status);
                } else {
                    c.onFailure(getResponse(req, c), req.status);
                }
            }
        };
        req.send(c.data);
    }

    // set request headers based on c.headers
    function setRequestHeaders(req, c) {
        var headers = c.setHeaders || {};

        // set default values
        if (!c.setHeaders["Content-Type"]) {
            c.setHeaders["Content-Type"] = "application/json;charset=utf-8";
        }

        if (!c.setHeaders.Accept) {
            c.setHeaders.Accept = "application/json";
        }

        if (!c.setHeaders["X-Requested-With"]) {
            c.setHeaders["X-Requested-With"] = "XMLHttpRequest";
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

    function buildRequest(config) {
        // default config values
        var c = {
            async: config.async === false ? false : true,
            data: config.data || null,
            setHeaders: config.setHeaders || {},
            method: config.method.toUpperCase() || "GET",
            onFailure: config.onFailure || null,
            onHeaders: config.onHeaders || null,
            //onPartials: config.onPartials || null,
            onSuccess: config.onSuccess || null,
            responseType: config.responseType || "text",
            url: encodeURI(config.url).replace(/%5B/g, "[").replace(/%5D/g, "]") || null,
            loaderTarget: config.loadTarget || null
        };

        if (!c.url) {
            throw new Error("ajax request requires a URL");
        }

        if (!c.method) {
            throw new Error("ajax request requires a method (get,put,post,delete)");
        }

        if (Object.prototype.toString.call(c.setHeaders) !== "[object Object]") {
            throw new TypeError("ajax request requires headers to be an object");
        }

        sendRequest(c);
    }

    // public API
    return buildRequest;
}());
