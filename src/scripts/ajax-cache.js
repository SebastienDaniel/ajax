/**
 * @namespace ajaxCache
 */
var ajaxCache = (function() {
    var config = {
        getDelay: 0,
        deleteDelay: 1000,
        putDelay: 1000,
        postDelay: 1000
    };

    /**
     * @memberof ajaxCache
     * @summary sets the configuration values for the ajaxCache module
     * @param c {Object} configuration object for ajaxCache
     */
    function configure(c) {}

    /**
     * @memberof ajaxCache
     * @summary returns the cached Data of a GET request, if URL is cached
     * @param url {String} unique URL string used to find cache
     * @returns {Object|Array} cached data from previous AJAX GET request on given URL
     */
    function getCacheData(url) {}

    /**
     * @memberof ajaxCache
     * @summary returns the date of cached entry for a given URL in a given method cache
     * @param url {String} unique URL to lookup
     * @param method {String} method cache name
     * @returns {Object} UTC date
     */
    function getCacheDate(url, method) {}

    /**
     * @memberof ajaxCache
     * @summary determines if requested URL + method + body combination allows for a fresh AJAX query
     * @param url {String} url of the request to get permission for
     * @param method {String} request method determines in which cache bank to look
     * @param body {String} data to compare in case of a POST request
     * @returns {Boolean}
     */
    function canQuery(url, method, body) {}

    /**
     * @memberof ajaxCache
     * @summary adds an entry to a given cache
     * @param url {String} query URL to cache
     * @param method {String} request method to determine cache bank
     * @param data {String} stringified data to store (if POST or PUT)
     * @param dataType {String} type of data, to parse on getCacheData request
     */
    function addToCache(url, method, data, dataType) {}

    return {
        setConfig: configure,
        getCacheData: getCacheData,
        getCacheDate: getCacheDate,
        canQuery: canQuery,
        cache: addToCache
    };
}());
