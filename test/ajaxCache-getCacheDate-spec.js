describe("ajaxCache.getCacheDate()", function() {
    // if test returns a DATE error, it could be because of processing time
    var data = data = JSON.stringify({
            first_name: "Sebastien",
            last_name: "Daniel"
        }),
        now = new Date(Date.now()).toUTCString();

    ajaxCache.setConfig({
        getDelay: 100,
        putDelay: 500,
        postDelay: 500,
        deleteDelay: Infinity
    });

    ajaxCache.cache("http://api.handy-erp.com/Persons/", "GET", data, "json");

    //now = new Date(Date.now()).toUTCString();
    ajaxCache.cache("http://api.handy-erp.com/Persons/", "DELETE");

    //now = new Date(Date.now()).toUTCString();
    ajaxCache.cache("http://api.handy-erp.com/Persons/", "POST", "hello");

    //now = new Date(Date.now()).toUTCString();
    ajaxCache.cache("http://api.handy-erp.com/Persons/", "PUT", "hello");

    it("should return GET with proper date", function() {
        expect(ajaxCache.getCacheDate("http://api.handy-erp.com/Persons/", "GET")).toEqual(now);
    });

    it("should return DELETE with proper date", function() {
        expect(ajaxCache.getCacheDate("http://api.handy-erp.com/Persons/", "DELETE")).toEqual(now);
    });

    it("should return POST with proper date", function() {
        expect(ajaxCache.getCacheDate("http://api.handy-erp.com/Persons/hello", "POST")).toEqual(now);
    });

    it("should return PUT with proper date", function() {
        expect(ajaxCache.getCacheDate("http://api.handy-erp.com/Persons/hello", "PUT")).toEqual(now);
    });
});

describe("In a multiple entry cache ajaxCache.getCacheDate()", function() {
    var url = "http://api.com/",
        delayed = function() {
            url += "step/";
            ajaxCache.cache(url, "GET", "", "json");
        },
        interval,
        now;

    it("should return proper cacheDate for a given cache item", function(done) {
        interval = window.setInterval(delayed, 1000);
        now = Date.now();
        ajaxCache.setConfig({getDelay:5000});

        // cached items are young enough
        setTimeout(function() {
            expect(ajaxCache.getCacheDate("http://api.com/step/", "GET")).toEqual(new Date(now + 1000).toUTCString());
            expect(ajaxCache.getCacheDate("http://api.com/step/step/", "GET")).toEqual(new Date(now + 2000).toUTCString());
            expect(ajaxCache.getCacheDate("http://api.com/step/step/step/", "GET")).toEqual(new Date(now + 3000).toUTCString());
            window.clearInterval(interval);
            done();
        }, 4000);

        // cached items are too old
        setTimeout(function() {
            expect(ajaxCache.getCacheDate("http://api.com/step/", "GET")).toEqual(null);
            expect(ajaxCache.getCacheDate("http://api.com/step/step/", "GET")).toEqual(null);
            expect(ajaxCache.getCacheDate("http://api.com/step/step/step/", "GET")).toEqual(null);
            window.clearInterval(interval);
            done();
        }, 6000);
    });
});
