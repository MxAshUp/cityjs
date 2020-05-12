const csvParse = require('csv-parse/lib/sync')
const fs = require('fs');
const distance = require('./distance');

const cities = csvParse(fs.readFileSync(__dirname + '/cities5000.csv'), {
  header: true,
  columns: [
    'latitude',
    'longitude',
    'name',
    'countryCode',
  ],
  skip_empty_lines: true
});

const {kdTree} = require('kd-tree-javascript');

tree = new kdTree(cities, distance, ["latitude", "longitude"]);

module.exports.nearestCity = (point) => tree.nearest(point, 1);