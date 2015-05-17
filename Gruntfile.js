module.exports = function(grunt) {
    // instructions for grunt
    
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        copy: {
            dev: {
                files:  [{
                    expand: true,
                    cwd: "src/scripts/",
                    src: [ "**/*.js"],
                    dest: "build/dev/assets/js/"
                },
                {
                    expand: true,
                    cwd: "src/img/",
                    src: [ "**/*.{jpg,jpeg,png,gif}"],
                    dest: "build/dev/assets/img/"
                }]
            }
        },
        jshint: {
            src:  [ "src/scripts/**/*.js" ]
        },
        jscs: {
            src: [ "src/scripts/**/*.js" ]
        },
        uglify: {
            prod: {
                options: {
                    expand: true,
                    mangle: true,
                    compress: true
                },
                src: "src/scripts/**/<%= pkg.name %>*.js",
                dest: "build/prod/assets/js/<%= pkg.name %>.min.js"
            }
        },
        jsdoc: {
            src: ["src/scripts/*.js", "!src/scripts/polyfills.js"],
            options: {
                destination: "doc",
                private: false
            }
        }
    });

    // Load the plugins
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-jscs");
    
    grunt.registerTask("dev", ["test", "copy:dev"]);
    grunt.registerTask("prod", ["test", "uglify"]);
    grunt.registerTask("test", ["jshint", "jscs"]);
};
