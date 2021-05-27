/*  Based of Generative Design's M_1_2_01:
    http://www.generative-gestaltung.de/2/sketches/?02_M/M_1_2_01
*/

var actRandomSeed = 0;
var count = 300;
var faderX = 0;
var backgroundFade = 40;
var lastFaderX;
var speed;
var angleUnit = 360 / count;

function setup() {
  // nothing much to see here
  createCanvas(300, 300); // this won't alter the window size
  background(backgroundFade);
  noStroke();
}

function basicDot(x = mouseX, y = mouseY) {
  fill(255);
  ellipse(x, y, 10, 10);
}

function speedColorDot(x, y) {
  if (!speed) {
    speed = random(0, 0.01);
  }

  // set the opacity and color based on the speed the dots are moving
  var opacity = max(100, speed * 100 * 255);
  var colorOff = speed * 100;
  fill(150 - colorOff * 40, 100 + colorOff * 80, 255, opacity);
  ellipse(x, y, 5, 5);
}

function getPosition(angle) {
  if (angle === 0) {
    lastFaderX = faderX;
    faderX = faderX * 0.97 + (0.03 * mouseX) / width;
    speed = abs(faderX - lastFaderX);
    randomSeed(actRandomSeed);
  }
  var randomX = random(0, width);
  var randomY = random(0, height);
  var circleX = width / 2 + cos(angle) * 100;
  var circleY = height / 2 + sin(angle) * 100;
  var x = lerp(randomX, circleX, faderX);
  var y = lerp(randomY, circleY, faderX);

  return { x: x, y: y };
}

function sizeDot(x, y) {
  // generate a random size
  noStroke();
  var size = random(0, 10);

  // use it to draw the dot
  fill(86, 186, 255, size * 0.1 * 255);
  ellipse(x, y, size, size);
}

function draw() {
  background(0);

  for (var i = 0; i < count; i++) {
    var angle = (i * 360) / count;
    pos = getPosition(angle);

    // mix and match dot functions here!
    sizeDot(pos.x, pos.y);
    speedColorDot(pos.x, pos.y);
  }
}
