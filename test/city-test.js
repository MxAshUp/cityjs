const describe  = require('kape');
const {nearestCity, nearestCities} = require('../dist/cityjs.umd.min');

describe('nearestCity()', nearestCity, snapshot =>
  snapshot(
    [{latitude: 44.0618643, longitude: -121.3188065}],
    [{latitude: 41.3394978, longitude: -96.1462098}],
  )
);

describe('nearestCities()', nearestCities, snapshot =>
  snapshot(
    [{latitude: 44.0618643, longitude: -121.3188065}, 5],
    [{latitude: 41.3394978, longitude: -96.1462098}, 12],
  )
);