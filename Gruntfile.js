module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        jshint: {
            options: {
                jshintrc: true
            },
            src:  [ "lib/**/*.js", "index.js" ]
        },
        jscs: {
            options: {
                config: ".jscsrc"
            },
            src: [ "lib/**/*.js", "index.js" ]
        },
        jsdoc: {
            full: {
                src: ["lib/**/*.js", "index.js"],
                options: {
                    destination: 'doc/full-doc/'
                }
            },
            publicAPI: {
                src: ["lib/**/*.js", "index.js"],
                options: {
                    destination: 'doc/public-api/',
                    private: false
                }
            }
        },
        exec: {
            startMockServer: "json-server --watch test/tmp/db.json --ro &",
            xhrFactory_test_bundle: "browserify lib/xhrFactory.js -s xhrFactory > test/tmp/ajax.xhrFactory.bundle.js",
            chainAddons_test_bundle: "browserify lib/chainAddons.js -s chainAddons > test/tmp/ajax.chainAddons.bundle.js",
            ajax_test_bundle: "browserify index.js -s ajax > test/tmp/ajax.bundle.js",
            sinonChai: "browserify node_modules/sinon-chai -s sinonChai > test/tmp/sinon-chai.js"
        },
        mochaTest: {
            test: {
                src: [
                    "test/unit/**/*.test.js"
                ]
            }
        },
        mocha_phantomjs: {
            test: {
                options: {
                    phantomConfig: {
                        "--local-to-remote-url-access": true
                    }
                },
                src: ["test/unit/**/*.test.html"]}
        }
    });

    // Load the plugins
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-jscs");
    grunt.loadNpmTasks("grunt-jsdoc");
    grunt.loadNpmTasks("grunt-exec");
    grunt.loadNpmTasks("grunt-mocha-test");
    grunt.loadNpmTasks("grunt-mocha-phantomjs");

    grunt.registerTask("test", ["jshint", "jscs", "exec", "mochaTest", "mocha_phantomjs"]);
};
