var chai = require("chai"),
    expect = require("chai").expect,
    parseResponse = require("../../lib/parseResponse.js");

describe("parseResponse()", function() {
    it("should return an object when provided a JSON response with JSON type", function() {
        // referential difference
        expect(parseResponse({
            response: '{"name":"seb"}',
            responseType: "json"
        })).to.eql({name:"seb"});
    });

    it("should return response as-is if no matching type", function() {
        expect(parseResponse({
            response: '{"name":"seb"}'
        })).to.eql('{"name":"seb"}');
    });
});