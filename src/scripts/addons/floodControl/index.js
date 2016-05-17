var shouldBlock = require("./shouldBlock");

module.exports = function floodControl(config, listeners) {
    return shouldBlock(config) ? undefined : config;
};
