let springSystems = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  const colors = [
    color(110, 16, 250), // purple
    color(255, 82, 0), // orange
    color(255, 167, 0), // yellow
  ];

  springSystems.push(new SpringSystem(100, colors[1]));
}

function draw() {
  blendMode(BLEND);

  background(248, 245, 241);

  springSystems.map((springSystem) => springSystem.update());
  springSystems.map((springSystem) => springSystem.render());
}
