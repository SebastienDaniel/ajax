module.exports = function useCache(req, cache) {
    var i = 0,
        found = false;

    // find an existing record
    while (i < cache.length && !found) {
        if (cache[i].url === req.url) {
            found = true;
        } else {
            i++;
        }
    }

    // if found, inject If-Modified-Since header
    if (found) {
        req.addRequestHeader("If-Modified-Since", new Date(cache[i].date).toUTCString());
    }
};
