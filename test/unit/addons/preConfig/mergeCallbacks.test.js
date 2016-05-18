var expect = require("chai").expect,
    mergeCallbacks = require("../../../../src/scripts/addons/preConfig/mergeCallbacks");

describe("preconfig.mergeCallbacks()", function() {
    "use strict";
    var a = function() {},
        b = function() {},
        c = function() {},
        array1 = [a],
        array2 = [b, c];

    it("should merge functions into an array of functions", function() {
        expect(mergeCallbacks(a,b)).to.eql([a, b]);
        expect(mergeCallbacks(a,b)).to.have.length(2);
    });

    it("should merge arrays of functions into an array of functions", function() {
        expect(mergeCallbacks(array1, array2)).to.eql([a, b, c]);
        expect(mergeCallbacks(array1, array2)).to.have.length(3);
    });

    it("should merge a mix of array of functions and function into an array of functions", function() {
        expect(mergeCallbacks(array2, a)).to.eql([b,c,a]);
        expect(mergeCallbacks(array2, a)).to.have.length(3);
    });

    it("should leave both original arrays untouched", function() {
        var arrayX = mergeCallbacks(array1, array2);

        expect(arrayX).to.not.equal(array1);
        expect(arrayX).to.not.equal(array2);
        expect(array1).to.have.length(1);
        expect(array2).to.have.length(2);
    });
});
