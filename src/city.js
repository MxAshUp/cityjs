import citiesTree from './cities';

export const nearestCity = (point) => {
  const nearestNode = citiesTree.nearest(point, 1)[0];
  return {
    ...nearestNode[0],
    distance: nearestNode[1]
  }
};

export const nearestCities = (point, k) => {
  const results = citiesTree.nearest(point, k).map(([c, d]) => ({
    ...c,
    distance: d
  }));
  results.sort(({distance: a}, {distance: b}) => Math.sign(a - b));
  return results;
};