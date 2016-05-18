var expect = require("chai").expect,
    cd = require("../../../../src/scripts/addons/floodControl/compileDelays");

describe("floodControl.compileDelays()", function() {
    "use strict";

    it("should use the provided numeric values to return a new delay map (object)", function() {
        var myDelays = {
            GET: 1000,
            POST: 1000,
            PUT: 1000,
            DELETE: 1000
        };

        expect(cd(myDelays)).to.eql(myDelays);
        expect(cd(myDelays)).to.not.equal(myDelays);
    });

    it("should fill-in missing delay props with default values", function() {
        var myDelays = {
            GET: 1000,
            DELETE: 1000
        };

        expect(cd(myDelays).PUT).to.eql(250);
        expect(cd(myDelays).POST).to.eql(250);
        expect(cd(myDelays)).to.eql({GET:1000,PUT:250,POST:250,DELETE:1000});
        expect(cd(myDelays)).to.not.equal(myDelays);
    });

    it("should use default values when none provided", function() {
        expect(cd()).to.eql({GET:250,POST:250,PUT:250,DELETE:Infinity});
    });
});