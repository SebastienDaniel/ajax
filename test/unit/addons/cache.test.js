var chai = require("chai"),
    expect = require("chai").expect,
    cache = require("../../../src/scripts/addons/cache");

describe("ajaxCache", function() {
    it("should store a GET request responding with '200'", function() {
        var req = cache.processRequest({
            url: "path/to/resource/1",
            method: "GET",
            onSuccess: []
        });

        expect(req.onSuccess.length).to.eql(1);

        req.onSuccess.forEach(function(cb) {
            cb({status: 200});
        });

        expect(cache.getCache().length).to.eql(1);
        expect(cache.getCache()[0].date).to.eql(Date.now());
        expect(cache.getCache()[0].url).to.eql("path/to/resource/1");
    });

    it("should not store a GET request responding with '304'", function() {
        var req = cache.processRequest({
            url: "path/to/resource/2",
            method: "GET",
            onSuccess: []
        });

        expect(req.onSuccess.length).to.eql(1);

        req.onSuccess.forEach(function(cb) {
            cb({status: 304});
        });

        expect(cache.getCache().length).to.eql(1);
        expect(cache.getCache()[0].url).to.eql("path/to/resource/1");
    });
});