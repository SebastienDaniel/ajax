var responseListener = require("./responseListener");

/**
 * @memberof ajax
 * @summary executes the XMLHttpRequest
 * @private
 * @param c {object} - request configuration hash
 */
module.exports = function xhrFactory(c) {
    "use strict";
    var xhr = new XMLHttpRequest();

    // early abort, if config invalid
    if (Object.prototype.toString.call(c) !== "[object Object]") {
        return;
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
