module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      dist: {
        src: ['./src/boundsawarelayergroup.js'],
        dest: 'dist/boundsawarelayergroup.js'
      }
    },
    jasmine: {
      src: 'dist/**/*.js',
      options: {
        specs: 'spec/**/*.js',
        vendor: 'node_modules/leaflet/dist/leaflet-src.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.registerTask('test', ['browserify:dist', 'jasmine']);

  grunt.registerTask('default', ['test']);
};
