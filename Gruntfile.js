module.exports = function(grunt) {
    "use strict";
    
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        jshint: {
            options: {
                jshintrc: true
            },
            src:  [ "src/scripts/ajax/**/*.js" ]
        },
        jscs: {
            options: {
                config: ".jscsrc"
            },
            src: [ "src/scripts/**.js" ]
        },
        jsdoc: {
            full: {
                src: ['src/scripts/**/*.js'],
                options: {
                    destination: 'doc/full-doc/'
                }
            },
            publicAPI: {
                src: ['src/scripts/**.js'],
                options: {
                    destination: 'doc/public-api/',
                    private: false
                }
            }
        },
        exec: {
            startMockServer: "json-server --watch test/tmp/db.json --ro &",
            xhrFactory_test_bundle: "browserify src/scripts/ajax/xhrFactory.js -s xhrFactory > test/tmp/ajax.xhrFactory.bundle.js",
            chainAddons_test_bundle: "browserify src/scripts/ajax/chainAddons.js -s chainAddons > test/tmp/ajax.chainAddons.bundle.js",
            ajax_test_bundle: "browserify src/scripts/ajax/index.js -s ajax > test/tmp/ajax.bundle.js",
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
