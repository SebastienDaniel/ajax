#AJAX
Abstraction of XMLHttpRequest for basic POST, PUT, GET, DELETE operations, which accepts only 1 argument.

## How to use
```shell
npm install sebastiendaniel-ajax
```

```js
var ajax = require("sebastiendaniel-ajax");

// making a new request
ajax({
    url: "the url you are targeting",
    async: true/false // DEPRECATED, always in async mode in future release, defaults to true
    method: "GET"|"POST"|"PUT"|"DELETE", // defaults to "GET"
    data: JSON.stringify("the data you want to send if it's a POST or PUT operation"),
    setHeaders: {}, // an object of header:value pairs
    responseType: "json"|"text"|"xml" // defaults to "text"
    onSuccess: function(response) {
        // I get called on HTTP 20* statuses, 
        // with the full AJAX response object as my argument
    },
    onFailure: function(response) {
        // I get called on HTTP 40* statuses,
        // I also receive the full AJAX response object as my argument
    }
});
```
that's all there is to it
