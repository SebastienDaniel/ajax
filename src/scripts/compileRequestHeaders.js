module.exports = function compileRequestHeaders(headers) {
    var o = Object.keys(headers).reduce(function(o, key) {
        o[key] = headers[key];
        return o;
    }, {});

    // set mandatory values
    if (!headers["Content-Type"]) {
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
