// based off: https://natureofcode.com/book/chapter-6-autonomous-agents/
class Vehicle {
  constructor(x, y, isFast = false) {
    this.location = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.noiseOffsetX = random(-5, 5);
    this.noiseOffsetY = random(-5, 5);
    this.d = isFast ? MINNOW_THICKNESS + random(-25, 25) : MINNOW_THICKNESS;
    this.length = this.d;
    this.isFast = isFast;
  }

  update() {
    this.noiseOffsetX += NOISE_INCREMENT;
    this.noiseOffsetY += NOISE_INCREMENT;

    const noiseForceX =
      (noise(this.noiseOffsetX) - 0.5) * MINNOW_NOISE_MULTIPLE;
    const noiseForceY =
      (noise(this.noiseOffsetY) - 0.5) * MINNOW_NOISE_MULTIPLE;

    this.acceleration.add(createVector(noiseForceX, noiseForceY));
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.getMaxSpeed());
    this.location.add(this.velocity);
    this.location = this.boundWithinCanvas(this.location);
    this.length = map(
      abs(this.velocity.x) + abs(this.velocity.y),
      0,
      this.getMaxSpeed() * 2,
      this.d,
      this.d * LEN_MULTIPLE
    );
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

  getMaxSpeed() {
    return this.isFast ? MAX_SPEED * FAST_SPEED_MULTIPLE : MAX_SPEED;
  }

  getMaxForce() {
    return this.isFast ? MAX_FORCE * FAST_FORCE_MULTIPLE : MAX_FORCE;
  }

  seek(target) {
    const desired = target.sub(this.location);
    desired.normalize();
    desired.mult(this.getMaxSpeed());
    const steer = desired.sub(this.velocity);
    steer.limit(this.getMaxForce());
    this.applyForce(steer);
  }

  display() {
    strokeWeight(10);
    stroke(0);
    fill(255);

    const theta = this.velocity.heading() + PI / 2;
    push();
    translate(this.location.x, this.location.y);
    rotate(theta);
    ellipse(0, 0 + (this.length - this.d) / 2, this.d, this.length);
    pop();
  }
}
