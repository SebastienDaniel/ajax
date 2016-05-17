"use strict";
var xhrFactory = require("./xhrFactory"),
    chainAddons = require("./chainAddons");

/**
 * Creates a AJAX instance, which is an env. for making async HTTP requests holding it's own
 * preset configuration and addons.
 * 
 * The instance is itself a xhr request factory, which returns an encapsulated XHR request object that has
 * a pub/sub interface that listens to the request's states
 */
function createRequestFactory() {
    var addons = [];

    return {
        /**
         * Builds an addon queue, through which a request is passed.
         * @param {function} fn - addon function to add to the ajax instance's addon queue
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
         * @summary starts an async request, passing it through the addon queue, and finally opening it.
         * @param {object} params - configuration hash for the request
         * @returns {{on: on}}
         */
        req: function(params) {
            var listeners = {
                    headers: [],
                    success: [],
                    failure: [],
                    timeout: []
                };


            xhrFactory(
                chainAddons(addons, params),
                listeners
            );

            return {
                on: function (event, fn) {
                    if (typeof event !== "string" || listeners[event] === undefined) {
                        throw new Error("req.on() expects a valid string event name (headers, success, failure, timeout) as first argument. Provided:\n" + event + " (" + typeof event + ")");
                    }

                    if (typeof fn !== "function") {
                        throw new TypeError("Request.on() expects a function as second argument. Provided:\n" + fn + " (" + typeof fn + ")");
                    }

                    listeners[event].push(fn);

                    return this;
                }
            };
        }
    };
}

module.exports = {
    createRequestFactory: createRequestFactory
};
