var expect = require("chai").expect,
    Dictionary = require("sebastiendaniel-adt/Dictionary"),
    gc = require("../../../../src/scripts/addons/floodControl/generateControllers");

describe("floodControl.generateControllers()", function() {
    "use strict";
    it("should return an object with 4 properties (GET, POST, PUT, DELETE)", function() {
        var c = gc();

        expect(c).to.be.instanceof(Object);
        expect(Object.keys(c)).to.have.length(4);

        expect(c.GET).to.exist;
        expect(c.PUT).to.exist;
        expect(c.POST).to.exist;
        expect(c.DELETE).to.exist;
    });

    it("each property should be a Dictionary", function() {
        var c = gc();

        Object.keys(c).forEach(function(key) {
            expect(c[key]).to.be.instanceof(Dictionary);
        });
    });

    it("each Dictionary should be extended with the canQuery method", function() {
        var c = gc();

        Object.keys(c).forEach(function(key) {
            expect(c[key]).to.be.instanceof(Dictionary);
            expect(c[key].canQuery).to.exist;
            expect(c[key].canQuery).to.be.instanceof(Function);
        });
    });
});