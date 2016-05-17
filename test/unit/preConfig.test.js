var expect = require("chai").expect,
    cc = require("../../src/scripts/addons/preConfig"),
    base = {
        responseType: "text",
        method: "GET",
        headers: {
            "Accept-Charset": "utf-8",
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "text/html"
        },
        timeout: 10000
    };

describe("compileConfig()", function() {
    it("should return the base object values if no keys in extension object", function() {
        var o = cc(base, {});

        expect(o.responseType).to.eql(base.responseType);
        expect(o.method).to.eql(base.method);
        expect(o.timeout).to.eql(base.timeout);
        expect(o.headers).to.not.equal(base.headers);
    });

    it("should override base object values", function() {
        var o = cc(base, {method: "PUT", timeout: 500});
        expect(o.method).to.eql("PUT");
        expect(o.responseType).to.eql("text");
        expect(o.timeout).to.eql(500);
        expect(o.headers).to.not.equal(base.headers);
        expect(o.headers).to.eql(base.headers);
    });

    it("should extend the base object url value", function() {
        var o = cc(base, {url: "api/"});

        expect(o.url).to.eql("api/");

        o = cc(o, {url: "somePath"});
        expect(o.url).to.eql("api/somePath");
    });

    it("should extend base object headers object", function() {
        var o;

        o = cc(base, {method: "PUT", timeout: 500, headers: {"Accept-Charset": "utf-16"}});
        expect(o.method).to.eql("PUT");
        expect(o.responseType).to.eql("text");
        expect(o.timeout).to.eql(500);
        expect(o.headers).to.not.equal(base.headers);
        expect(o.headers["Accept-Charset"]).to.eql("utf-16");
        expect(o.headers["X-Requested-With"]).to.eql("XMLHttpRequest");
        expect(o.headers["Content-Type"]).to.eql("text/html");
        expect(Object.keys(o.headers).length).to.eql(3);
    });

    it("should replace base object header values when present in extending object", function() {
        var o;

        o = cc(base, {method: "PUT", timeout: 500, headers: {"Some-Header": "Some-Value"}});
        expect(o.method).to.eql("PUT");
        expect(o.responseType).to.eql("text");
        expect(o.timeout).to.eql(500);
        expect(o.headers).to.not.equal(base.headers);
        Object.keys(base.headers).forEach(function(key) {
            expect(o.headers[key]).to.eql(base.headers[key]);
        });
        expect(o.headers["Some-Header"]).to.eql("Some-Value");
    });

    it("base object should not have been modified throughout tests", function() {
        expect(base.method).to.eql("GET");
        expect(base.responseType).to.eql("text");
        expect(base.timeout).to.eql(10000);
        expect(base.headers["Accept-Charset"]).to.eql("utf-8");
        expect(base.headers["X-Requested-With"]).to.eql("XMLHttpRequest");
        expect(base.headers["Content-Type"]).to.eql("text/html");
        expect(Object.keys(base.headers).length).to.eql(3);
    });
});
