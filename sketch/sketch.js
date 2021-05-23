function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  p1 = makeParticle(0, 0, 10, color(255), true);
  p2 = makeParticle(0, 0, 10, color(255), false);
  p3 = makeParticle(0, 0, 10, color(255), false);
  p4 = makeParticle(
    window.innerWidth / 2,
    window.innerHeight / 2,
    10,
    color(255),
    true
  );

  connectParticles(p1, p2, 50, 1, color(255));
  connectParticles(p2, p3, 50, 1, color(255));
  connectParticles(p3, p4, 50, 1, color(255));
}

// use this maybe???
// https://p5js.org/reference/#/p5/bezierVertex
// blend mode https://p5js.org/reference/#/p5/blendMode -> you want ADD

function draw() {
  background(0, 0, 0, 50);

  updateParticles(false, true);

  noFill();
  strokeWeight(1);

  stroke(255);

  bezier(
    particles[0].px,
    particles[0].py,
    particles[1].px,
    particles[1].py,
    particles[2].px,
    particles[2].py,
    particles[3].px,
    particles[3].py
  );
}
