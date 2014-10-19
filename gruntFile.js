(function() {
  'use strict';

  module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
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

      banner: '/*\n\t<%= pkg.name %> v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
          '\tby <%= pkg.author %> under <%= pkg.license %> license' +
          '\n\t<%= pkg.description %>\n*/\n',

      clean: ['<%= dist.dir %>*'],

      concat: {
        app: {
          src: [
            '<%= src.js %>'
          ],
          dest: '<%= dist.dir %><%= pkg.name %>.js',
          options: {
            process: true
          }
        }
      },

      jshint: {
        files: [
          'gruntFile.js',
          '<%= dist.dir %><%= pkg.name %>.js'
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
              '<%= dist.dir %><%= pkg.name %>.js',

              // Test code
              '<%= test.unit %>'
            ],
            preprocessors: {
              '<%= dist.dir %><%= pkg.name %>.js': ['coverage']
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
        dist: {
          options: {
            banner: '<%= banner %>'
          },
          files: {
            '<%= concat.app.dest %>': [
              '<%= concat.app.dest %>'
            ]
          }
        }
      },

      watch: {
        files: [
          'gruntFile.js',
          '<%= concat.app.src %>'
        ],
        tasks: [
          'watching'
        ]
      }
    });

    var gruntKarmaUnit = grunt.config.data.karma.unit.options.preprocessors;
    for (var param in gruntKarmaUnit) {
      if ({}.hasOwnProperty.call(gruntKarmaUnit, param)) {
        gruntKarmaUnit[grunt.template.process(param)] = gruntKarmaUnit[param];
        delete gruntKarmaUnit[param];
      }
    }

    grunt.registerTask('default', ['clean']);
    grunt.registerTask('watching', ['clean', 'concat', 'jshint']);
    grunt.registerTask('dev', ['watching', 'karma']);
    grunt.registerTask('test', ['karma']);
    grunt.registerTask('build', ['dev', 'uglify', 'karma']);
  };
})(this);