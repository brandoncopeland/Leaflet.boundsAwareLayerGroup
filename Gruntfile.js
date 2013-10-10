module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: ['src/**/*.js'],
      options: {
        camelcase: true,
        curly: true,
        eqeqeq: true,
        eqnull: true,
        immed: true,
        indent: 2,
        latedef: true,
        newcap: true,
        noempty: true,
        nonew: true,
        // plusplus: true,
        quotmark: true,
        undef: true,
        unused: true,
        trailing: true,
        globals: {
          L: true
        }
      }
    },
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
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      dist: {
        src: 'dist/boundsawarelayergroup.js',
        dest: 'dist/boundsawarelayergroup.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('test', ['jshint:all', 'browserify:dist', 'jasmine']);

  grunt.registerTask('default', ['test', 'uglify']);
};
