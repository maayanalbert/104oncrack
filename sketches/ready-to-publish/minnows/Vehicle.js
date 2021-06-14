// based off: https://natureofcode.com/book/chapter-6-autonomous-agents/
class Vehicle {
  constructor(x, y) {
    this.location = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.noiseOffsetX = random(-5, 5);
    this.noiseOffsetY = random(-5, 5);
    this.d = MINNOW_THICKNESS + random(-5, 5);
    this.length = this.d;
    this.r = random(0 - COLOR_RANGE / 2, 0 + COLOR_RANGE / 2);
    this.g = random(50 - COLOR_RANGE / 2, 50 + COLOR_RANGE / 2);
    this.b = random(100 - COLOR_RANGE / 2, 100 + COLOR_RANGE / 2);
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
    this.velocity.limit(MAX_SPEED);
    this.location.add(this.velocity);
    this.location = this.boundWithinCanvas(this.location);
    this.length = map(
      abs(this.velocity.x) + abs(this.velocity.y),
      0,
      MAX_SPEED * 2,
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

  seek(target) {
    const desired = target.sub(this.location);
    desired.normalize();
    desired.mult(MAX_SPEED);
    const steer = desired.sub(this.velocity);
    steer.limit(MAX_FORCE);
    this.applyForce(steer);
  }

  display() {
    strokeWeight(2);
    stroke(bgColor);

    fill(this.r, this.g, this.b);

    const theta = this.velocity.heading() + PI / 2;
    push();
    translate(this.location.x, this.location.y);
    rotate(theta);
    ellipse(0, 0 + (this.length - this.d) / 2, this.d, this.length);
    pop();
  }
}
