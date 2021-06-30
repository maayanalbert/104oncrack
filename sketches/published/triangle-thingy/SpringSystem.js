// based off: http://cmuems.com/2015c/more-springs/
class SpringSystem {
  constructor(mouseClickOn = false) {
    angleMode(DEGREES);
    this.noiseOffset = random(-5, 5);
    this.thickness = 20;
    this.color = color(255, 255, 255);
    this.particles = [];
    this.connections = {};
    this.grabbedParticle = -1;
    this.springSystemIsActive = false;
    this.mouseClickOn = mouseClickOn;
    this.isMoving = false;
  }

  getIsMoving() {
    return this.isMoving;
  }

  getParticlePosition(id) {
    const p = this.particles[id];
    return { px: p.px, py: p.py };
  }

  update() {
    this.updateParticles(false, true);
    this.isMoving = this.getNewIsMoving();
  }

  getNewIsMoving() {
    for (let particle of this.particles) {
      if (abs(particle.vx + particle.vy) > 1) {
        return true;
      }
    }

    return false;
  }

  render() {
    this.drawParticles();
  }

  connectParticles(pk, qk, distance, isFaded) {
    if (
      pk < 0 ||
      pk >= this.particles.length ||
      qk < 0 ||
      qk >= this.particles.length
    ) {
      throw Error(
        "You just tried to create a connection with a particle that doesn't exist. Make sure that every time you're calling 'connectParticles()' it is with two valid particle ids."
      );
    }
    const id1 = pk.toString() + "_" + qk.toString();
    const id2 = qk.toString() + "_" + pk.toString();
    if (id1 in this.connections || id2 in this.connections) {
      return;
    }
    const connection = new Connection(
      this.particles[pk],
      this.particles[qk],
      distance,
      this.thickness,
      isFaded
    );
    this.connections[id1] = connection;
  }

  makeParticle(
    x = width / 2 + random(-5, 5),
    y = height / 2 + random(-5, 5),
    size = 0,
    isFixed = false
  ) {
    const particle = new Particle(x, y, size, isFixed);
    this.particles.push(particle);
    return this.particles.length - 1;
  }

  updateParticles(gravityOn, boundariesOn = true) {
    for (let i = 0; i < this.particles.length; i++) {
      this.noiseOffset += NOISE_INCREMENT;
      this.addMutualRepulsion(i);

      this.particles[i].update(gravityOn, boundariesOn); // update all locations
    }

    this.springSystemIsActive = this.getNewSpringSystemIsActive();
    this.handleMouseMove();

    Object.values(this.connections).forEach((connection) => {
      connection.update();
    });
  }

  drawParticles() {
    Object.values(this.connections).forEach(function (connection) {
      connection.render();
    });

    for (var i = 0; i < this.particles.length; i++) {
      this.particles[i].render(); // render all particles
    }
  }

  getNewSpringSystemIsActive() {
    if (isMobile() || this.mouseClickOn) {
      return mouseIsPressed;
    }

    if (this.springSystemIsActive) {
      if (this.grabbedParticle < 0 && this.grabbedParticle >= particles.length)
        throw new Error();
      const grabbedParticleObj = this.particles[this.grabbedParticle];
      const distToMouse = getDistance(
        grabbedParticleObj.px,
        mouseX,
        grabbedParticleObj.py,
        mouseY
      );
      return distToMouse < MAX_ACTIVE_MOUSE_DIST;
    } else {
      for (let i = 1; i < this.particles.length; i++) {
        const [x1, y1] = [this.particles[i - 1].px, this.particles[i - 1].py];
        const [x2, y2] = [this.particles[i].px, this.particles[i].py];

        if (existsInLine(x1, y1, x2, y2, mouseX, mouseY)) {
          return true;
        }
      }

      return false;
    }
  }

  handleMouseMove() {
    if (!this.springSystemIsActive) {
      this.grabbedParticle = -1;
      return;
    }
    // If the mouse is pressed,
    // find the closest particle, and store its index.
    let grabbedParticleHolder = -1;
    let maxDist = 9999;
    for (let i = 0; i < this.particles.length; i++) {
      const dx = mouseX - this.particles[i].px;
      const dy = mouseY - this.particles[i].py;
      const dh = sqrt(dx * dx + dy * dy);
      if (dh < maxDist && this.particles[i].isFixed == false) {
        maxDist = dh;
        grabbedParticleHolder = i;
      }
    }

    if (this.grabbedParticle < 0) {
      this.grabbedParticle = grabbedParticleHolder;
    }

    if (this.grabbedParticle > -1) {
      // If the user is grabbing a particle, peg it to the mouse.
      this.particles[this.grabbedParticle].setPx(mouseX);
      this.particles[this.grabbedParticle].setPy(mouseY);
    }
  }

  addMutualRepulsion(i) {
    const p = this.particles[i];
    const px = p.px;
    const py = p.py;
    const noiseForce = this.springSystemIsActive
      ? (noise(this.noiseOffset) - 0.5) * NOISE_MULTIPLE
      : 0;

    for (let j = 0; j < i; j++) {
      const q = this.particles[j];
      const qx = q.px;
      const qy = q.py;

      const dx = px - qx;
      const dy = py - qy;
      const dhRaw = sqrt(dx * dx + dy * dy);
      const dh = Math.max(dhRaw, 1);
      const componentInX = dx / dh;
      const componentInY = dy / dh;
      const proportionToDistanceSquared = 1.0 / (dh * dh);

      const repulsionForcex = componentInX * proportionToDistanceSquared;
      const repulsionForcey = componentInY * proportionToDistanceSquared;

      p.addForce(
        repulsionForcex * 10 + noiseForce,
        repulsionForcey * 10 + noiseForce
      ); // add in forces
      q.addForce(
        -repulsionForcex * 10 + noiseForce,
        -repulsionForcey * 10 + noiseForce
      ); // add in forces
    }
  }
}
