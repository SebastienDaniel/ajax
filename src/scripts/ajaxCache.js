/**
 * @namespace ajaxCache
 * @description query method based cache mechanism. <br/>
 * Each cache bank is independent (<i>one bank per method: GET|POST|PUT|DELETE</i>)<br/>
 * Caches live for the configured delays and cacheBanks auto-adjust themselves based on expired cache entries.
 */
var ajaxCache = (function() {
    var config = {
            getDelay: 100, // should be just small enough to account for manual double query
            deleteDelay: Infinity, // should never be cleaned
            putDelay: 1000,
            postDelay: 1000
        },
        getBank = [],
        putBank = [],
        postBank = [],
        deleteBank = [];

    /**
     * @memberof ajaxCache
     * @private
     * @summary returns the proper cache bank based on provided method, or null
     *
     * @param method {String} ajax request method, expected GET|POST|PUT|DELETE
     * @returns {Array|null} cache bank array, or null if unfound
     */
    function fetchBank(method) {
        switch (method.toUpperCase()) {
            case "GET": {
                return getBank;
            }
            case "PUT": {
                return putBank;
            }
            case "POST": {
                return postBank;
            }
            case "DELETE": {
                return deleteBank;
            }
            default: {
                break;
            }
        }

        return null;
    }

    /**
     * @memberof ajaxCache
     * @private
     * @summary returns the proper cache config delay based on provided method, or null
     *
     * @param method {String} ajax request method, expected GET|POST|PUT|DELETE
     * @returns {Number|null} delay duration in milliseconds, or null if no match found for provided method
     */
    function fetchDelay(method) {
        switch (method.toUpperCase()) {
            case "GET": {
                return config.getDelay;
            }
            case "PUT": {
                return config.putDelay;
            }
            case "POST": {
                return config.postDelay;
            }
            case "DELETE": {
                return config.deleteDelay;
            }
            default: {
                break;
            }
        }

        return null;
    }
    /**
     * @memberof ajaxCache
     * @alias setConfig
     * @summary sets the configuration values for the ajaxCache module (<i>cache expiration delays</i>)
     *
     * @param c {Object} configuration object for ajaxCache
     */
    function configure(c) {
        Object.keys(config).forEach(function(key) {
            if (c[key]) {
                config[key] = c[key];
            }
        });
    }

    /**
     * @memberof ajaxCache
     * @summary returns the cached Data of a GET request, if URL is cached, otherwise returns null
     *
     * @param url {String} unique URL string used to find cache
     * @returns {Object|Array|null} cached data from previous AJAX GET request on given URL, otherwise null
     */
    function getCacheData(url) {
        var index = 0;

        // find a URL match in the "GET" bank
        if (getBank.some(function(o, i) {
                index = i;
                return o.cid === url;
            }) && getBank[index].data !== null) {
            if (getBank[index].dataType === "json") {
                return JSON.parse(getBank[index].data);
            } else {
                return getBank[index].data;
            }
        } else {
            return null;
        }
    }

    /**
     * @memberof ajaxCache
     * @summary returns the date of cached entry for a given URL in a given method cache. If URL isn't cached, returns null
     *
     * @param url {String} unique URL to lookup
     * @param method {String} PUT|POST|GET|DELETE
     * @returns {String|null} UTC date string of cached object date (ms), or null if the URL wasn't found
     */
    function getCacheDate(url, method) {
        var bank = fetchBank(method),
            index = 0,
            found = bank.some(function(o, i) {
            index = i;
            return o.cid === url;
        });

        return found ? new Date(bank[index].date).toUTCString() : null;
    }

    /**
     * @memberof ajaxCache
     * @summary determines if requested URL + method + body combination allows for a fresh AJAX query.<br/>
     * If query is cached and hasn't expired, canQuery returns false. Otherwise it returns true.
     *
     * @param url {String} url of the request to get permission for
     * @param method {String} request method determines in which cache bank to look
     * @param body {String} data to compare in case of a POST request
     * @returns {Boolean}
     */
    function canQuery(url, method, body) {
        var bank = fetchBank(method),
            delay = fetchDelay(method),
            i = bank.length,
            found = false,
            now = Date.now();

        body = body || "";
        if (delay !== Infinity) {
            while (!found && i) {
                i--;
                if (now - bank[i].date < delay) {
                    found = bank[i].cid === url + body;
                } else {
                    i = 0;
                }
            }
        } else {
            while (!found && i) {
                i--;
                found = bank[i].cid === url + body;
            }
        }

        return !found;
    }

    /**
     * @memberof ajaxCache
     * @private
     * @summary clears all cache entries that have expired from a given cache bank
     *
     * @param method {String} GET|POST|PUT|DELETE
     * @returns null
     */
    function cleanCache(method) {
        var now = Date.now(),
            bank = fetchBank(method),
            delay = fetchDelay(method),
            i = bank.length - 1,
            stop = false;

        // conditional to avoid useless looping
        if (delay !== Infinity) {
            while (!stop && i) {
                if (now - bank[i].date > delay) {
                    bank.splice(0, i);
                    stop = true;
                }
                i--;
            }
        }
    }

    /**
     * @memberof ajaxCache
     * @summary adds an entry to a given cache
     *
     * @param url {String} query URL to cache
     * @param method {String} request method to determine cache bank
     * @param data {String} stringified data to store (if POST or PUT)
     * @param dataType {String} type of data, to parse on getCacheData request
     */
    function addToCache(url, method, data, dataType) {
        var bank;

        if (!Array.prototype.slice.call(arguments).every(function(a) {
                return Object.prototype.toString.call(a) === "[object String]";
            })) {
            throw new TypeError("arguments must be strings");
        }

        method = method.toUpperCase();
        if (!(method === "GET" || method === "POST" || method === "PUT" || method === "DELETE")) {
            throw Error("provided method: " + method + " is invalid.\nmethod must be GET, POST, PUT or DELETE");
        }

        if (method === "GET" && arguments.length < 4) {
            throw Error("when caching a get Request, you must provide: \nurl, \nmethod (\"GET\"), \ndata, \ndataType");
        }

        if (method === "POST" && arguments.length < 3) {
            throw Error("when caching a POST Request, you must provide: \nurl, \nmethod (\"POST\"), \ndata");
        }

        if (method === "PUT" && arguments.length < 3) {
            throw Error("when caching a PUT Request, you must provide: \nurl, \nmethod (\"PUT\"), \ndata");
        }

        bank = fetchBank(method);
        switch (bank) {
            case getBank: {
                bank.push({
                    cid: url,
                    data: data,
                    dataType: dataType,
                    date: Date.now()
                });
                break;
            }
            case putBank: {
                bank.push({
                    cid: url + data,
                    date: Date.now()
                });
                break;
            }
            case postBank: {
                bank.push({
                    cid: url + data,
                    date: Date.now()
                });
                break;
            }
            case deleteBank: {
                bank.push({
                    cid: url,
                    date: Date.now()
                });
                break;
            }
            default: {
                break;
            }
        }

        cleanCache(method);
    }

    /**
     * @memberof ajaxCache
     * @summary clears the cache bank for the given request method, if no method is provided, it clears all cache banks.
     *
     * @param method {String} GET|POST|PUT|DELETE
     * @returns null
     */
    function flushCache(method) {
        var bank;
        if (method) {
            bank = fetchBank(method);
        }

        switch (bank) {
            case getBank: {
                getBank = [];
                break;
            }
            case putBank: {
                putBank = [];
                break;
            }
            case postBank: {
                postBank = [];
                break;
            }
            case deleteBank: {
                deleteBank = [];
                break;
            }
            default: {
                getBank = [];
                putBank = [];
                postBank = [];
                deleteBank = [];
                break;
            }
        }
    }

    return {
        setConfig: configure,
        getCacheData: getCacheData,
        getCacheDate: getCacheDate,
        canQuery: canQuery,
        cache: addToCache,
        flushCache: flushCache
    };
}());
