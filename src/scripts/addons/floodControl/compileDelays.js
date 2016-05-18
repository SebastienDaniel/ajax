var defaultConfig = {
    GET: 250,
    PUT: 250,
    POST: 250,
    DELETE: Infinity
};

module.exports = function compileDelays(delays) {
    "use strict";
    // finalize the delay values
    return delays ? Object.keys(defaultConfig).reduce(function(obj, key) {
        obj[key] = typeof delays[key] === "number" ? delays[key] : defaultConfig[key];
        return obj;
    }, {}) : defaultConfig;
};
