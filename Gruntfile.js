module.exports = function(grunt) {
    // instructions for grunt
    
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        jshint: {
            src:  [ "src/scripts/ajax.js" ]
        },
        jscs: {
            src: [ "src/scripts/ajax.js" ]
        },
        uglify: {
            prod: {
                options: {
                    expand: true,
                    mangle: true,
                    compress: true
                },
                src: "src/scripts/ajax.js",
                dest: "ajax.min.js"
            }
        }
    });

    // Load the plugins
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-jscs");

    grunt.registerTask("build", ["test", "uglify"]);
    grunt.registerTask("test", ["jshint", "jscs"]);
};
