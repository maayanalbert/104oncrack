// based off: http://cmuems.com/2015c/more-springs/
class Particle {
  constructor(x, y, size, color, isFixed) {
    this.px = x;
    this.py = y;
    this.vx = 0;
    this.vy = 0;
    this.damping = 0.96;
    this.size = size;
    this.color = color;
    this.isFixed = isFixed;
  }

  // Add a force in. One step of Euler integration.
  addForce(fx, fy) {
    const ax = fx / (this.size * 0.1);
    const ay = fy / (this.size * 0.1);
    this.vx += ax;
    this.vy += ay;
  }

  // Update the position. Another step of Euler integration.
  update(gravityOn, boundariesOn) {
    const heightBorder = height - this.size / 2;
    if (gravityOn && this.py + 1 < heightBorder) {
      this.addForce(0, GRAVITY); // gravity!
    }
    this.vx *= this.damping;
    this.vy *= this.damping;

    this.limitVelocities();
    this.handleBoundaries(boundariesOn);
    this.setPx(this.px + this.vx);
    this.setPy(this.py + this.vy);
  }

  limitVelocities = function () {
    if (this.bLimitVelocities) {
      const speed = sqrt(this.vx * this.vx + this.vy * this.vy);
      const maxSpeed = 10;
      if (speed > maxSpeed) {
        this.vx *= maxSpeed / speed;
        this.vy *= maxSpeed / speed;
      }
    }
  };

  setPx(px) {
    if (!this.isFixed) this.px = px;
  }

  setPy(py) {
    if (!this.isFixed) this.py = py;
  }

  handleBoundaries(boundariesOn) {
    const zeroBorder = 0 + this.size / 2;
    const widthBorder = width - this.size / 2;
    const heightBorder = height - this.size / 2;
    const boundaryDamping = Math.pow(this.damping, 10);
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
  }

  render() {
    strokeWeight(0);
    fill(this.color);
    ellipse(this.px, this.py, this.size, this.size);
  }
}
