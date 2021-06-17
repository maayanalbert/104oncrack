const minnows = [];
let bgColor;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  bgColor = color(153, 215, 207);

  for (let i = 0; i < NUM_MINNOWS; i++) {
    const angle = random(0, 2 * PI);
    const radius = random(0, width / 6);
    const x = radius * cos(angle);
    const y = radius * sin(angle);
    minnows.push(new Vehicle(x + width / 2, y + height / 2, true));
  }
}

function draw() {
  background("yellow");
  minnows.forEach((vehicle) => vehicle.seek(createVector(mouseX, mouseY)));
  minnows.forEach((vehicle) => vehicle.update());
  minnows.forEach((vehicle) => vehicle.display());
}
