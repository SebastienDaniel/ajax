var expect = require("chai").expect,
    mergeHeaders = require("../../../../src/scripts/addons/preConfig/mergeHeaders");

describe("preConfig.mergeHeaders()", function() {
    "use strict";
    it("should extend obj B with unique own props in obj A", function() {
        var a = {
                "X-Requested-With": "XMLHttpRequest"
            },
            b = {
                "Content-Type": "application/json"
            },
            c = mergeHeaders(a, b);

        expect(c["X-Requested-With"]).to.eql("XMLHttpRequest");
        expect(c["Content-Type"]).to.eql("application/json");
    });

    it("should return object B", function() {
        var a = {
                "X-Requested-With": "XMLHttpRequest"
            },
            b = {
                "Content-Type": "application/json"
            },
            c = mergeHeaders(a, b);

        expect(c).to.equal(b);
    });

    it("should leave object A unchanged", function() {
        var a = {
                "X-Requested-With": "XMLHttpRequest"
            },
            b = {
                "Content-Type": "application/json"
            },
            c = mergeHeaders(a, b);

        expect(Object.keys(a)).to.have.length(1);
        expect(a["X-Requested-With"]).to.eql("XMLHttpRequest");
        expect(a["Content-Type"]).to.be.undefined;
    });
});
