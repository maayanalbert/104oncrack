class Connection {
  constructor(p, q, distance, lineWeight, lineColor) {
    this.distance = distance;
    this.p = p;
    this.q = q;
    this.lineWeight = lineWeight;
    this.lineColor = lineColor;
  }

  render() {
    const p = this.p;
    const q = this.q;
    stroke(this.lineColor);
    strokeWeight(this.lineWeight);
    line(p.px, p.py, q.px, q.py);
  }

  update() {
    const p = this.p;
    const q = this.q;
    const dx = p.px - q.px;
    const dy = p.py - q.py;

    const dh = sqrt(dx * dx + dy * dy);
    if (dh > 1) {
      const distention = dh - this.distance;
      const restorativeForce = 0.01 * distention; // F = -kx
      const fx = (dx / dh) * restorativeForce;
      const fy = (dy / dh) * restorativeForce;
      p.addForce(-fx, -fy);
      q.addForce(fx, fy);
    }
  }
}
