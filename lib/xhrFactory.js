var responseListener = require("./responseListener");

/**
 * @alias xhrFactory
 * @private
 * @summary creates a XMLHttpRequest instance, builds it according to the provided params, executes the XMLHttpRequest
 * @param c {params} - request configuration hash
 * @returns {object|undefined} XMLHttpRequest instance
 */
module.exports = function xhrFactory(c) {
    "use strict";
    var xhr;

    // early abort, if config invalid
    if (Object.prototype.toString.call(c) !== "[object Object]") {
        return;
    } else {
        xhr = new XMLHttpRequest();
    }

    // bind listeners
    xhr.onreadystatechange = function() {
        responseListener(xhr, c);
    };

    // start XMLHttpRequest
    xhr.open(c.method, c.url, true);

    // set request headers
    // must be done after open()
    Object.keys(c.headers || {}).forEach(function(h) {
        xhr.setRequestHeader(h, c.headers[h]);
    });

    // handle timeout
    if (c.timeout) {
        xhr.timeout = c.timeout;
    }

    xhr.send(c.data);

    return xhr;
};
