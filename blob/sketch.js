let springSystem;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  springSystem = new SpringSystem();
}

function draw() {
  blendMode(BLEND);

  background(0, 0, 0);

  springSystem.update();
  springSystem.render();
}
