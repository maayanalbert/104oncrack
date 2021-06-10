let springSystem;
const sideLen = 50;
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
  corners = addRect(springSystem, sideLen * 3, sideLen);
}

function addRect(springSystem, horizSideLen, vertSideLen, corners) {
  const topLeft = corners?.topLeft ?? springSystem.makeParticle();
  const topRight = corners?.topRight ?? springSystem.makeParticle();
  const bottomLeft = corners?.bottomLeft ?? springSystem.makeParticle();
  const bottomRight = corners?.bottomRight ?? springSystem.makeParticle();

  springSystem.connectParticles(topLeft, topRight, horizSideLen);
  springSystem.connectParticles(bottomLeft, bottomRight, horizSideLen);
  springSystem.connectParticles(topLeft, bottomLeft, vertSideLen);
  springSystem.connectParticles(topRight, bottomRight, vertSideLen);

  const diagLen = getHypotenuseOfRightTriangle(horizSideLen, vertSideLen);
  springSystem.connectParticles(topRight, bottomLeft, diagLen);
  springSystem.connectParticles(bottomRight, topLeft, diagLen);

  return { topLeft, topRight, bottomLeft, bottomRight };
}

function draw() {
  background(0, 0, 0);

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
