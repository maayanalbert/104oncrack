let springSystems = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  for (let i = 0; i < 20; i++) {
    springSystems.push(new SpringSystem());
  }
}

function draw() {
  blendMode(BLEND);

  background(0, 0, 0);

  springSystems.map((springSystem) => springSystem.update());
  springSystems.map((springSystem) => springSystem.render());
}
