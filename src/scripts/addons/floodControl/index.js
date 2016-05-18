"use strict";

var generateControllers = require("./generateControllers"),
    compileDelays = require("./compileDelays"),
    continueRequest = require("./continueRequest");

function createFloodController(delays) {
    var controllers = generateControllers();

    delays = compileDelays(delays);

    // return partially applied flood control test function
    return function allowQuery(params) {
        return continueRequest(controllers, delays, params) ? params : undefined;
    };
}

module.exports = {
    createController: createFloodController
};
