const minnows = [];
let foodMinnow;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  foodMinnow = new Vehicle(window.innerWidth / 2, window.innerHeight / 2, true);

  for (let i = 0; i < sqrt(NUM_MINNOWS); i++) {
    for (let j = 0; j < sqrt(NUM_MINNOWS); j++) {
      const angle = random(0, 2 * PI);
      const radius = random(0, window.innerWidth / 6);
      const x = radius * cos(angle);
      const y = radius * sin(angle);
      minnows.push(
        new Vehicle(x + window.innerWidth / 2, y + window.innerHeight / 2)
      );
    }
  }
}

function draw() {
  background(103, 231, 215);
  minnows.forEach((vehicle) => vehicle.seek(createVector(mouseX, mouseY)));
  minnows.forEach((vehicle) => vehicle.update());
  minnows.forEach((vehicle) => vehicle.display());
  foodMinnow.seek(createVector(mouseX, mouseY));
  foodMinnow.update();
  foodMinnow.display();
}
