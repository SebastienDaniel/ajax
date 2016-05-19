"use strict";
var xhrFactory = require("./lib/xhrFactory"),
    chainAddons = require("./lib/chainAddons"),
    finalizeParams = require("./lib/finalizeParams");

/**
 * @typedef {object} requester
 * @summary environment/interface used to add middleware and make HTTP requests
 */


/**
 * @public
 * @alias module:mojax.createRequester
 * @summary creates a requester instance, which can be extended with middleware/addons,
 * and from which HTTP requests can be dispatched
 * @returns {requester}
 */
function createRequester() {
    var addons = [];
    
    return {
        /**
         * @function
         * @name requester#use
         *
         * @summary adds a middleware function to the requester pipeline
         * @param {function} fn - middleware function to add to the requester's request pipeline
         * @returns {object} this
         */
        use: function(fn) {
            if (typeof fn === "function") {
                addons.push(fn);
            } else {
                throw new TypeError("ajax.use() expects a function argument. Provided:\n" + fn + " (" + typeof fn + ")");
            }

            return this;
        },

        /**
         * @function
         * @name requester#req
         *
         * @summary starts an async HTTP request, passing the configuration object through the middleware pipeline, and finally sending the request
         * @param {params} params - configuration object used for the request
         * @returns {object} this
         */
        req: function(params) {
            xhrFactory(
                chainAddons(addons.concat(finalizeParams), params)
            );

            return this;
        }
    };
}

/**
 * mojax module
 * @module mojax
 */
module.exports = {
    createRequester: createRequester
};
