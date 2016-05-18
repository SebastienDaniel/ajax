var mapCallbacks = require("../../ajax/mapCallbacks");

module.exports = function mergeCallbacks(base, ext) {
    "use strict";
    return mapCallbacks(base).concat(mapCallbacks(ext));
};
