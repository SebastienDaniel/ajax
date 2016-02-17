var chai = require("chai"),
    expect = require("chai").expect,
    sinon = require("sinon"),
    sinonChai = require("sinon-chai"),
    responseListener = require("../../src/scripts/responseListener.js");

chai.use(sinonChai);

describe("responseListener()", function() {
    var mockReq = {
            readyState: 0,
            response: "",
            responseText: "",
            responseType: "text",
            status: undefined,
            getAllResponseHeaders: function(){}
        },
        onSuccess = sinon.spy(),
        onFailure = sinon.spy(),
        onHeaders = sinon.spy(),
        conf = {
            url: "path/to/some/resource",
            method: "GET",
            responseType: "json",
            onSuccess: onSuccess,
            onFailure: onFailure,
            onHeaders: onHeaders
        };

    it("should not trigger any callback while readyState = UNSENT (0)", function() {
        // successful
        responseListener(mockReq, conf);
        expect(onSuccess).to.not.have.been.called;
        expect(onFailure).to.not.have.been.called;
        expect(onHeaders).to.not.have.been.called;
    });

    it("should not trigger any callback while readyState = OPENED (1)", function() {
        // successful
        mockReq.readyState = 1;
        responseListener(mockReq, conf);
        expect(onSuccess).to.not.have.been.called;
        expect(onFailure).to.not.have.been.called;
        expect(onHeaders).to.not.have.been.called;
    });

    it("should only trigger the onHeaders callback when readyState = HEADERS_RECEIVED (2)", function() {
        // successful
        mockReq.readyState = 2;
        responseListener(mockReq, conf);
        expect(onSuccess).to.not.have.been.called;
        expect(onFailure).to.not.have.been.called;
        expect(onHeaders).to.have.been.calledOnce;
    });

    it("should only have triggered the onHeaders callback when readyState = LOADING (3)", function() {
        // successful
        mockReq.readyState = 3;
        responseListener(mockReq, conf);
        expect(onSuccess).to.not.have.been.called;
        expect(onFailure).to.not.have.been.called;
        expect(onHeaders).to.have.been.calledOnce;
    });

    it("should trigger the onSuccess callback when readyState = DONE (4) && status = 2**", function() {
        // successful
        mockReq.readyState = 4;
        mockReq.status = 200;
        responseListener(mockReq, conf);
        expect(onSuccess).to.have.been.calledOnce;
        expect(onFailure).to.not.have.been.called;
        expect(onHeaders).to.have.been.calledOnce;
    });

    it("should trigger the onFailure callback when readyState = DONE (4) && status = 5** or 4**", function() {
        // successful
        mockReq.readyState = 4;
        mockReq.status = 404;
        responseListener(mockReq, conf);
        expect(onSuccess).to.have.been.calledOnce;
        expect(onFailure).to.have.been.calledOnce;
        expect(onHeaders).to.have.been.calledOnce;
    });
});