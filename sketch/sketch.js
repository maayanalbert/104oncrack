let vehicle;

const landmarks = [];

function setup() {
  createCanvas(400, 400);
  vehicle = new Vehicle(width / 2, height / 2);
  landmarks.push(new LandMark(50, 10, 70, "Stamper"));
  landmarks.push(new LandMark(270, 300, 150, "Carnegie Mellon"));
  landmarks.push(new LandMark(350, 130, 120, "Avenue"));
  textAlign(CENTER, CENTER);
}

function draw() {
  background(220);
  landmarks.forEach((landmark) => landmark.display());

  vehicle.seek(createVector(mouseX, mouseY));
  vehicle.update();
  vehicle.display();
}

class LandMark {
  constructor(x, y, size, name) {
    this.location = createVector(x, y);
    this.size = size;
    this.name = name;
  }

  display() {
    ellipse(this.location.x, this.location.y, this.size, this.size);
    text(this.name, this.location.x, this.location.y);
  }
}
