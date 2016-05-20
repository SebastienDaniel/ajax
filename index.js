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
         * @param {object} params - configuration object used for the request
         * @param {string} params.url - URL used as the HTTP request target
         * @param {string} params.method - GET, POST, PUT, DELETE
         * @param {string} [params.responseType=text] - json, text, xml, text/xml, text/html, arraybuffer, blob
         * @param {object} [params.headers={X-Requested-With:XMLHttpRequest}] - request headers
         * @param {string} [params.data] - data to send on POST or PUT request
         * @param {function|function[]} [params.onSuccess] - callbacks triggered on successful request completion
         * @param {function|function[]} [params.onFailure] - callbacks triggered on failed request completion
         * @param {function|function[]} [params.onHeaders] - callbacks triggered when response headers are received from server
         * @param {function|function[]} [params.onOpen] - callbacks triggered when request is opened
         * @param {number} [params.timeout] - sets the timeout value of the underlying XMLHttpRequest object (if supported)
         */
        req: function(params) {
            xhrFactory(
                chainAddons(addons.concat(finalizeParams), params)
            );
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
