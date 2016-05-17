var cache = [],
    useCache = require("./useCache"),
    updateCache = require("./updateCache");

/**
 * Caches the request & response pair based on request method (get, post, put, delete)
 * Cache banks are self-sustaining and self-updating
 * @param {object} req - ajax request object
 */
module.exports = {
    getCache: function() {
        return cache;
    },
    processRequest: function ajaxCache(req) {
        // adjust request to use cache, if valid
        if (req.method === "GET") {
            // conditionally add the "If-Modified-Since" header
            useCache(req, cache);

            // add success callback which updates GET cache
            req.onSuccess.push(function(r) {
                if (r.status === 200) {
                    updateCache(req.url, cache);
                }
            });
        }

        return req;
    }
};
