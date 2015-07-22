describe("ajaxCache.cache()", function() {
    var data = JSON.stringify({
            first_name: "Sebastien",
            last_name: "Daniel"
        }),
        now;

    it("should throw an error when trying to cache a GET request without data or dataType", function() {
        var fn = function() {
            ajaxCache.cache("http://api.com/", "GET");
        };

        expect(fn).toThrowError("when caching a get Request, you must provide: \nurl, \nmethod (\"GET\"), \ndata, \ndataType");
    });

    it("should throw an error if any argument is not a string", function() {
        var fn1 = function(url, method, data, dataType) {
            return ajaxCache.cache({}, method, data, dataType);
            },
            fn2 = function(url, method, data, dataType) {
                return ajaxCache.cache("http://api.com/", fn1, data, dataType);
            },
            fn3 = function(url, method, data, dataType) {
                return ajaxCache.cache("http://api.com/", "GET", fn1, dataType);
            },
            fn4 = function() {
                return ajaxCache.cache("http://api.com/", "GET", "text", fn1);
            };

        expect(fn1).toThrowError("arguments must be strings");
        expect(fn2).toThrowError("arguments must be strings");
        expect(fn3).toThrowError("arguments must be strings");
        expect(fn4).toThrowError("arguments must be strings");
    });

    it("should throw error if method is invalid", function() {
        var fn = function() {
                ajaxCache.cache("http://api.com/", "UPDATE");
            },
            fn2 = function() {
                ajaxCache.cache("http://api.com/", "GET", "", "json");
                ajaxCache.cache("http://api.com/", "POST", "");
                ajaxCache.cache("http://api.com/", "PUT", "");
                ajaxCache.cache("http://api.com/", "DELETE");
            };

        expect(fn2).not.toThrow();
        expect(fn).toThrowError("provided method: UPDATE is invalid.\nmethod must be GET, POST, PUT or DELETE");
    });
});
