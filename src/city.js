const {kdTree} = require('kd-tree-javascript');

const csvParse = require('csv-parse/lib/sync')
const fs = require('fs');

const columns = [
  'latitude',
  'longitude',
  'name',
  'countryCode',
];

const cities = csvParse(fs.readFileSync(__dirname + '/cities5000.csv'), {
  header: true,
  columns,
  skip_empty_lines: true
})

// Taken from kd-tree example: https://github.com/ubilabs/kd-tree-javascript/blob/master/examples/map/index.html
function distance(a, b) {
  var lat1 = a.latitude,
  lon1 = a.longitude,
  lat2 = b.latitude,
  lon2 = b.longitude;
  var rad = Math.PI/180;

  var dLat = (lat2-lat1)*rad;
  var dLon = (lon2-lon1)*rad;
  var lat1 = lat1*rad;
  var lat2 = lat2*rad;

  var x = Math.sin(dLat/2);
  var y = Math.sin(dLon/2);

  var a = x*x + y*y * Math.cos(lat1) * Math.cos(lat2);
  return Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

tree = new kdTree(cities, distance, ["latitude", "longitude"]);

module.exports.nearestCity = (point) => tree.nearest(point, 1);