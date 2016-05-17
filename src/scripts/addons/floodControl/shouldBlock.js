var Dictionary = require("./Dictionary"),
    controllers = {
        get: new Dictionary(),
        post: new Dictionary(),
        put: new Dictionary(),
        delete: new Dictionary()
    };

function canQuery(url, delay) {
    if (this.has(url)) {
        if (this.get(url) < Date.now() - delay) {}
    } else {
        this.add(url, Date.now());
        return true;
    }
}

// extend all dictionaries to have a self-assessment method
// based on floodControllers' needs
Object.keys(controllers).forEach(function(key) {
    controllers[key].canQuery = canQuery;
});

// GET is controlled by URL + date

// PUT is controlled by URL + date + body

// POST is controlled by URL + date + body

// DELETE is controlled by URL + date

module.exports = function shouldBlock(config) {
    
};
