import data from './cities5000.csv.js';
import distance from './distance';
import {kdTree} from './kd-tree';
const DELIMITER = String.fromCharCode(9);
const NEWLINE = String.fromCharCode(10);

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

export default tree;