const {kdTree} = require('kd-tree-javascript');

const csvParse = require('csv-parse/lib/sync')
const fs = require('fs');

const RAD = Math.PI/180;

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

// Determines distance between two lat/long points. Taken from kd-tree example: https://github.com/ubilabs/kd-tree-javascript/blob/master/examples/map/index.html
function distance(a, b) {
  const dLat = (b.latitude-a.latitude)*RAD;
  const dLon = (b.longitude-a.longitude)*RAD;

  const x = Math.sin(dLat/2);
  const y = Math.sin(dLon/2);

  const d = x*x + y*y * Math.cos(a.latitude*RAD) * Math.cos(b.latitude*RAD);

  return Math.atan2(Math.sqrt(d), Math.sqrt(1-d));
}

tree = new kdTree(cities, distance, ["latitude", "longitude"]);

module.exports.nearestCity = (point) => tree.nearest(point, 1);