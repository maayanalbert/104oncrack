class Food {
  constructor() {
    this.particles = [];

    for (let i = 0; i < NUM_FOOD_PARTICLES; i++) {
      this.particles.push(new Particle());
    }
  }

  update() {
    if (frameCount % FOOD_DROP_RATE === 0) {
      this.pauseSmallestParticle();
    }

    if (
      this.particles.length < NUM_FOOD_PARTICLES &&
      minnowsAreOnMouse() === false
    ) {
      this.particles.push(new Particle());
    }

    this.particles.forEach((particle) => particle.update());
  }

  findFirstOverlappingParticleIndex(x, y) {
    for (let i = 0; i < this.particles.length; i++) {
      const particle = this.particles[i];
      if (getDistance(x, particle.x, y, particle.y) < MINNOW_THICKNESS * 2) {
        return i;
      }
    }
    return -1;
  }

  removeParticle(index) {
    this.particles.splice(index, 1);
  }

  pauseSmallestParticle() {
    const movingParticles = this.particles.filter(
      (particle) => particle.isMoving
    );
    if (movingParticles.length === 0) return;
    const minParticle = movingParticles.reduce((prev, cur) =>
      prev.d < cur.d ? prev : cur
    );
    minParticle.isMoving = false;
  }

  render() {
    this.particles.forEach((particle) => particle.render());
  }
}

class Particle {
  constructor() {
    this.isMoving = true;
    this.noiseOffsetX = random(-5, 5);
    this.noiseOffsetY = random(-5, 5);
    this.x = mouseX;
    this.y = mouseY;
    this.d = !this.isMoving
      ? FOOD_MIN_SIZE
      : random(FOOD_MIN_SIZE, FOOD_MAX_SIZE);
    this.posLag = map(
      this.d,
      FOOD_MIN_SIZE,
      FOOD_MAX_SIZE,
      FOOD_MAX_LAG,
      FOOD_MIN_LAG
    );
  }

  update() {
    this.noiseOffsetX += NOISE_INCREMENT;
    this.noiseOffsetY += NOISE_INCREMENT;
    const noiseMultiple = this.isMoving
      ? FOOD_NOISE_MULTIPLE
      : FOOD_NOISE_MULTIPLE_SMALL;
    const noisePosX = (noise(this.noiseOffsetX) - 0.5) * noiseMultiple;
    const noisePosY = (noise(this.noiseOffsetY) - 0.5) * noiseMultiple;
    this.x += noisePosX;
    this.y += noisePosY;

    if (!this.isMoving) return;

    this.x = this.x * this.posLag + mouseX * (1 - this.posLag);
    this.y = this.y * this.posLag + mouseY * (1 - this.posLag);
  }

  render() {
    noStroke();
    fill(255);
    ellipse(this.x, this.y, this.d, this.d);
  }
}
