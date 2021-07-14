const cornerGuide = ["upperLeft", "upperRight", "lowerRight", "lowerLeft"];

// based off: http://cmuems.com/2015c/more-springs/
class SpringSystem {
  constructor(sideLen, c) {
    angleMode(DEGREES);
    this.colors = [color(255, 59, 147), color(0, 100, 255)];

    this.colorInd = 0;
    this.updateColor();
    this.thickness = 5;
    this.particles = [];
    this.connections = {};
    this.grabbedParticle = -1;
    this.springSystemIsActive = false;
    this.mouseClickOn = false;
    this.rects = [];
    this.sideLen = sideLen;
    this.isGrowing = true;
    while (this.rects.length < MAX_RECTS) {
      this.addRect();
    }
  }

  updateColor() {
    this.color = this.colors[this.colorInd];
    this.lightColor = color(this.color.toString());
    this.lightColor.setAlpha(100);
    this.colorInd = (this.colorInd + 1) % this.colors.length;
  }

  removeMostRecentRect() {
    this.removeMostRecentParticle();
    this.removeMostRecentParticle();
    this.rects.pop();
  }

  removeMostRecentParticle() {
    this.particles.pop();
    const pk = this.particles.length;
    for (const connectionKey of Object.keys(this.connections)) {
      const pks = connectionKey.split("_");
      if (pk.toString() === pks[0] || pk.toString() === pks[1]) {
        delete this.connections[connectionKey];
      }
    }
  }

  addRect() {
    const startX = random(width / 5, (4 * width) / 5);
    const startY = random(height / 5, (4 * height) / 5);
    const startingCornersInd = this.rects.length - 1;
    const startingCorners =
      startingCornersInd >= 0
        ? {
            upperLeft: this.rects[startingCornersInd].upperRight,
            lowerLeft: this.rects[startingCornersInd].lowerRight,
          }
        : undefined;
    const corners = this.makeRectangle(
      this.sideLen,
      startX,
      startY,
      startingCorners
    );
    this.rects.push(corners);

    const rectNum = this.rects.length - 1;
    if (rectNum >= 2) {
      this.connectParticles(
        this.rects[rectNum - 2].upperRight,
        this.rects[rectNum].upperRight,
        this.sideLen * 2,
        0,
        this.color
      );

      this.connectParticles(
        this.rects[rectNum - 2].lowerRight,
        this.rects[rectNum].lowerRight,
        this.sideLen * 2,
        0,
        this.color
      );
    } else if (rectNum === 1) {
      this.connectParticles(
        this.rects[rectNum - 1].upperLeft,
        this.rects[rectNum].upperRight,
        this.sideLen * 2,
        0,
        this.color
      );

      this.connectParticles(
        this.rects[rectNum - 1].lowerLeft,
        this.rects[rectNum].lowerRight,
        this.sideLen * 2,
        0,
        this.color
      );
    }
  }

  makeRectangle(sideLen, startX, startY, corners) {
    const numSides = 4;
    const newCorners = Object.assign({}, corners);
    for (let i = 0; i < numSides; i++) {
      const cornerName = cornerGuide[i];
      if (!corners || !corners[cornerName]) {
        const particleId = this.makeParticle(
          startX + random(-10, 10),
          startY + random(-10, 10),
          5,
          this.color,
          false
        );
        newCorners[cornerName] = particleId;
      }
    }

    for (let i = 0; i < numSides; i++) {
      this.connectParticles(
        this.getCornerFromIndex(newCorners, i),
        this.getCornerFromIndex(newCorners, (i + 1) % numSides),
        sideLen,
        this.thickness,
        this.color
      );
    }

    const innerConnectionLen = this.getLengthOfInnerConnection(
      sideLen,
      numSides
    );

    for (let i = 0; i < numSides; i += 2) {
      this.connectParticles(
        this.getCornerFromIndex(newCorners, i),
        this.getCornerFromIndex(newCorners, (i + 2) % numSides),
        innerConnectionLen,
        0,
        this.lightColor
      );
    }

    return newCorners;
  }

  getCornerFromIndex(newCorners, i) {
    const cornerName = cornerGuide[i];
    return newCorners[cornerName];
  }

  getLengthOfInnerConnection(sideLen, numSides) {
    const numDegrees = (numSides - 2) * 180;
    const degreesPerAngle = numDegrees / numSides;
    const innerAngleDegrees = (180 - degreesPerAngle) / 2;
    return (sideLen * sin(degreesPerAngle)) / sin(innerAngleDegrees);
  }

  update() {
    this.updateParticles(false, true);
  }

  render() {
    noStroke();

    for (let rect of this.rects) {
      fill(this.lightColor);

      beginShape();

      const first = this.particles[this.getCornerFromIndex(rect, 0)];
      const last = this.particles[this.getCornerFromIndex(rect, 3)];
      const midX = (first.px + last.px) / 2;
      const midY = (first.py + last.py) / 2;

      vertex(midX, midY);

      for (let i = 0; i < 4; i += 2) {
        const cur = this.particles[this.getCornerFromIndex(rect, i)];
        const next = this.particles[this.getCornerFromIndex(rect, (i + 1) % 4)];
        const nextNext =
          this.particles[this.getCornerFromIndex(rect, (i + 2) % 4)];
        const nextMidX = (next.px + nextNext.px) / 2;
        const nextMidY = (next.py + nextNext.py) / 2;
        bezierVertex(cur.px, cur.py, next.px, next.py, nextMidX, nextMidY);
      }
      endShape();
      fill(this.lightColor);

      const leftMidX =
        (this.particles[rect.upperLeft].px +
          this.particles[rect.lowerLeft].px) /
        2;

      const leftMidY =
        (this.particles[rect.upperLeft].py +
          this.particles[rect.lowerLeft].py) /
        2;

      const rightMidX =
        (this.particles[rect.upperRight].px +
          this.particles[rect.lowerRight].px) /
        2;
      const rightMidY =
        (this.particles[rect.upperRight].py +
          this.particles[rect.lowerRight].py) /
        2;

      beginShape();
      vertex(
        this.particles[rect.upperLeft].px,
        this.particles[rect.upperLeft].py
      );
      vertex(leftMidX, leftMidY);
      bezierVertex(
        this.particles[rect.upperLeft].px,
        this.particles[rect.upperLeft].py,
        this.particles[rect.upperRight].px,
        this.particles[rect.upperRight].py,
        rightMidX,
        rightMidY
      );
      vertex(
        this.particles[rect.upperRight].px,
        this.particles[rect.upperRight].py
      );

      endShape();

      beginShape();
      vertex(
        this.particles[rect.lowerLeft].px,
        this.particles[rect.lowerLeft].py
      );
      vertex(leftMidX, leftMidY);
      bezierVertex(
        this.particles[rect.lowerLeft].px,
        this.particles[rect.lowerLeft].py,
        this.particles[rect.lowerRight].px,
        this.particles[rect.lowerRight].py,
        rightMidX,
        rightMidY
      );
      vertex(
        this.particles[rect.lowerRight].px,
        this.particles[rect.lowerRight].py
      );
      endShape();
    }
    this.drawParticles();
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
      this.addMutualRepulsion(i);

      this.particles[i].update(gravityOn, boundariesOn); // update all locations
    }

    const oldSpringSystemIsActive = this.springSystemIsActive;
    this.springSystemIsActive = this.mouseClickOn
      ? mouseIsPressed
      : this.getNewSpringSystemIsActive();

    if (oldSpringSystemIsActive && !this.springSystemIsActive) {
      this.updateColor();
      if (this.isGrowing) {
        this.addRect();
      } else {
        this.removeMostRecentRect();
      }
    }

    if (this.rects.length === MAX_RECTS) {
      this.isGrowing = false;
    }

    if (this.rects.length === MIN_RECTS) {
      this.isGrowing = true;
    }

    this.handleMouseMove();

    Object.values(this.connections).forEach((connection) => {
      connection.update();
    });
  }

  drawParticles() {
    stroke(this.color);
    fill(this.color);
    Object.values(this.connections).forEach(function (connection) {
      connection.render();
    });

    for (var i = 0; i < this.particles.length; i++) {
      this.particles[i].render(); // render all particles
    }
  }

  getNewSpringSystemIsActive() {
    if (isMobile()) {
      return mouseIsPressed;
    }

    if (this.springSystemIsActive) {
      if (
        this.grabbedParticle < 0 &&
        this.grabbedParticle >= this.particles.length
      )
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

      p.addForce(repulsionForcex * q.size, repulsionForcey * q.size); // add in forces
      q.addForce(-repulsionForcex * p.size, -repulsionForcey * p.size); // add in forces
    }
  }
}
