const data = require('fs').readFileSync(__dirname + '/cities5000.csv').toString();
const distance = require('./distance');
const {kdTree} = require('kd-tree-javascript');
const DELIMITER = String.fromCharCode(9);
const NEWLINE = String.fromCharCode(10);

module.exports = () => {

  const tree = new kdTree([], distance, ["latitude", "longitude"]);

  let cursor = 0;
  let endLine = 0;

  while((endLine = data.indexOf(NEWLINE, cursor)) !== -1) {

    const rowD = data.substring(cursor, endLine).split(DELIMITER);
    tree.insert({
      latitude: parseFloat(rowD[0]),
      longitude: parseFloat(rowD[1]),
      name: rowD[2],
      countryCode: rowD[3],
    });

    cursor = endLine + 1;
  }

  return tree;
};