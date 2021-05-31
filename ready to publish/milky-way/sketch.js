/*  Based of Generative Design's M_1_2_01:
    http://www.generative-gestaltung.de/2/sketches/?02_M/M_1_2_01
*/

const ACT_RANDOM_SEED = 0;
const PARTICLE_COUNT = 300;
const RADIUS = 100;
const RANGE_VARIANCE = 1;
let faderX = 1;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  noStroke();
}

function getMutatedCanvasPos() {
  const midX = width / 2;

  const midY = height / 2;

  const distFromCenter = getDistance(mouseX, midX, mouseY, midY);
  if (distFromCenter > RADIUS) {
    return width;
  } else {
    return map(distFromCenter, 0, RADIUS, 0, width);
  }
}

function getPosition(angle) {
  if (angle === 0) {
    faderX = faderX * 0.97 + (0.03 * getMutatedCanvasPos()) / width;
    randomSeed(ACT_RANDOM_SEED);
  }

  const xRangeStart = random(-width * RANGE_VARIANCE, 0);
  const xRangeEnd = random(width, width * (1 + RANGE_VARIANCE));
  const randomX = random(xRangeStart, xRangeEnd);

  const yRangeStart = random(-height * RANGE_VARIANCE, 0);
  const yRangeEnd = random(height, height * (1 + RANGE_VARIANCE));
  const randomY = random(yRangeStart, yRangeEnd);

  const circleX = width / 2 + cos(angle) * RADIUS;
  const circleY = height / 2 + sin(angle) * RADIUS;
  const x = lerp(randomX, circleX, faderX);
  const y = lerp(randomY, circleY, faderX);

  return { x: x, y: y };
}

function blueDot(x, y, size) {
  fill(86, 186, 255, size * 0.1 * 255);
  ellipse(x, y, size, size);
}

function purpleDot(x, y, size) {
  fill(150, 100, 255, 75);
  ellipse(x, y, max(size, 5), max(size, 5));
}

function draw() {
  background(0);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const angle = (i * 360) / PARTICLE_COUNT;
    pos = getPosition(angle);

    const size = random(0, 10);

    purpleDot(pos.x, pos.y, size);
    blueDot(pos.x, pos.y, size);
  }
}

function getDistance(x1, x2, y1, y2) {
  return sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}
