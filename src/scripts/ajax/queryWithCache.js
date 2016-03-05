/**
 * @memberof ajax
 * @private
 * @summary determines how to handle the request based on communication with ajaxCache module
 *
 * @param c {Object} finalized ajax request object
 */
function queryWithCache(c) {
    switch (c.method) {
        case "GET": {
            var date;

            // check if has passed repeat control
            if (ajaxCache.canQuery(c.url, c.method, c.data)) {
                date = ajaxCache.getCacheDate(c.url, c.method);
                // we have a cached copy, send it to the AJAX request
                if (date) {
                    c.setHeaders["If-Modified-Since"] = date;
                    c.cacheData = ajaxCache.getCacheData(c.url);
                }
                // make the ajax request
                sendRequest(c);
            } else {
                c.onFailure({
                    response: "same GET request was made in too short an interval",
                    status: "429"
                });
            }
            break;
        }
        case "POST": {
            if (ajaxCache.canQuery(c.url, c.method, c.data)) {
                sendRequest(c);
            } else {
                c.onFailure({
                    response: "same POST was made in too short an interval",
                    status: "429"
                });
            }
            break;
        }
        case "PUT": {
            if (ajaxCache.canQuery(c.url, c.method, c.data)) {
                sendRequest(c);
            } else {
                c.onFailure({
                    response: "same PUT was made in too short an interval",
                    status: "429"
                });
            }
            break;
        }
        case "DELETE": {
            if (ajaxCache.canQuery(c.url, c.method)) {
                sendRequest(c);
            } else {
                c.onFailure({
                    response: "DELETE operation has already been processed for this URI",
                    status: "429"
                });
            }
            break;
        }
        default: {
            throw Error("somehow a bad request method made it here");
        }
    }
}
