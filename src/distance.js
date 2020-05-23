const RAD = Math.PI/180;

// Determines distance between two lat/long points. Taken from kd-tree example: https://github.com/ubilabs/kd-tree-javascript/blob/master/examples/map/index.html
export default function distance(a, b) {
  const dLat = (b.latitude-a.latitude)*RAD;
  const dLon = (b.longitude-a.longitude)*RAD;

  const x = Math.sin(dLat/2);
  const y = Math.sin(dLon/2);

  const d = x*x + y*y * Math.cos(a.latitude*RAD) * Math.cos(b.latitude*RAD);

  return Math.atan2(Math.sqrt(d), Math.sqrt(1-d));
}