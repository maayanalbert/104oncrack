let vehicle;

const landmarks = [];

function setup() {
  createCanvas(400, 400);
  vehicle = new Vehicle(width / 2, height / 2);
  viewOrigin = new createVector(0, 0);
  landmarks.push(new LandMark(50, 10, 70, "Stamper"));
  landmarks.push(new LandMark(270, 300, 150, "Carnegie Mellon"));
  landmarks.push(new LandMark(350, 130, 120, "Avenue"));
  textAlign(CENTER, CENTER);
  angleMode(DEGREES);
}

function draw() {
  background(220);
  landmarks.forEach((landmark) => landmark.display());

  vehicle.seek(createVector(mouseX, mouseY));
  vehicle.update();
  vehicle.display();
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

class Vehicle {
  constructor(x, y) {
    this.location = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.r = 25;
    this.maxforce = 0.1;
    this.maxspeed = 4;
    this.dampening = 0.1;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.location.add(this.velocity);
    this.location = this.boundWithinCanvas(this.location);
    this.acceleration.mult(0);
  }

  boundWithinCanvas(location) {
    const x = max(min(location.x, width), 0);
    const y = max(min(location.y, height), 0);
    return createVector(x, y);
  }

  applyForce(force) {
    this.acceleration.add(-force.x * this.dampening, -force.y * this.dampening);
  }

  seek(target) {
    const desired = target.sub(this.location);
    desired.normalize();
    desired.mult(this.maxspeed);
    const steer = desired.sub(this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }

  display() {
    ellipse(this.location.x, this.location.y, this.r, this.r);
  }
}
