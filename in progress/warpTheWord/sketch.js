var timeKeeper = 0;
var wanderers = [];
let noiseScale = 1000;//bigger the scale the larger the over all curves 
let noiseStrength = 20; //bigger the strength the more divergent the lines are from each other
let noiseOffset = 0; //random new number to allow for different perlin noise areas in one sketch

let klimFont;

let canGenerate = false;

let img; 

let userText = "";
let userTextSet = false;
var textHeight = 40;
var charactersPerLine = 9;

var crawlx = 0;
var crawly = 0;

function preload(){
  // Originally started upon request from Jason during a Klim Type commission, not used then. Continued adapting in post
  // klimFont  = loadFont('Geograph-Bold.otf');
  // img = loadImage('geograph.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  textHeight = height/3;
  charactersPerLine = floor(width/(textHeight*0.5));

  if (timeKeeper < 1){
    var wantTransparent = true;
    //textFont(klimFont);
    textSize(height/3.3);
    fill(0,20);
    stroke(255);
    textAlign(CENTER, CENTER);
    text("GEO", width/2, height/3);
    text("GRAPH", width/2, 2*height/3);
    for(let y = height/5; y <height; y+=10){
      for(let x = 0; x < width; x +=1){
        var rgba = get(x, y);
        if(rgba[0] > 0){
          let something = new Wanderer(x, y);
          wanderers.push(something);
        }
      }
    }
  }
  background(0);
}

function draw() {
  timeKeeper +=1;
  
  //usual background black is less opaque to allow for light trails
  background(0,10);

  //but if user is in the middle of typing we don't need trails, so bg is more opaque
  if(userText.length > 0 && !userTextSet){
    background(0,70);
    formatAndDisplayText(false);
  }


  for(let i = 0; i < wanderers.length; i++){
    wanderers[i].move();
    wanderers[i].display();
  }
}

function formatAndDisplayText(fillYes){
  push();
  // fill(255);
  if(fillYes){
    fill(255,30);
  }
  textAlign(CENTER, CENTER);
  textSize(textHeight);
  text(userText, width/2, height/2);
  pop();
}
function regenerateDefault(){
  //just resets all the current particles to where they were birthed
  timeKeeper %= timeKeeper;
  noiseOffset = random(0,100);
  for(let i = 0; i < wanderers.length; i++){
    let something = new Wanderer(wanderers[i].originX, wanderers[i].originY);
    wanderers[i] = something;
  }
}

function regenerateNew(){

  timeKeeper = 0; //resetting that timekeeper is important for consistent speed curves
  noiseOffset = random(0,100);

  push();
  background(0);
  
  textSize(height/3);
  fill(255,30);
  noStroke();
  textAlign(CENTER, CENTER);
  text(userText, width/2, height/2);
  pop();
  
  wanderers = [];//empty the array

  //scrape the screen for the nonblack letter space (where the particles should be birthed)
  for(let y = height/5; y <height; y+=7){
    for(let x = 0; x < width; x += 7){
      var rgba = get(x, y);
      if(rgba[0] > 20){
        let something = new Wanderer(x, y);
        wanderers.push(something);
      }
    }
  }
  //gotta empty the user text so can start fresh
  userText = "";
}
function mousePressed(){
  regenerateDefault();
}
function mouseMoved(){
  if(canGenerate){
      let something = new Wanderer(mouseX, mouseY);
  // noiseScale = map(mouseX, 0,400, 20,500);
  // noiseStrength = map(mouseY, 0, 400,20,100);
    wanderers.push(something);
  }
}

function keyPressed(){

  //if you press ENTER
  if (keyCode == 13){
    if (userTextSet){//if you already gave text input
      regenerateDefault();
    }else{//if it;s new text input
      regenerateNew();
    }
    userTextSet = true;//either way, you've just 'committed'
  
  //now if you were to delete...
  }else if (keyCode == 8){
    //console.log("userText: " + userText.length)
    if(userText.length > 0){
      userTextSet = false;
      userText = userText.substring(0, userText.length-1);
    }else{//if you try to delete after entering, it just destroys particles
      var howMany = wanderers.length / 1.5;
      decayParticles(howMany);
    }
  }else{
    userTextSet = false;
    userText = userText + key;
    //add line breaks
    if(onlyCharacterLength(userText) % charactersPerLine == 0){
      userText = userText.concat("\n");
    }
  }
}

function onlyCharacterLength(toAnalyze){
  var howMany = 0;
  var i = 0;
  while(i < toAnalyze.length){
    var currentString = toAnalyze.charAt(i);
    if(currentString == "\n"){
      howMany += 0;
    }else{
      howMany += 1;
    }
    i += 1;
  }
  return howMany;
}
function decayParticles(howMany){
  var destroyed = 0;
  var range = wanderers.length;
  while (destroyed < howMany){
    var randomVictim = floor(random(0,range-1));
    wanderers.splice(randomVictim, 1);
    destroyed +=1;
  }
}
class Wanderer{
  constructor(x, y){
    this.originX = x;
    this.originY = y;
    this.prevX = this.originX;
    this.prevY = this.originY;
    this.currentX = this.originX;
    this.currentY = this.originY;
    this.angle = 0;
    
    this.stepSize = 1;
  }
  move(){
    this.angle = noise(this.currentX / noiseScale + noiseOffset, this.currentY / noiseScale)* noiseStrength;
    this.prevX = this.currentX;
    this.prevY = this.currentY;
    
    this.currentX += cos(this.angle) * this.stepSize;
    this.currentY += sin(this.angle) * this.stepSize;
    // this.stepSize = log(timeKeeper)/2;
    this.stepSize = pow(timeKeeper/100, 3);
    
  }
  display(){
    push();
    // let sColor = map(this.angle, 0, 3, 255, 0);
    // let sColor = constrain(255-(timeKeeper*timeKeeper)/10, 20, 255);
    let sColor = (1000/(timeKeeper+1)) * 20;
    stroke(sColor, sColor);
    strokeWeight(1);
    line(this.prevX, this.prevY, this.currentX, this.currentY);
    pop();
  }
}