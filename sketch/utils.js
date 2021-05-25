function getDistance(x1, x2, y1, y2) {
  return sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}
function existsInLine(x1, y1, x2, y2, xMid, yMid) {
  const distDiff = Math.abs(
    getDistance(x1, xMid, y1, yMid) +
      getDistance(x2, xMid, y2, yMid) -
      getDistance(x1, x2, y1, y2)
  );
  return distDiff < MAX_INACTIVE_MOUSE_DIST;
}
