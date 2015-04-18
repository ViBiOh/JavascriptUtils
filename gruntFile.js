(function() {
  'use strict';

  module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jscs');
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
        app: {
          src: '<%= src.js %>',
          dest: '<%= dist.dir %>',
          expand: true,
          flatten: true
        }
      },

      jshint: {
        files: [
          'gruntFile.js',
          '<%= dist.dir %>**/*.js'
        ],
        options: {
          jshintrc: true
        }
      },

      jscs: {
        src: [
          'gruntFile.js',
          '<%= dist.dir %>**/*.js'
        ],
        options: {
          config: '.jscsrc'
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
            type: 'html',
            dir: 'coverage/'
          }
        }
      },

      uglify: {
        options: {
          banner: '/*\n\t<%= pkg.name %> v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
          '\tby <%= pkg.author %> under <%= pkg.license %> license' +
          '\n\t<%= pkg.description %>\n*/\n',
          report: 'gzip'
        },
        dist: {
          expand: true,
          src: '<%= dist.dir %>**/*.js'
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

    (function() {
      function processEntry(entry) {
        var preprocessors = entry.options.preprocessors;
        for (var key in preprocessors) {
          if ({}.hasOwnProperty.call(preprocessors, key)) {
            preprocessors[grunt.template.process(key)] = preprocessors[key];
            delete preprocessors[key];
          }
        }
      }

      for (var key in grunt.config.data.karma) {
        if ({}.hasOwnProperty.call(grunt.config.data.karma, key)) {
          processEntry(grunt.config.data.karma[key]);
        }
      }
    })();

    grunt.registerTask('default', ['clean']);
    grunt.registerTask('watching', ['clean', 'copy', 'jshint', 'jscs']);
    grunt.registerTask('dev', ['watching', 'karma']);
    grunt.registerTask('test', ['karma']);
    grunt.registerTask('build', ['dev', 'uglify', 'karma']);
  };
})(this);
