let s1;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  t1 = new Thread(0, 0, window.innerWidth, window.innerHeight, 1, color(255));
}

// use this maybe???
// https://p5js.org/reference/#/p5/bezierVertex
// blend mode https://p5js.org/reference/#/p5/blendMode -> you want ADD

function draw() {
  background(0, 0, 0, 50);

  t1.update();
  t1.render();
}
