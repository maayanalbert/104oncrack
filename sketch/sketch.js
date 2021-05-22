const orbs = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  orbs.push(new Vehicle(50, 10, 70));
  orbs.push(new Vehicle(270, 700, 150));
  orbs.push(new Vehicle(500, 500, 120));
  textAlign(CENTER, CENTER);
}

function draw() {
  background(200);
  orbs.forEach((orb) => orb.seek(createVector(mouseX, mouseY)));
  orbs.forEach((orb) => orb.update());
  orbs.forEach((orb) => orb.display());
}

class LandMark {
  constructor(x, y, size, name) {
    this.location = createVector(x, y);
    this.size = size;
    this.name = name;
  }

  display() {
    ellipse(this.location.x, this.location.y, this.size, this.size);
    text(this.name, this.location.x, this.location.y);
  }
}
