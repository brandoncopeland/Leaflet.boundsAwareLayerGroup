var lines = [
  '/*',
  '<%= pkg.name %> - <%= pkg.version %>, <%= pkg.description %>',
  'http://www.github.com/...',
  '(c) 2013 <%= pkg.author %>',
  '',
  '<%= pkg.name %> assumes Leaflet has already been included',
  '*/'
];

module.exports = lines.join('\n');