"use strict";

function Dictionary() {
    this._data = {};
}

Dictionary.prototype = {
    all: function() {
        return Object.keys(this._data).map(function(key) {
            return this._data[key];
        }, this);
    },

    add: function(key, value) {
        if (this.has(key)) {
            throw Error("Dictionary already has a value for key: " + key + "\nUse update(key, value) instead");
        } else {
            // add new entry
            this._data[key] = value;
        }

        return this;
    },

    update: function(key, value) {
        if (this.has(key)) {
            this._data[key] = value;
        } else {
            throw Error("Dictionary does not have a value for key " + key + " use add(key, value) instead");
        }

        return this;
    },

    remove: function(key) {
        var prev;

        if (this.has(key)) {
            // store value
            prev = this._data[key];

            // remove from dictionary
            delete this._data[key];

            return prev;
        }
    },

    get: function(key) {
        return this._data[key];
    },

    has: function(key) {
        return !!this._data[key];
    }
};

module.exports = Dictionary;
