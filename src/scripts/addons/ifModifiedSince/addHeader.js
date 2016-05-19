module.exports = function addIfModifiedSinceHeader(config, cache) {
    "use strict";
    if (config.headers) {
        if (config.headers["If-Modified-Since"] === undefined) {
            config.headers["If-Modified-Since"] = cache.get(config.url) || new Date(Date.now()).toUTCString();
        }
    } else {
        config.headers = {
            "If-Modified-Since": cache.get(config.url) || new Date(Date.now()).toUTCString()
        }
    }

    return config;
};
