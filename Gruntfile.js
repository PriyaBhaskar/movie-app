var grunt = require('grunt'),
    path = require('path');

module.exports = function(grunt) {
   // 'use strict';
    var pkg = grunt.file.readJSON('package.json');
    var cfg = {
        cfg: {
            dist: 'dist',
            src: 'movie-app',
            tmp: '.tmp'
        }
    };

    grunt.initConfig({
        localize : {
            module: {
                options: {
                    src: 'dist/movie-app/module.js',
                    dest: 'dist/movie-app'
                },
                files: [
                    {expand: true, flatten: true, src: ['movie-app/locale/*.json']}
                ]
            }
        },

        karma: {
            unit: {
                configFile: 'test/karma.conf.js'
            },
            ci: {
                configFile: 'test/karma.conf.js',
                singleRun: true,
                browsers: ['PhantomJS']
            }
        },

        compass : {
            run: {
                options: {
                    cacheDir: '.sass-cache/', sassDir: 'movie-app/scss/', cssDir: 'tmp/movie-app/'
                }
            }
        },

        concat : {
            dist: {
                src: [
                    'movie-app/module.js',
                    'movie-app/modules/*/*.js',
                    'tmp/js/templates.js',
                    'tmp/js/styles.js'
                ],
                dest: 'tmp/movie-app/module.js'
            }
        },

        uglify : {
            main: {
                options: {
                    sourceMap: false,
                    mangle: false
                },
                files: [
                    {
                        src: ['tmp/movie-app/module.js'],
                        dest: 'dist/movie-app/module.js'
                    }
                ]
            }
        },

        clean : {
            main: ['docs',
                'coverage',
                'tmp',
                'dist',
                '.stage'],
            dist: ['dist/*/*.css', 'dist/*/module.js', 'dist/*/module.js.map']
        },

        autoprefixer : {
            options: {
                map: true
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'tmp/concat/movie-app/',
                        src: '*/*.css',
                        dest: 'tmp/concat/movie-app/'
                    }
                ]
            }
        },

        useminPrepare : {
            html: 'index.html'
        },

        usemin : {
            css: {
                files: {
                    'movie-app/concat/module.css': ['tmp/movie-app/module.css']
                }
            }
        },

        watch : {
            src: {
                files: [
                    'movie-app/*/*{.js,.css,.html}'
                ],
                tasks: ['build']
            }
        },

        ngtemplates : {
            app: {
                options: {
                    base: 'movie-app',
                    module: 'app.movie-app'
                },
                src: 'movie-app/*.html',
                dest: 'tmp/js/templates.js'
            }
        },

        connect: {
            server: {
                options: {
                    keepalive: true,
                    port: 9000,
                    hostname: '*',
                    onCreateServer: function(server, connect, options) {
                        var io = require('socket.io').listen(server);
                        io.sockets.on('connection', function(socket) {
                            // do something with socket
                        });
                    }
                }
            }
        }

    });


    grunt.task.registerTask('optimize', [
        'ngtemplates',
        'compass:run',
        'useminPrepare',
        'autoprefixer',
        'cssmin:generated',
        'concat',
        'uglify',
        'usemin'
    ]);

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('karma-jasmine');
    grunt.loadNpmTasks('grunt-karma');


    grunt.task.registerTask('build-feature', ['clean:main','optimize', 'connect']);
    grunt.task.registerTask('build-package', ['default',  'build-feature', 'serve']);
    grunt.task.registerTask('test', ['karma:unit']);


};
