let threads = [];

const thickness = 10;

const pointDist = 300;

const startX = window.innerWidth / 2 - pointDist / 2;
const startY = window.innerHeight / 2;
const endX = window.innerWidth / 2 + pointDist / 2;
const endY = window.innerHeight / 2;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  threads.push(
    new Thread(
      startX,
      startY,
      endX,
      endY,
      thickness,
      color(255, 0, 0),
      pointDist * 0.8
    )
  );

  threads.push(
    new Thread(
      startX,
      startY,
      endX,
      endY,
      thickness,
      color(0, 255, 0),
      pointDist * 0.8
    )
  );

  threads.push(
    new Thread(
      startX,
      startY,
      endX,
      endY,
      thickness,
      color(0, 0, 255),
      pointDist * 0.8
    )
  );
}

// use this maybe???
// https://p5js.org/reference/#/p5/bezierVertex
// blend mode https://p5js.org/reference/#/p5/blendMode -> you want ADD

function draw() {
  blendMode(BLEND);

  background(0, 0, 0, 100);
  blendMode(ADD);

  threads.forEach((thread) => thread.update());
  threads.forEach((thread) => thread.render());
}
