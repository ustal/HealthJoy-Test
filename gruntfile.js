var modRewrite = require('connect-modrewrite');

module.exports = function(grunt){
    grunt.option('force',true);
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        connect: {
            env: {
                options: {
                    hostname: '*',
                    port: 8080,
                    keepalive: true,
                    base: ['./app'],
                    directory: './app',
                    /* for angular APPs Only */
                    middleware: function (connect, options) {
                        var middlewares = [modRewrite(['^[^\\.]*$ /index.html [L]'])];

                        options.base.forEach(function (base) {
                            middlewares.push(connect.static(base))
                        });

                        return middlewares
                    }
                }
            }
        }
    });
    grunt.loadNpmTasks("grunt-contrib-connect");
};



