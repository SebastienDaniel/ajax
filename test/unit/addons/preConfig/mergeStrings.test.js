var expect = require("chai").expect,
    mergeStrings = require("../../../../src/scripts/addons/preConfig/mergeStrings");

describe("preconfig.mergeStrings()", function() {
    "use strict";
    it("should merge arbitrary strings in provided order", function() {
        expect(mergeStrings("hi", undefined)).to.eql("hi");
        expect(mergeStrings("hi", "bye")).to.eql("hibye");
        expect(mergeStrings("hi", undefined, "bye")).to.eql("hibye");
        expect(mergeStrings("hi", "bye", "welcome back")).to.eql("hibyewelcome back");
    });

    it("should ignore non-string arguments", function() {
        expect(mergeStrings("hi", " ", null, {}, [], function() {}, "bye")).to.eql("hi bye");
    });

    it("should return an empty string when no arguments provided", function() {
        expect(mergeStrings()).to.eql("");
    });
});
