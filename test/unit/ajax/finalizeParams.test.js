var expect = require("chai").expect,
    validate = require("../../../src/scripts/ajax/finalizeParams");

describe("addons.validateConfig()", function() {
    it("should flag invalid config object", function() {
        expect(function() {
            return validate();
        }).to.throw(TypeError);
    });

    it("should flag missing or invalid url", function() {
        expect(function() {
            return validate({
                method: "PUT"
            });
        }).to.throw(TypeError);

        expect(function() {
            return validate({
                url: "stringThing",
                method: "PUT"
            });
        }).to.not.throw;
    });

    it("should flag missing or invalid request method", function() {
        expect(function() {
            return validate({
                url: "somepath/"
            });
        }).to.throw(RangeError);

        expect(function() {
            return validate({
                url: "somepath/",
                method: null
            });
        }).to.throw(RangeError);

        expect(function() {
            return validate({
                url: "somepath/",
                method: "get"
            });
        }).to.not.throw;

        expect(function() {
            return validate({
                url: "somepath/",
                method: "GET"
            });
        }).to.not.throw;

        ["GET", "PUT", "POST", "DELETE"].forEach(function(key) {
            expect(function() {
                return validate({
                    url: "someUrl",
                    method: key
                });
            }).to.not.throw;
        })
    })
});