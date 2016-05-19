/**
 * Adds a callback that adds or updates cached data for the given query on success
 * @param config
 * @param cache
 */
module.exports = function addSuccessCallback(config, cache) {
    "use strict";

    function successCallback(resp) {
        cache.set(config.url, {
            data: resp,
            date: Date.now()
        });
    }

    if (config.onSuccess) {
        if (Array.isArray(config.onSuccess)) {
            config.onSuccess.push(successCallback);
        } else {
            config.onSuccess = [config.onSuccess, successCallback];
        }
    } else {
        config.onSuccess = successCallback;
    }
};
