// based off: https://natureofcode.com/book/chapter-6-autonomous-agents/
class Vehicle {
  constructor(x, y, isFast = false) {
    this.isFast = isFast;
    this.location = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.maxforce = isFast ? MAX_FORCE * FAST_FORCE_MULTIPLE : MAX_FORCE;
    this.maxspeed = isFast ? MAX_SPEED * FAST_SPEED_MULTIPLE : MAX_SPEED;
    this.noiseOffsetX = random(-5, 5);
    this.noiseOffsetY = random(-5, 5);
    this.d = MINNOW_THICKNESS;
    this.length = this.d;
    this.r = random(0 - COLOR_RANGE / 2, 0 + COLOR_RANGE / 2);
    this.g = random(40 - COLOR_RANGE / 2, 40 + COLOR_RANGE / 2);
    this.b = random(57 - COLOR_RANGE / 2, 57 + COLOR_RANGE / 2);
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
    this.velocity.limit(this.maxspeed);
    this.location.add(this.velocity);
    this.location = this.boundWithinCanvas(this.location);
    this.length = map(
      abs(this.velocity.x) + abs(this.velocity.y),
      0,
      this.maxspeed * 2,
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
    desired.mult(this.maxspeed);
    const steer = desired.sub(this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }

  display() {
    strokeWeight(1);
    stroke(135, 236, 224);

    if (this.isFast) {
      fill(228, 188, 44);
    } else {
      fill(this.r, this.g, this.b);
    }

    const theta = this.velocity.heading() + PI / 2;
    push();
    translate(this.location.x, this.location.y);
    rotate(theta);
    ellipse(0, 0 + (this.length - this.d) / 2, this.d, this.length);
    pop();
  }
}
