let threads = [];

const thickness = 10;

const pointDist = 300;

const startX = window.innerWidth / 2 - pointDist / 2;
const startY = window.innerHeight / 2 + 75;
const endX = window.innerWidth / 2 + pointDist / 2;
const endY = window.innerHeight / 2 + 75;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  threads.push(
    new SpringSystem(
      startX,
      startY,
      endX,
      endY,
      thickness,
      color(255, 0, 0),
      pointDist * 1.2
    )
  );

  threads.push(
    new SpringSystem(
      startX,
      startY,
      endX,
      endY,
      thickness,
      color(0, 255, 0),
      pointDist * 1.2
    )
  );

  threads.push(
    new SpringSystem(
      startX,
      startY,
      endX,
      endY,
      thickness,
      color(0, 0, 255),
      pointDist * 1.2
    )
  );
}

function draw() {
  blendMode(BLEND);

  background(0, 0, 0, 100);

  strokeWeight(0);
  fill(255);
  ellipse(startX, startY - 200, 100, 150);
  ellipse(endX, startY - 200, 100, 150);

  blendMode(ADD);

  threads.forEach((thread) => thread.update());
  threads.forEach((thread) => thread.render());
}
