let springSystem;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  const c = color(0, 0, 0);

  springSystem = new SpringSystem(125, c);
}

function draw() {
  blendMode(BLEND);
  background(0);

  springSystem.update();
  springSystem.render();
}
