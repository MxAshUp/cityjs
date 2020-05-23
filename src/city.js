import citiesTree from './cities';

export const nearestCity = (point) => {
  const nearestNode = citiesTree.nearest(point, 1)[0];
  return {
    ...nearestNode[0],
    distance: nearestNode[1]
  }
};