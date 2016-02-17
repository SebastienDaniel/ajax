var chai = require("chai"),
    expect = require("chai").expect,
    compileConfig = require("../../src/scripts/compileConfig.js");

describe("compileConfig()", function() {
    var conf = {
            url: "path/to/resource",
            method: "get",
            responseType: "JSON"
        },
        cconf = compileConfig(conf);

    it("should return a new object without modifying the argument object", function() {
        // referential difference
        expect(cconf).to.not.eql(conf);
    });

    it("should upperCase the method property", function() {
        expect(cconf.method).to.eql("GET");
    });

    it("should lowerCase the responseType property", function() {
        expect(cconf.responseType).to.eql("json");
    });

    it("should not contain any added properties other than header and data", function() {
        expect(cconf.onSuccess).to.be.undefined;
        expect(cconf.onFailure).to.be.undefined;
        expect(cconf.onHeaders).to.be.undefined;

        expect(cconf.data).to.eql("");
        expect(cconf.setHeaders).to.exist;
        expect(Object.keys(cconf).length).to.eql(5);
    });

    it("should throw if not provided a configuration object", function() {
        expect(function() {
            return ajax();
        }).to.throw;
    });
});