var expect = require("chai").expect,
    cq = require("../../../../src/scripts/addons/floodControl/canQuery");

describe("floodControl.canQuery()", function() {
    "use strict";

    it("should return TRUE when delay has been passed for a given query", function() {
        // mock dictionary with extended canQuery method
        var mockD = {
                "key1": Date.now() - 200,
                "key2": Date.now() - 150,
                "key3": Date.now() - 101,
                get: function(key) {
                    return this[key];
                },
                set: function(key, value) {
                    this[key] = value;
                },
                canQuery: cq
            },
            delay = 100;

        expect(mockD.canQuery("key1", delay)).to.be.true;
        expect(mockD.canQuery("key2", delay)).to.be.true;
        expect(mockD.canQuery("key3", delay)).to.be.true;
    });

    it("should return FALSE when delay has not been passed for a given query", function() {
        // mock dictionary with extended canQuery method
        var mockD = {
                "key1": Date.now() - 90,
                "key2": Date.now() - 99,
                "key3": Date.now() - 1,
                get: function(key) {
                    return this[key];
                },
                set: function(key, value) {
                    this[key] = value;
                },
                canQuery: cq
            },
            delay = 100;

        expect(mockD.canQuery("key1", delay)).to.be.false;
        expect(mockD.canQuery("key2", delay)).to.be.false;
        expect(mockD.canQuery("key3", delay)).to.be.false;
    });

    it("should update the dictionary value", function() {
        // mock dictionary with extended canQuery method
        var mockD = {
                "key1": Date.now() - 200,
                "key2": Date.now() - 50,
                get: function(key) {
                    return this[key];
                },
                set: function(key, value) {
                    this[key] = value;
                },
                canQuery: cq
            },
            delay = 100;

        expect(mockD["key2"]).to.be.within(Date.now() - 51, Date.now() - 49);
        expect(mockD.canQuery("key2", delay)).to.be.false;
        expect(mockD["key2"]).to.be.within(Date.now() - 51, Date.now() - 49);

        expect(mockD["key1"]).to.be.within(Date.now() - 201, Date.now() - 199);
        expect(mockD.canQuery("key1", delay)).to.be.true;
        expect(mockD["key1"]).to.within(Date.now() - 1, Date.now());
    });
});