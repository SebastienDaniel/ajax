var expect = require("chai").expect,
    chainAddons = require("../../src/scripts/ajax/chainAddons");

describe("chainAddons()", function() {
    var addon1 = function(config) {
            config.name = "sebastien";
            return config;
        },
        addon2 = function(config) {
            config.name += config.name ? " Daniel" : "Daniel";
            return config;
        },
        addon3 = function(config) {
            return null;
        },
        addons = [addon1, addon2],
        abortedAddons = [addon1, addon3, addon2];

    it("should cumulatively modify the config object", function() {
        var b = {},
            c = chainAddons(addons, b);

        expect(c.name).to.eql("sebastien Daniel");
        expect(c).to.equal(b);
    });
    it("should cleanly complete even with an aborting addon", function() {
        var b = {},
            c = chainAddons(abortedAddons, b);

        expect(c).to.eql(undefined);
    });
});
