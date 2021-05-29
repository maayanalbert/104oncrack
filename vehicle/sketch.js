let vehicles = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  for (let i = 0; i < sqrt(NUM_VEHICLES); i++) {
    for (let j = 0; j < sqrt(NUM_VEHICLES); j++) {
      vehicles.push(new Vehicle(i * 10, j * 10, vehicles.length));
    }
  }
}

function draw() {
  background(55, 130, 230);
  vehicles.forEach((vehicle) => vehicle.seek(createVector(mouseX, mouseY)));
  vehicles.forEach((vehicle) => vehicle.update());
  vehicles.forEach((vehicle) => vehicle.display());
}
