// taken from: https://natureofcode.com/book/chapter-6-autonomous-agents/
class Vehicle {
  constructor(x, y, r) {
    this.location = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.r = r;
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

  applyForce(force, distance) {
    // console.log(distance);
    const distDampening = map(distance, 0, width + height, 0.5, 0.1);
    const sizeDampening = map(this.r, 0, 200, 0.5, 0.1);
    const dampening = distDampening * sizeDampening * 0.5;
    this.acceleration.add(force.x * dampening, force.y * dampening);
  }

  seek(target) {
    const desired = target.sub(this.location);
    desired.normalize();
    desired.mult(this.maxspeed);
    const steer = desired.sub(this.velocity);
    steer.limit(this.maxforce);
    const distance = this.getDistance(this.location, target);
    this.applyForce(steer, distance);
  }

  display() {
    ellipse(this.location.x, this.location.y, this.r);
  }

  getDistance(location, target) {
    return Math.sqrt(
      Math.pow(location.x - target.x, 2) + Math.pow(location.y - target.y, 2)
    );
  }
}
