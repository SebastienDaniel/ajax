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
        uglify: {
            prod: {
                options: {
                    expand: true,
                    mangle: true,
                    compress: true
                },
                src: "src/scripts/**.js",
                dest: "ajax.min.js"
            }
        },
        jasmine: {
            src: ["src/scripts/ajaxCache.js"],
            options: {
                specs: ["test/ajaxCache-cache-spec.js", "test/ajaxCache-getCacheDate-spec.js", "test/ajaxCache-getCacheData-spec.js", "test/ajaxCache-canQuery-spec.js"]
            }
        },
        jsdoc: {
            full: {
                src: ['src/scripts/**.js'],
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
    });

    // Load the plugins
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-jasmine");
    grunt.loadNpmTasks("grunt-jscs");
    grunt.loadNpmTasks("grunt-jsdoc");

    grunt.registerTask("build", ["test", "uglify"]);
    grunt.registerTask("test", ["jshint", "jscs", "jasmine"]);
};
