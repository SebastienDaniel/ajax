module.exports = function updateCache(url, cache) {
    var i = 0,
        found = false;

    // find existing cache entry
    while (i < cache.length && !found) {
        if (cache[i].url === url) {
            found = true;
        } else {
            i++;
        }
    }

    if (found) { // replace record
        cache[i] = {
            url: url,
            date: Date.now()
        };
    } else { // store new record
        cache.push({
            url: url,
            date: Date.now()
        });
    }
};
