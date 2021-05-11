// taken from: https://natureofcode.com/book/chapter-6-autonomous-agents/
class Vehicle {
  constructor(x, y) {
    this.location = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.r = 3;
    this.maxforce = 0.1;
    this.maxspeed = 4;
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
    this.acceleration.add(force.x, force.y);
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
    const theta = this.velocity.heading() + PI / 2;
    fill(175);
    stroke(0);
    push();
    translate(this.location.x, this.location.y);
    rotate(theta);
    beginShape();
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape(CLOSE);
    pop();
  }
}
