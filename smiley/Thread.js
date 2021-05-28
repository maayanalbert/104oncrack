class Thread {
  constructor(startX, startY, endX, endY, thickness, c, length) {
    this.noiseOffset = random(-5, 5);
    this.thickness = thickness;
    this.color = c;
    this.particles = [];
    this.connections = {};
    // The index in the particle array, of the one the user has clicked.
    this.grabbedParticle = -1;
    this.threadIsActive = false;
    this.length = length;

    const pk1 = this.makeParticle(startX, startY, 10, color(255), true);
    const pk2 = this.makeParticle(startX, startY, 10, color(255), false);
    const pk3 = this.makeParticle(endX, endY, 10, color(255), false);
    const pk4 = this.makeParticle(endX, endY, 10, color(255), true);

    this.connectParticles(pk1, pk2, length / 3, 1, color(255));
    this.connectParticles(pk2, pk3, length / 3, 1, color(255));
    this.connectParticles(pk3, pk4, length / 3, 1, color(255));
  }

  update() {
    this.updateParticles(true, true);
  }

  render() {
    noFill();
    strokeWeight(this.thickness);

    stroke(this.color);

    bezier(
      this.particles[0].px,
      this.particles[0].py,
      this.particles[1].px,
      this.particles[1].py,
      this.particles[2].px,
      this.particles[2].py,
      this.particles[3].px,
      this.particles[3].py
    );
  }

  connectParticles(pk, qk, distance, lineWeight, lineColor) {
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
      lineWeight,
      lineColor
    );
    this.connections[id1] = connection;
  }

  makeParticle(x, y, size, fillColor, isFixed) {
    const particle = new Particle(x, y, size, fillColor, isFixed);
    this.particles.push(particle);
    return this.particles.length - 1;
  }

  updateParticles(gravityOn, boundariesOn = true) {
    for (let i = 0; i < this.particles.length; i++) {
      this.noiseOffset += NOISE_INCREMENT;
      this.addMutualRepulsion(i);

      this.particles[i].update(gravityOn, boundariesOn); // update all locations
    }

    this.threadIsActive = this.getNewThreadIsActive();
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

  getNewThreadIsActive() {
    if (isMobile()) {
      return mouseIsPressed;
    }
    if (this.particles.length !== 4) throw new Error();

    if (this.threadIsActive) {
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
    if (!this.threadIsActive) {
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
    const noiseForce = this.threadIsActive
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
        repulsionForcex * q.size + noiseForce,
        repulsionForcey * q.size + noiseForce
      ); // add in forces
      q.addForce(
        -repulsionForcex * p.size + noiseForce,
        -repulsionForcey * p.size + noiseForce
      ); // add in forces
    }
  }
}
