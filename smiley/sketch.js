let threads = [];

const thickness = 8;

const pointDist = 250;
let startX;
let startY;
let endX;
let endY;

function setup() {
  createCanvas(window.innerHeight, window.innerHeight);

  startX = width / 2 - pointDist / 2;
  startY = height / 2 + 75;
  endX = width / 2 + pointDist / 2;
  endY = height / 2 + 75;

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
  ellipse(startX, startY - 166, 83, 125);
  ellipse(endX, startY - 166, 83, 125);

  blendMode(ADD);

  threads.forEach((thread) => thread.update());
  threads.forEach((thread) => thread.render());
}
