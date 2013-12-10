var banner = require('./src/banner');

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: ['src/**/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    jasmine: {
      src: 'src/boundsawarelayergroup.js',
      options: {
        specs: 'spec/**/*.js',
        vendor: 'node_modules/leaflet/dist/leaflet-src.js',
        styles: 'node_modules/leaflet/dist/leaflet.css'
      }
    },
    wrap: {
      dist: {
        src: ['src/boundsawarelayergroup.js'],
        dest: 'dist/leaflet.boundsawarelayergroup.js',
        options: {
          wrapper: [banner + '\n\n(function (L) {\n', '\n}(L));']
        }
      }
    },
    uglify: {
      options: {
        report: 'gzip',
        banner: banner + '\n'
      },
      dist: {
        src: 'dist/leaflet.boundsawarelayergroup.js',
        dest: 'dist/leaflet.boundsawarelayergroup.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-wrap');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('test', ['jshint:all', 'jasmine']);

  grunt.registerTask('default', ['test', 'wrap:dist', 'uglify:dist']);
};