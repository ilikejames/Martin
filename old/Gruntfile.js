'use strict';

module.exports = function(grunt) {

   
    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('grunt-exec');


    grunt.initConfig({

        requirejs: {
            dev: {
                options: {
                    findNestedDependencies: true,
                    mainConfigFile: 'app/public/ng/config.js',
                    name: '../../../node_modules/almond/almond',
                    out: 'app/public/assets/scripts/app.js', 
                    generateSourceMaps : true, 
                    preserveLicenseComments : true
                }
            },
            dist: {
                options: {
                    findNestedDependencies: true,
                    mainConfigFile: 'app/public/ng/config.js',
                    name: '../../../node_modules/almond/almond',
                    out: 'app/public/assets/scripts/app.js', 
                    optimize: 'uglify2', 
                    generateSourceMaps : true, 
                    preserveLicenseComments : false
                }
            }
        },

        ngtemplates:  {
            ilj:        {
                cwd:      'app/public/ng/',
                src:      '**/*.html',
                dest:     'app/public/assets/js/app.templates.js'
            }
        },

        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '_tmp',
                        'dist',
                        '.sass-cache'
                    ]
                }]
            }
        },

        compass: {
            all: {
                options: {
                    sassDir: 'app/public/sass/',
                    cssDir: 'app/public/css/',
                    specify : 'app/public/sass/main.scss'
                 }
            }

        },

        cssmin: {
            dist: {
                files: {
                    '_tmp/css/main.css': ['app/public/css/main.css'],
                }
            }
        },

        watch: {
            sass: {
                files: ['app/public/sass/**/*.scss'],
                tasks: ['compass:all']
            },

            templates: {
                files: ['app/public/ng/**/*.html'],
                tasks: ['ngtemplates']
            },

            js : {
                files : ['app/public/ng/**/*.js', '!/app/public/ng/**/*.test.js'], 
                tasks : ['concat:js', 'concat:tests']
            },

            tests : {
                files : ['/app/public/ng/**/*.test.js'], 
                tasks : ['contat:tests']
            }
        },

        copy: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'app/public/images/',
                    src: ['**'],
                    dest: '_tmp/images/'
                }, {
                    expand: true,
                    cwd: 'app/public/fonts/',
                    src: ['**'],
                    dest: '_tmp/fonts/'
                }, {
                    expand: true,
                    cwd: 'app/public/locales/',
                    src: ['**'],
                    dest: '_tmp/locales/'
                }
                ]
            },

            versioning : {
                files: [
                {
                    expand: true,
                    cwd: '_tmp/',
                    src: ['**'],
                    dest: 'dist/<%= grunt.config.get("buildVersion") %>/'
                }
                ]
            }
        },

        nodemon: {
            dev: {
                script: 'app/server.js',
                options: {
                    //cwd: 'app',
                    nodeArgs: ['--debug'],
                    callback: function(nodemon) {
                        nodemon.on('log', function(event) {
                            console.log(event.colour);
                        });
                    },
                    env: {
                        PORT: 8001
                    },
                    watch: ['app/lib', 'app/server.js']
                }
            }
        },

        concurrent: {
            dev: {
                tasks: ['nodemon', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },

        jasmine: {
            tester: {
                options: {
                    specs: 'app/public/spec/*Spec.js',
                    template: require('grunt-template-jasmine-requirejs'),
                    templateOptions: {
                        requireConfig: {
                            requireConfigFile: 'app/public/scripts/config.js'
                        }
                    }
                }
            }
        },

        jasmine_node: {
            options: {
                forceExit: false,
                match: '.',
                matchall: true,
                extensions: 'js',
                specNameMatcher: 'spec',
                verbose: true,
                jUnit: {
                    report: true,
                    savePath : "./build/reports/jasmine/",
                    useDotNotation: true,
                    consolidate: true
                }
            },
            all: [
                'app/lib/depop-controllers/spec/',
                'app/lib/depop-controllers/lib/spec/',
                'app/lib/depop-data/spec/',
                'app/lib/depop-middleware/spec/'
                ]
        },

        concat: {
            options : {
                sourceMap : true
            },
            js: {
                src:  [ 
                    'app/public/ng/**/*.js',
                    '!app/public/ng/**/*.test.js', 
                    '!app/public/ng/**/*.old.js', 
                ],
                dest: 'app/public/assets/js/app.js'
            },
            tests : {
                src : 'app/public/ng/**/*.test.js',
                dest : 'app/public/assets/js/app.test.js'   
            }
            
        },

        compress : {
            main: {
                options: {
                    mode: 'gzip'
                },
                files: [
                    {
                        expand: true, 
                        src: [
                            'dist/<%= grunt.config.get("buildVersion") %>/scripts/*.js', 
                            'dist/<%= grunt.config.get("buildVersion") %>/locales/*.*'
                        ],
                        ext : '.gz.js'
                    },
                    {
                        expand: true, 
                        src: [
                            'dist/<%= grunt.config.get("buildVersion") %>/css/*.css' 
                        ],
                        ext : '.gz.css'
                    }
                ]
            }
        }, 

        exec: {

            s3 : {
                cmd : function(env) {
                    return "bash s3deploy.sh " + getBuildVersion()
                }
            }
        }


    });

    function setBuildVersion() {


        if(grunt.option('build')) {
            grunt.config.set('buildVersion', grunt.option('build'));
            return grunt.option('build');
        }


        var buildVersion = grunt.config.get('buildVersion');
        if(buildVersion) return;

        var dt = new Date();
            buildVersion = [
                        '' + dt.getFullYear(), 
                        ("0" + (dt.getMonth() + 1)).slice(-2), 
                        ("0" + (dt.getDate() + 1)).slice(-2), 
                        ("0" + (dt.getHours() + 1)).slice(-2), 
                        ("0" + (dt.getMinutes() + 1)).slice(-2), 
                        ("0" + (dt.getSeconds() + 1)).slice(-2),
                    ].join('');
        grunt.config.set('buildVersion', buildVersion );
    }

    function getBuildVersion() {
        return grunt.config.get('buildVersion');
    }

    grunt.registerTask('setBuildVersion', setBuildVersion);


    grunt.registerTask('write-environment', function() {

        var o = {
            "STATIC_URL" :  process.env.STATIC_BUNDLE + "/builds/" + getBuildVersion() + "/",
            "EMOJI_URL" : process.env.STATIC_BUNDLE + "/emoji/",
            "JAVASCRIPT_LOADER" : process.env.STATIC_BUNDLE + "/builds/" + getBuildVersion() + "/scripts/app.gz.js"
        };
        grunt.file.write('build-static.json', JSON.stringify(o,null, "\t"));
        grunt.log.ok('Writing environment settings with buildVersion ', getBuildVersion());
    });


    grunt.registerTask('build-to-s3', [
        'clean:dist',
        'setBuildVersion',
        'write-environment', 
        'swig-browser:build', // templates
        'requirejs:dist', // requirejs
        'compass', // compile sass
        'cssmin:dist', // minify csss
        'copy:dist',
        'copy:versioning',
        'compress',
        'exec:s3', 
        'clean:dist'    
    ]);

    grunt.registerTask('test:client', [
        "jasmine:tester"
    ]); 

    grunt.registerTask('test:server', [
        "jasmine_node"
    ]); 

    grunt.registerTask('server', 'Run the dev server, and also watches for changes to views and sass.', [
        'concurrent:dev'
    ]);


};