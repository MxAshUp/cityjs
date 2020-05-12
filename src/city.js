tree = require('./cities')();

module.exports.nearestCity = (point) => tree.nearest(point, 1);