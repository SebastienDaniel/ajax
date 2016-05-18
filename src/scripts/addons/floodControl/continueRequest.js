"use strict";

/**
 * Tests against the floodControllers dictionary if the query should go through, or not.
 * @param {object} controllers - map of Dictionaries that store past requests and their times
 * @param {object} delays - floodControl delay values
 * @param {object} params - request params to test against
 * @returns {boolean}
 */
module.exports = function continueRequest(controllers, delays, params) {
    var method,
        data,
        result;

    if (!params.method || !params.url || params.url.length === 0) {
        console.warn("cannot/will not floodControl a method-less, or url-less request");
        return true;
    } else {
        method = params.method.toUpperCase();
        data = params.data || "";
    }

    if (controllers[method]) {
        switch(method) {
            case "GET": {
                result = controllers.GET.canQuery(params.url, delays.GET);
                break;
            }
            case "PUT": {
                result = controllers.PUT.canQuery(params.url + data, delays.PUT);
                break;
            }
            case "POST": {
                result = controllers.POST.canQuery(params.url + data, delays.POST);
                break;
            }
            case "DELETE": {
                result = controllers.DELETE.canQuery(params.url, delays.DELETE);
                break;
            }
            default: {
                break;
            }
        }
    }

    return result;
};
