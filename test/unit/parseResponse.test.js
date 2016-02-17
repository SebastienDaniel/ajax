var chai = require("chai"),
    expect = require("chai").expect,
    parseResponse = require("../../src/scripts/parseResponse.js");

describe("parseResponse()", function() {
    it("should return an object when provided a JSON response with JSON type", function() {
        // referential difference
        expect(parseResponse('{"name":"seb"}', "json")).to.eql({name:"seb"})
    });

    it("should return response as-is if no matching type", function() {
        expect(parseResponse('{"name":"seb"}')).to.eql('{"name":"seb"}');
    });
});