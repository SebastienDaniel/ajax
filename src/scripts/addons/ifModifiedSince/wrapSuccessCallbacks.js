function wrap(cb, config, cache) {
    "use strict";
    return function successWrapper(resp, xhr) {
        if (xhr.status === 304) {
            // get cached data
            cb(cache.get(config.url), xhr);
        } else {
            cb(resp, xhr);
        }
    };
}

/**
 * wraps all existing onSuccess callbacks to provide response data OR cached data
 * if the server responds with 304 (no body)
 * @param config
 * @param cache
 */
module.exports = function wrapSuccessCallbacks(config, cache) {
    "use strict";
    if (config.onSuccess) {
        if (Array.isArray(config.onSuccess)) {
            config.onSuccess = config.onSuccess.map(function(cb) {
                return wrap(cb, config, cache);
            });
        } else if (typeof config.onSuccess === "function") {
            config.onSuccess = wrap(config.onSuccess, config, cache);
        }
    }
};
