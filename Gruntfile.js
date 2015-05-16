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
                    compress: true,
                    screwIE8: true
                },
                src: "src/scripts/**/<%= pkg.name %>.js",
                dest: "build/prod/assets/js/<%= pkg.name %>.min.js"
            }
        },
        qunit: {
            dev: {
                src: ["test/**/*.html"]
            }
        },
        less: {
            dev: { // parse all LESS files into their CSS equivalents
                files: [
                    {
                        expand: true,
                        cwd: "src/styles",
                        src: [ "**/*.less" ],
                        dest: "build/dev/assets/css",
                        ext: ".css"
                    }
                ]
            },
            prod: {
                options: {
                    compress: true
                },
                files: [
                    {
                        expand: true,
                        cwd: "src/styles",
                        src: [ "**/*.less" ],
                        dest: "build/prod/assets/css",
                        ext: ".css"
                    }
                ]
            }
        },
        jsdoc: {
            src: ["src/scripts/*.js", "!src/scripts/polyfills.js"],
            options: {
                destination: "doc",
                private: false
            }
        },
        csslint: {
            options: {
                import: 2
            },
            src: ["build/dev/assets/css/**/*.css"]
        },
        lesslint: {
            src: ["src/styles/**/*.less"],
            options: {
                csslint: {
                    "adjoining-classes": false,
                    "box-model": false,
                    "unqualified-attributes": false,
                    "unique-headings": false,
                    "box-sizing": false,
                    "outline-none": false,
                    "font-sizes": false,
                    "floats": false
                }
            }
        }
    });

    // Load the plugins
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-jscs");
    
    grunt.registerTask("dev", ["test", "copy:dev"]);
    grunt.registerTask("prod", ["concat:prod", "copy:prod"]);
    grunt.registerTask("test", ["jshint", "jscs"]);
};
