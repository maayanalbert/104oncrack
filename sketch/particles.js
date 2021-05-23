//========================================================== particle system

var particles = [];
var connections = {};
// The index in the particle array, of the one the user has clicked.
var grabbedParticle = -1;
var stringIsActive = false;

function connectParticles(pk, qk, distance, lineWeight, lineColor) {
  if (pk < 0 || pk >= particles.length || qk < 0 || qk >= particles.length) {
    console.error(
      "You just tried to create a connection with a particle that doesn't exist. Make sure that every time you're calling 'connectParticles()' it is with two valid particle ids."
    );
    return;
  }
  var id1 = pk.toString() + "_" + qk.toString();
  var id2 = qk.toString() + "_" + pk.toString();
  if (id1 in connections || id2 in connections) {
    return;
  }
  var connection = new Connection(pk, qk, distance, lineWeight, lineColor);
  connections[id1] = connection;
}

function makeParticle(x, y, size, fillColor, isFixed) {
  var particle = new Particle(x, y, size, fillColor, isFixed);
  particles.push(particle);
  return particles.length - 1;
}

function getDistance(x1, x2, y1, y2) {
  return sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

function updateParticles(gravityOn, boundariesOn = true) {
  for (var i = 0; i < particles.length; i++) {
    addMutualRepulsion(i);

    particles[i].update(gravityOn, boundariesOn); // update all locations
  }

  updateStringIsActive();
  handleStringActive();

  Object.values(connections).forEach(function (connection) {
    connection.update();
  });
}

function drawParticles() {
  Object.values(connections).forEach(function (connection) {
    connection.render();
  });

  for (var i = 0; i < particles.length; i++) {
    particles[i].render(); // render all particles
  }
}

function updateStringIsActive() {
  if (particles.length !== 4) throw new Error();

  if (stringIsActive) {
    if (grabbedParticle < 0 && grabbedParticle >= particles.length)
      throw new Error();
    const grabbedParticleObj = particles[grabbedParticle];
    const distToMouse = getDistance(
      grabbedParticleObj.px,
      mouseX,
      grabbedParticleObj.py,
      mouseY
    );
    stringIsActive = distToMouse < 150;
  } else {
    let isClose = false;
    for (let i = 1; i < particles.length; i++) {
      const [x1, y1] = [particles[i - 1].px, particles[i - 1].py];
      const [x2, y2] = [particles[i].px, particles[i].py];

      if (existsInLine(x1, y1, x2, y2, mouseX, mouseY)) {
        isClose = true;
      }
    }

    stringIsActive = isClose;
  }
}

function existsInLine(x1, y1, x2, y2, xMid, yMid) {
  const distDiff = Math.abs(
    getDistance(x1, xMid, y1, yMid) +
      getDistance(x2, xMid, y2, yMid) -
      getDistance(x1, x2, y1, y2)
  );
  return distDiff < 20;
}

function handleStringActive() {
  if (!stringIsActive) {
    grabbedParticle = -1;
    return;
  }
  // If the mouse is pressed,
  // find the closest particle, and store its index.
  var grabbedParticleHolder = -1;
  var maxDist = 9999;
  for (var i = 0; i < particles.length; i++) {
    var dx = mouseX - particles[i].px;
    var dy = mouseY - particles[i].py;
    var dh = sqrt(dx * dx + dy * dy);
    if (dh < maxDist && particles[i].isFixed == false) {
      maxDist = dh;
      grabbedParticleHolder = i;
    }
  }

  if (grabbedParticle < 0) {
    grabbedParticle = grabbedParticleHolder;
  }

  if (grabbedParticle > -1) {
    // If the user is grabbing a particle, peg it to the mouse.
    particles[grabbedParticle].setPx(mouseX);
    particles[grabbedParticle].setPy(mouseY);
  }
}

function addMutualRepulsion(i) {
  var p = particles[i];
  var px = p.px;
  var py = p.py;

  for (var j = 0; j < i; j++) {
    var q = particles[j];
    var qx = q.px;
    var qy = q.py;

    var dx = px - qx;
    var dy = py - qy;
    var dh = sqrt(dx * dx + dy * dy);
    dh = Math.max(dh, 1);
    var componentInX = dx / dh;
    var componentInY = dy / dh;
    var proportionToDistanceSquared = 1.0 / (dh * dh);

    var repulsionForcex = componentInX * proportionToDistanceSquared;
    var repulsionForcey = componentInY * proportionToDistanceSquared;

    p.addForce(repulsionForcex * q.size, repulsionForcey * q.size); // add in forces
    q.addForce(-repulsionForcex * p.size, -repulsionForcey * p.size); // add in forces
  }
}

//========================================================== connection
var Connection = function Connection(pk, qk, distance, lineWeight, lineColor) {
  this.distance = distance;
  this.pk = pk;
  this.qk = qk;
  this.lineWeight = lineWeight;
  this.lineColor = lineColor;
  this.render = function () {
    var p = particles[this.pk];
    var q = particles[this.qk];
    stroke(this.lineColor);
    strokeWeight(this.lineWeight);
    line(p.px, p.py, q.px, q.py);
  };
  this.update = function () {
    var p = particles[this.pk];
    var q = particles[this.qk];
    var dx = p.px - q.px;
    var dy = p.py - q.py;

    var dh = sqrt(dx * dx + dy * dy);
    if (dh > 1) {
      var distention = dh - this.distance;
      var restorativeForce = 0.05 * distention; // F = -kx
      var fx = (dx / dh) * restorativeForce;
      var fy = (dy / dh) * restorativeForce;
      p.addForce(-fx, -fy);
      q.addForce(fx, fy);
    }
  };
};

//========================================================== particle
var Particle = function Particle(x, y, size, color, isFixed) {
  this.px = x;
  this.py = y;
  this.vx = 0;
  this.vy = 0;
  this.damping = 0.96;
  this.size = size;
  this.color = color;
  this.isFixed = isFixed;

  if (status === "basePoint") {
    this.isEdgePoint = false;
  } else {
    this.isEdgePoint = true;
  }

  // Add a force in. One step of Euler integration.
  this.addForce = function (fx, fy) {
    var ax = fx / (this.size * 0.1);
    var ay = fy / (this.size * 0.1);
    this.vx += ax;
    this.vy += ay;
  };

  // Update the position. Another step of Euler integration.
  this.update = function (gravityOn, boundariesOn) {
    var heightBorder = height - this.size / 2;
    if (gravityOn && this.py + 1 < heightBorder) {
      this.addForce(0, 0.1); // gravity!
    }
    this.vx *= this.damping;
    this.vy *= this.damping;

    this.limitVelocities();
    this.handleBoundaries(boundariesOn);
    this.setPx(this.px + this.vx);
    this.setPy(this.py + this.vy);
  };

  this.limitVelocities = function () {
    if (this.bLimitVelocities) {
      var speed = sqrt(this.vx * this.vx + this.vy * this.vy);
      var maxSpeed = 10;
      if (speed > maxSpeed) {
        this.vx *= maxSpeed / speed;
        this.vy *= maxSpeed / speed;
      }
    }
  };

  this.setPx = function (px) {
    if (!this.isFixed) this.px = px;
  };

  this.setPy = function (py) {
    if (!this.isFixed) this.py = py;
  };

  this.handleBoundaries = function (boundariesOn) {
    var zeroBorder = 0 + this.size / 2;
    var widthBorder = width - this.size / 2;
    var heightBorder = height - this.size / 2;
    var boundaryDamping = Math.pow(this.damping, 10);
    if (boundariesOn) {
      if (this.px >= widthBorder) {
        this.vx = abs(this.vx) * -1 * boundaryDamping;
        this.setPx(widthBorder);
      }
      if (this.px <= zeroBorder) {
        this.vx = abs(this.vx) * boundaryDamping;
        this.setPx(zeroBorder);
      }
      if (this.py >= heightBorder) {
        this.vy = abs(this.vy) * -1 * boundaryDamping;
        this.setPy(heightBorder);
      }
      if (this.py <= zeroBorder) {
        this.vy = abs(this.vy) * boundaryDamping;
        this.setPy(zeroBorder);
      }
    } else {
      if (this.px >= width) {
        this.setPx(this.px - width);
      }
      if (this.px <= 0) {
        this.setPx(width - this.px);
      }
      if (this.py >= height) {
        this.setPy(this.py - height);
      }
      if (this.py <= 0) {
        this.setPy(height - this.py);
      }
    }
  };

  this.render = function () {
    strokeWeight(0);
    fill(this.color);
    ellipse(this.px, this.py, this.size, this.size);
  };
};
