var mergeStrings = require("./mergeStrings"),
    mergeHeaders = require("./mergeHeaders"),
    mergeCallbacks = require("./mergeCallbacks");

function preConfig(base) {
    "use strict";

    if (!base) {
        throw new TypeError("preConfig() expects an object argument. Provided\n" + base + " (" + typeof base + ")");
    }

    return function mergeConfigs(ext) {
        if (ext && typeof ext === "object") {
            // the base object has to remain unmodified
            return Object.keys(base).reduce(function(ext, key) {
                // handle extension cases, otherwise override
                switch (key) {
                    case "url":
                    {
                        ext[key] = mergeStrings(base[key], ext[key]);
                        break;
                    }
                    case "headers":
                    {
                        ext[key] = mergeHeaders(base[key], ext[key]);
                        break;
                    }
                    case "onOpen":
                    case "onHeaders":
                    case "onSuccess":
                    case "onTimeout":
                    case "onFailure":
                    {
                        ext[key] = mergeCallbacks(base[key], ext[key]);
                        break;
                    }
                    default:
                    {
                        // override
                        ext[key] = ext[key] || base[key];
                        break;
                    }
                }

                return ext;
            }, ext);
        } else {
            return base;
        }
    };
}

module.exports = preConfig;
