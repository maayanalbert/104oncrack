const minnows = [];
let foodMinnow;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  foodMinnow = new Vehicle(mouseX, mouseY, true);

  for (let i = 0; i < sqrt(NUM_MINNOWS); i++) {
    for (let j = 0; j < sqrt(NUM_MINNOWS); j++) {
      minnows.push(new Vehicle(i * 10, j * 10));
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
