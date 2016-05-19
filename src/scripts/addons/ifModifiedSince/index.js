var Dictionary = require("sebastiendaniel-adt/Dictionary"),
    wrapSuccessCallbacks = require("./successWrapper"),
    addSuccessCallback = require("./addSuccessCallback"),
    addHeader = require("./addHeader");

// determine if the request exists in cache (GET only)
    // if TRUE
        // add If-Modified-Since header, using cached time
        // wrap onSuccess callbacks to provide cached data if server responds with 304
    // if FALSE
        // add success callback to store result in cache

// pass on config

function ifModifiedSince() {
    "use strict";
    var cache = new Dictionary();

    return function(config) {
        // only handle GET requests
        if (config.method === "GET") {
            // url has been queried before
            if (cache.has(config.url)) {
                addHeader(config, cache);
                wrapSuccessCallbacks(config, cache);
            }

            // always add the onSuccess callback to update cache
            addSuccessCallback(config, cache);
        }

        return config;
    };
}

module.exports = ifModifiedSince;
