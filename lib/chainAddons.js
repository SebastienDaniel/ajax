/**
 * @alias chainAddons
 * @private
 * @summary simplified middleware pipe
 * @param {function[]} addons - array of middleware used by the requester object
 * @param {object} params - configuration object of the request being made
 * @return {object|undefined}
 */
module.exports = function chainAddons(addons, params) {
    "use strict";

    return addons.reduce(function(config, nextAddon) {
        if (Object.prototype.toString.call(config) === "[object Object]") {
            return nextAddon(config);
        }
    }, params);
};
