'use strict';
module.exports = function(grunt) {
    // Load all tasks
    require('load-grunt-tasks')(grunt);
    // Show elapsed time
    require('time-grunt')(grunt);

    var jsFileList = [
        'public/assets/vendor/bootstrap/js/transition.js',
        'public/assets/vendor/bootstrap/js/alert.js',
        'public/assets/vendor/bootstrap/js/button.js',
        'public/assets/vendor/bootstrap/js/carousel.js',
        'public/assets/vendor/bootstrap/js/collapse.js',
        'public/assets/vendor/bootstrap/js/dropdown.js',
        'public/assets/vendor/bootstrap/js/modal.js',
        'public/assets/vendor/bootstrap/js/tooltip.js',
        'public/assets/vendor/bootstrap/js/popover.js',
        'public/assets/vendor/bootstrap/js/scrollspy.js',
        'public/assets/vendor/bootstrap/js/tab.js',
        'public/assets/vendor/bootstrap/js/affix.js',
        'assets/js/plugins/*.js',
        'assets/js/_*.js'
    ];

    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'public/assets/js/*.js',
                '!public/assets/js/scripts.js',
                '!public/assets/**/*.min.*'
            ]
        },
        less: {
            dev: {
                files: {
                    'public/assets/css/main.css': [
                        'public/assets/less/main.less'
                    ]
                },
                options: {
                    compress: false,
                    // LESS source map
                    // To enable, set sourceMap to true and update sourceMapRootpath based on your install
                    sourceMap: true,
                    sourceMapFilename: 'public/assets/css/main.css.map',
                    sourceMapRootpath: '/'
                }
            },
            build: {
                files: {
                    'public/assets/css/main.min.css': [
                        'public/assets/less/main.less'
                    ]
                },
                options: {
                    compress: true
                }
            }
        },
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: [jsFileList],
                dest: 'public/assets/js/scripts.js',
            },
        },
        uglify: {
            dist: {
                files: {
                    'public/assets/js/scripts.min.js': [jsFileList]
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie 8', 'ie 9', 'android 2.3', 'android 4', 'opera 12']
            },
            dev: {
                options: {
                    map: {
                        prev: 'public/assets/css/'
                    }
                },
                src: 'public/assets/css/main.css'
            },
            build: {
                src: 'public/assets/css/main.min.css'
            }
        },
        modernizr: {
            build: {
                devFile: 'public/assets/vendor/modernizr/modernizr.js',
                outputFile: 'public/assets/js/vendor/modernizr.min.js',
                files: {
                    'src': [
                        ['public/assets/js/scripts.min.js'],
                        ['public/assets/css/main.min.css']
                    ]
                },
                extra: {
                    shiv: false
                },
                uglify: true,
                parseFiles: true
            }
        },
        watch: {
            less: {
                files: [
                    'public/assets/less/*.less',
                    'public/assets/less/**/*.less'
                ],
                tasks: ['less:dev', 'autoprefixer:dev']
            },
            js: {
                files: [
                    jsFileList,
                    '<%= jshint.all %>'
                ],
                tasks: ['jshint', 'concat']
            },
            livereload: {
                // Browser live reloading
                // https://github.com/gruntjs/grunt-contrib-watch#live-reloading
                options: {
                    livereload: false
                },
                files: [
                    'public/assets/css/main.css',
                    'public/assets/js/scripts.js',
                    'app/views/*.php',
                    '*.php'
                ]
            }
        }
    });

    // Register tasks
    grunt.registerTask('default', [
        'dev'
    ]);
    grunt.registerTask('dev', [
        'jshint',
        'less:dev',
        'autoprefixer:dev',
        'concat'
    ]);
    grunt.registerTask('build', [
        'jshint',
        'less:build',
        'autoprefixer:build',
        'uglify',
        'modernizr'
    ]);
};
