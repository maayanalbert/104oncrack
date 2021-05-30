let minnows = [];
let food;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  food = new Food();

  for (let i = 0; i < sqrt(NUM_MINNOWS); i++) {
    for (let j = 0; j < sqrt(NUM_MINNOWS); j++) {
      minnows.push(new Vehicle(i * 10, j * 10));
    }
  }
}

function draw() {
  background(103, 231, 215);
  minnows.forEach((vehicle) => vehicle.seek(createVector(mouseX, mouseY)));
  minnows.forEach((vehicle) => vehicle.update());
  minnows.forEach((vehicle) => vehicle.display());
  removeOverlappingFoodParticles();
  food.update();
  food.render();
}

function removeOverlappingFoodParticles() {
  for (let i = 0; i < minnows.length; i++) {
    const minnow = minnows[i];
    const index = food.findFirstOverlappingParticleIndex(
      minnow.location.x,
      minnow.location.y
    );
    if (index >= 0) {
      food.removeParticle(index);
      return;
    }
  }
}

function minnowsAreOnMouse() {
  for (let i = 0; i < minnows.length; i++) {
    const minnow = minnows[i];
    if (
      getDistance(mouseX, minnow.location.x, mouseY, minnow.location.y) <
      MINNOW_THICKNESS * 2
    ) {
      return true;
    }
  }
  return false;
}
