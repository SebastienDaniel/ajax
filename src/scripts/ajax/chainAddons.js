module.exports = function chainAddons(addons, params) {
    "use strict";

    return addons.reduce(function(config, nextAddon) {
        if (Object.prototype.toString.call(config) === "[object Object]") {
            return nextAddon(config);
        }
    }, params);
};
