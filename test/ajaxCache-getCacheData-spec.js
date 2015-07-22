describe("ajaxCache.getCacheData()", function() {
    it("should only work on for GET cache", function() {

        ajaxCache.cache("http://api.com/post", "POST", "hello post");
        expect(ajaxCache.getCacheData("http://api.com/post")).toEqual(null);

        ajaxCache.cache("http://api.com/put", "PUT", "hello put");
        expect(ajaxCache.getCacheData("http://api.com/put")).toEqual(null);

        ajaxCache.cache("http://api.com/delete", "DELETE");
        expect(ajaxCache.getCacheData("http://api.com/delete")).toEqual(null);

        ajaxCache.cache("http://api.com/get", "GET", "hello get", "text");
        expect(ajaxCache.getCacheData("http://api.com/get")).toEqual("hello get");
    });

    it("should parse JSON", function() {
        var obj = {
            "name": "seb",
            first: 1,
            "last": 2,
            "deep": {
                deeper: "hello im deep",
                deeperNumber: 1234,
                deeperArray: ["seb", "dan", "iel"]
            }
        };

        ajaxCache.cache("http://api.com/howdy", "GET", JSON.stringify(obj), "json");
        expect(ajaxCache.getCacheData("http://api.com/howdy")).toEqual(obj);
    });
});
