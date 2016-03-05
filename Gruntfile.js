module.exports = function(grunt) {
    // instructions for grunt
    
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        jshint: {
            src:  [ "src/scripts/**.js" ]
        },
        jscs: {
            src: [ "src/scripts/**.js" ]
        },
        exec: {
            test: {
                cmd: "browserify src/scripts/ajax/index.js -s ajax > test/ajax.bundle.js"
            }
        },
        mochaTest: {
            test: {
                src: ["test/unit/**/*.test.js"]
            }
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
        }
    });

    // Load the plugins
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-jscs");
    grunt.loadNpmTasks("grunt-jsdoc");
    grunt.loadNpmTasks("grunt-exec");
    grunt.loadNpmTasks("grunt-mocha-test");

    grunt.registerTask("test", ["jshint", "jscs", "exec:test", "mochaTest"]);
};
