/**
 * should be instantiable, is a class, and compiles a pre-config object
 */

var defaultConfig = {
    responseType: "text",
    method: "GET",
    headers: {
        "Accept-Charset": "utf-8",
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "text/html"
    },
    timeout: 10000
};

module.exports = function compileConfig(base, ext) {
    base = base || defaultConfig;
    
    var o = {
        url: base.url ? base.url + (ext.url || "") : (ext.url || ""), // extend existing url
        method: ext.method || base.method, // overwrite
        responseType: ext.responseType || base.responseType, // overwrite
        timeout: ext.timeout || base.timeout, // overwrite
        // copy headers
        headers: base.headers ? Object.keys(base.headers).reduce(function(headers, key) {
            headers[key] = base.headers[key];

            return headers;
        }, {}) : {},
        data: ext.data || ""
    };

    // early abort
    if (ext === undefined) {
        return o;
    }

    // extend headers object, or create
    if (ext.headers) {
        o.headers = Object.keys(ext.headers).reduce(function(headers, key) {
            headers[key] = ext.headers[key];

            return headers;
        }, o.headers)
    }

    return o;
};
