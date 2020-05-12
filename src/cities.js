const fs = require('fs');
const data = fs.readFileSync(__dirname + '/cities5000.csv');
const distance = require('./distance');
const {kdTree} = require('kd-tree-javascript');
const DELIMITER = String.fromCharCode(9);

module.exports = () => {

  const tree = new kdTree([], distance, ["latitude", "longitude"]);

  var cursor = 0;
  var rows = data.toString().split("\n");
  var rowD = [];
  for (var i = 0; i < rows.length; i++)
  {
    row = rows[i];
    cursor += row.length;
    if (i !== rows.length - 1)
      cursor += 1;

    rowD = row.split(DELIMITER);
    tree.insert({
      latitude: parseFloat(rowD[0]),
      longitude: parseFloat(rowD[1]),
      name: rowD[2],
      countryCode: rowD[3],
    });
  }

  return tree;
};

