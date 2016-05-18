var expect = require("chai").expect,
    gc = require("../../../../src/scripts/addons/floodControl/generateControllers"),
    cr = require("../../../../src/scripts/addons/floodControl/continueRequest");

var params = {
        url: "someUrl",
        method: "GET",
        data: "someData"
    },
    delays = {
        GET: 100,
        PUT: 200,
        POST: 100,
        DELETE: 200
    },
    controllers = gc();

describe("floodControl.shouldblock()", function() {
    "use strict";

    it("should allow first of each type of request", function() {
        params.method = "GET";
        expect(cr(controllers, delays, params)).to.be.true;

        params.method = "PUT";
        expect(cr(controllers, delays, params)).to.be.true;

        params.method = "POST";
        expect(cr(controllers, delays, params)).to.be.true;

        params.method = "DELETE";
        expect(cr(controllers, delays, params)).to.be.true;
    });

    it("should block duplicate requests below delay limit", function() {
        params.method = "GET";
        expect(cr(controllers, delays, params)).to.be.false;

        params.method = "PUT";
        expect(cr(controllers, delays, params)).to.be.false;

        params.method = "POST";
        expect(cr(controllers, delays, params)).to.be.false;

        params.method = "DELETE";
        expect(cr(controllers, delays, params)).to.be.false;
    });

    it("should allow variants of POST/PUT requests, based on body content", function() {
        params.data += "howdy";

        params.method = "PUT";
        expect(cr(controllers, delays, params)).to.be.true;
        params.method = "POST";
        expect(cr(controllers, delays, params)).to.be.true;

        // should still block previous requests
        params.data = "someData";

        params.method = "PUT";
        expect(cr(controllers, delays, params)).to.be.false;
        params.method = "POST";
        expect(cr(controllers, delays, params)).to.be.false;
    });
});

describe("floddControl.shouldBlock()", function() {
    "use strict";
    before(function(done) {
        setTimeout(function() {
            done();
        }, 100);
    });

    it("should allow requests that have passed the delay, but block others", function() {
        // GET & POST should pass
        params.data = "someData";
        params.method = "GET";
        expect(cr(controllers, delays, params)).to.be.true;
        params.method = "POST";
        expect(cr(controllers, delays, params)).to.be.true;

        params.data += "howdy";
        params.method = "POST";
        expect(cr(controllers, delays, params)).to.be.true;

        // DELETE and PUT should fail (longer delay)
        params.data = "someData";
        params.method = "PUT";
        expect(cr(controllers, delays, params)).to.be.false;
        params.method = "DELETE";
        expect(cr(controllers, delays, params)).to.be.false;

        params.data += "howdy";
        params.method = "PUT";
        expect(cr(controllers, delays, params)).to.be.false;
    });
});