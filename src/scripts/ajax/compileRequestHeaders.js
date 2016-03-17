/**
 * @aliax compileRequestHeaders
 * @private
 * @summary compiles default request headers and additionally provided headers
 *
 * @param {object} headers - name:value pairs of request headers
 * @returns {object} - compiled headers object, with added required default headers
 */
module.exports = function compileRequestHeaders(headers) {
    var o = Object.keys(headers).reduce(function(o, key) {
        o[key] = headers[key];
        return o;
    }, {});

    // set mandatory values
    if (!headers["Content-Type"]) {
        // TODO: not true, depends on responseType
        o["Content-Type"] = "application/json;charset=utf-8";
    }

    if (!headers.Accept) {
        o.Accept = "application/json";
    }

    if (!headers["X-Requested-With"]) {
        o["X-Requested-With"] = "XMLHttpRequest";
    }

    return o;
};
