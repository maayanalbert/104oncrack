let vehicles = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  for (let i = 0; i < sqrt(NUM_VEHICLES); i++) {
    for (let j = 0; j < sqrt(NUM_VEHICLES); j++) {
      vehicles.push(new Vehicle(i * 10, j * 10));
    }
  }
}

function draw() {
  background(103, 231, 215);
  vehicles.forEach((vehicle) => vehicle.seek(createVector(mouseX, mouseY)));
  vehicles.forEach((vehicle) => vehicle.update());
  vehicles.forEach((vehicle) => vehicle.display());

  noStroke();
  fill(242, 201, 55);
  ellipse(mouseX, mouseY, 50, 50);
}
