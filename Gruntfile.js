module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    execute: {
      target: {
        src: ['Server.js']
      }
    },

    sass: {
      options: {
        includePaths: ['app/bower_components/foundation/scss']
      },
      dist: {
        options: {
          style: 'expanded',
          lineNumbers: true
        },
        files: {
          'app/app.css': 'app/scss/app.scss'
        }
      }
    },

    watch: {
      grunt: {files: ['Gruntfile.js']},

      // scripts: {
      //   files: ['Server.js'],
      //   tasks: ['execute']
      // },

      sass: {
        files: 'app/scss/**/*.scss',
        tasks: ['sass']
      }
    },
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-execute');
  // grunt.loadNpmTasks('grunt-express');

  grunt.registerTask('build', ['sass']);
  grunt.registerTask('default', ['build', 'watch']);

}