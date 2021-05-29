// taken from: https://natureofcode.com/book/chapter-6-autonomous-agents/
class Vehicle {
  constructor(x, y, index) {
    this.location = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.maxforce = 0.1;
    this.maxspeed = 4;
    this.r = map(index, 0, NUM_VEHICLES, 1, 15);
    this.noiseOffsetX = random(-5, 5);
    this.noiseOffsetY = random(-5, 5);
    this.index = index;
  }

  update() {
    this.noiseOffsetX += NOISE_INCREMENT;
    this.noiseOffsetY += NOISE_INCREMENT;

    const noiseForceX = (noise(this.noiseOffsetX) - 0.5) * POS_NOISE_MULTIPLE;
    const noiseForceY = (noise(this.noiseOffsetY) - 0.5) * POS_NOISE_MULTIPLE;

    this.acceleration.add(createVector(noiseForceX, noiseForceY));
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
    this.acceleration.add(force.x, force.y);
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
    const fillGradient = map(this.index, 0, NUM_VEHICLES, 255, 0);
    const strokeGradient = map(this.index, 0, NUM_VEHICLES, 0, 255);

    stroke(255, strokeGradient);
    fill(70, 150, 250, strokeGradient);

    ellipse(this.location.x, this.location.y, this.r, this.r);
  }

  getDistance(location, target) {
    return Math.sqrt(
      Math.pow(location.x - target.x, 2) + Math.pow(location.y - target.y, 2)
    );
  }
}
