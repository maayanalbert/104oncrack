let springSystems = [];
const sideLen = 50

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  
  const springSystem = new SpringSystem(true)
  const square1 = addRect(springSystem, sideLen, sideLen)
  const square2 = addRect(springSystem, sideLen, sideLen, {topLeft: square1.bottomLeft, topRight: square1.bottomRight})
  const square3 = addRect(springSystem, sideLen, sideLen, {topLeft: square2.bottomLeft, topRight: square2.bottomRight})
  const square4 = addRect(springSystem,sideLen, sideLen, {topLeft: square3.bottomLeft, topRight: square3.bottomRight})

  addRect(springSystem, sideLen, sideLen * 4, {topLeft: square1.topLeft, bottomLeft: square4.bottomLeft,
    topRight:square1.topRight, bottomRight: square4.bottomRight })

  springSystems.push(springSystem)
}

function addRect(springSystem, horizSideLen, vertSideLen, corners){

  const topLeft = corners?.topLeft ?? springSystem.makeParticle()
  const topRight = corners?.topRight ?? springSystem.makeParticle()
  const bottomLeft = corners?.bottomLeft ?? springSystem.makeParticle()
  const bottomRight = corners?.bottomRight ?? springSystem.makeParticle()

  springSystem.connectParticles(topLeft, topRight, horizSideLen)
  springSystem.connectParticles(bottomLeft, bottomRight, horizSideLen)
  springSystem.connectParticles(topLeft, bottomLeft, vertSideLen)
  springSystem.connectParticles(topRight, bottomRight, vertSideLen)

  const diagLen = getHypotenuseOfRightTriangle(horizSideLen, vertSideLen)
  springSystem.connectParticles(topRight, bottomLeft, diagLen)
  springSystem.connectParticles(bottomRight, topLeft, diagLen)

  return {topLeft, topRight, bottomLeft, bottomRight}
}

function draw() {

  background(0, 0, 0);

  springSystems.map((springSystem) => springSystem.update());
  springSystems.map((springSystem) => springSystem.render());
}
