(function() {
  'use strict';

  module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');

    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      dist: {
        dir: 'dist/'
      },
      src: {
        dir: 'src/',
        js: [
          '<%= src.dir %>**/*.js',
          '!<%= src.dir %>**/test*.js'
        ]
      },
      test: {
        unit: '<%= src.dir %>**/test.*.js'
      },

      clean: ['<%= dist.dir %>*'],

      copy: {
        src: {
          files: [
            {
              src: [
                '<%= src.js %>'
              ],
              dest: '<%= dist.dir %>',
              expand: true,
              flatten: true
            }
          ]
        }
      },

      jshint: {
        files: [
          'gruntFile.js',
          '<%= dist.dir %>**/*.js'
        ],
        options: {
          bitwise: true,
          camelcase: true,
          curly: true,
          eqeqeq: true,
          es3: true,
          forin: true,
          freeze: true,
          immed: true,
          latedef: true,
          newcap: true,
          noarg: true,
          noempty: true,
          nonbsp: true,
          nonew: true,
          plusplus: true,
          quotmark: true,
          undef: true,
          unused: true,
          strict: true,
          esnext: true,
          browser: true,
          globals: {
            // Grunt predef
            module: false,

            // AMD predef
            define: false
          }
        }
      },

      karma: {
        unit: {
          options: {
            files: [
              // App dependencies
              '<%= dist.dir %>**/*.js',

              // Test code
              '<%= test.unit %>'
            ],
            preprocessors: {
              '<%= dist.dir %>**/*.js': ['coverage']
            }
          },
          configFile: 'karma.conf.js',
          coverageReporter: {
            type : 'html',
            dir : 'coverage/'
          }
        }
      },

      uglify: {
        options: {
          banner: '/*\n\t<%= pkg.name %> v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
          '\tby <%= pkg.author %> under <%= pkg.license %> license' +
          '\n\t<%= pkg.description %>\n*/\n',
          report: 'gzip'
        },
        dist: {
          files: [{
            expand: true,
            src: '<%= dist.dir %>**/*.js'
          }]
        }
      },

      watch: {
        files: [
          'gruntFile.js',
          '<%= src.js %>'
        ],
        tasks: [
          'watching'
        ]
      }
    });

    (function processTemplatingKarma() {
      function templateToFiles(template) {
        return grunt.file.expand(grunt.template.process(template).split(','));
      }

      function processEntry(entry) {
        var i, j;

        var preprocessors = entry.options.preprocessors;
        var preprocessorFiles;
        for (var key in preprocessors) {
          if ({}.hasOwnProperty.call(preprocessors, key)) {
            preprocessorFiles = templateToFiles(key);
            for (i = 0, j = preprocessorFiles.length; i < j; i += 1) {
              preprocessors[preprocessorFiles[i]] = preprocessors[key];
            }
            delete preprocessors[key];
          }
        }

        var files = entry.options.files;
        var resolvedFiles = [];
        for (i = 0, j = files.length; i < j; i += 1) {
          resolvedFiles = resolvedFiles.concat(templateToFiles(files[i]));
        }
        entry.options.files = resolvedFiles;
      }

      for (var key in grunt.config.data.karma) {
        if ({}.hasOwnProperty.call(grunt.config.data.karma, key)) {
          processEntry(grunt.config.data.karma[key]);
        }
      }
    })();

    grunt.registerTask('default', ['clean']);
    grunt.registerTask('watching', ['clean', 'copy', 'jshint']);
    grunt.registerTask('dev', ['watching', 'karma']);
    grunt.registerTask('test', ['karma']);
    grunt.registerTask('build', ['dev', 'uglify', 'karma']);
  };
})(this);