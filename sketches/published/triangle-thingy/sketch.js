let springSystem;
const sideLen = 100;
let corners;

let rOff;
let gOff;
let bOff;

let r = 0;
let g = 0;
let b = 0;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  rOff = random(-5, 5);
  gOff = random(-5, 5);
  bOff = random(-5, 5);

  springSystem = new SpringSystem(true);
  corners = addRect(springSystem, sideLen * 3, sideLen * 2);
}

function addRect(springSystem, horizSideLen, vertSideLen, corners) {
  const topLeft = corners?.topLeft ?? springSystem.makeParticle();
  const topRight = corners?.topRight ?? springSystem.makeParticle();
  const bottomLeft = corners?.bottomLeft ?? springSystem.makeParticle();
  const bottomRight = corners?.bottomRight ?? springSystem.makeParticle();

  springSystem.connectParticles(bottomLeft, bottomRight, horizSideLen, false);
  springSystem.connectParticles(topLeft, bottomLeft, vertSideLen, false);

  const diagLen = getHypotenuseOfRightTriangle(horizSideLen, vertSideLen);
  springSystem.connectParticles(topRight, bottomLeft, horizSideLen, false);
  springSystem.connectParticles(bottomRight, topLeft, vertSideLen, false);

  springSystem.connectParticles(topRight, bottomRight, vertSideLen, false);

  springSystem.connectParticles(topLeft, topRight, horizSideLen, false);

  return { topLeft, topRight, bottomLeft, bottomRight };
}

function draw() {
  updateSound(springSystem.getIsMoving());

  background(255 - r, 255 - g, 255 - b);

  springSystem.update();
  springSystem.render();

  const topLeftPos = springSystem.getParticlePosition(corners.topLeft);
  const topRightPos = springSystem.getParticlePosition(corners.topRight);
  const bottomRightPos = springSystem.getParticlePosition(corners.bottomRight);

  if (springSystem.isMoving) {
    rOff += NOISE_INCREMENT;
    gOff += NOISE_INCREMENT;
    bOff += NOISE_INCREMENT;
  }

  r = map(noise(rOff), 0, 1, 0, 255);
  g = map(noise(gOff), 0, 1, 0, 255);
  b = map(noise(bOff), 0, 1, 0, 255);

  fill(r, g, b);
  beginShape();
  vertex(topLeftPos.px, topLeftPos.py);
  vertex(topRightPos.px, topRightPos.py);
  vertex(bottomRightPos.px, bottomRightPos.py);
  endShape(CLOSE);
}
