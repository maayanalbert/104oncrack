let springSystems = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  const colors = [
    color(0, 120, 255), // blue
    color(255, 82, 0), // orange
    // color(75, 0, 254), // purple
    color(255, 167, 0), // yellow
    // color(0),
  ];
  for (let i = 0; i < 7; i++) {
    const numSides = floor(random(4, 10) / 2) * 2;
    const sideLen = floor(random(25, 250));
    const colorInd = floor(random(0, colors.length));
    springSystems.push(new SpringSystem(numSides, sideLen, colors[colorInd]));
  }
}

function draw() {
  blendMode(BLEND);

  background(248, 245, 241);

  springSystems.map((springSystem) => springSystem.update());
  springSystems.map((springSystem) => springSystem.render());
}
