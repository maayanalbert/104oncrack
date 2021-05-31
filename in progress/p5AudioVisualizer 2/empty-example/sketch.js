var mic; //microphone
// var music; // variable for music
var fft; // fast foray
var amp; // amplitude
var amplitude = 1;

var numRings = 100;

var maxWidth = 0.8;
var maxHeight = 0.8;

var ringWidth;//inverse mapping of rotation to how big the max width at the current rotation is
var rotationTo90;//mapping mouse to how much offset each layer centerx needs

var ringHeight;//inverse mapping of rotation to how big the max width at the current rotation is
var verticalRotationTo90;//mapping mouse to how much offset each layer centerx needs

function setup(){
	createCanvas(windowWidth, windowHeight);
	if(maxHeight*height < maxWidth*width){
		maxWidth = (maxHeight*height)/width;
	}else{
		maxHeight = (maxWidth*width)/height;
	}
	ringWidth = maxWidth;
	mic = new p5.AudioIn()
	mic.start();

	fft = new p5.FFT();

	amp = new p5.Amplitude();
	amp.setInput(mic);

}
function draw(){
	background(0,99);
	//soundstuff
	amplitude = amp.getLevel()*2;

	if (mouseIsPressed){
		rotationTo90 = 0.1;
	}else{
		rotationTo90 = map(mouseX-width/2, -width/2, width/2, -1,1);
	}
  ringWidth = map(abs(mouseX-width/2), 0, width/2, maxWidth, 0)*width;

  verticalRotationTo90 = map(mouseY-height/2, -height/2, height/2, -1,1);
  ringHeight = map(abs(mouseY-height/2), 0, width/2, maxHeight, 0.1)*height;

  //blackHoleBG(ringWidth, ringHeight);
  sphereRings();
  //coneRings();

}
function mousePressed(){
	
}
function blackHoleBG(ww, hh){
	background(255, 99);
	push();
	fill(0);
	ellipse(width/2, height/2, ww, hh);
	pop();
}
function perlinRipple(i){//how much each circle is offset by sound is also dependent on the rotation...100% off set when rotated to side

	var offset = (1000*log(log(i)))*map(noise((frameCount+i)/220), 0,1,-1,1);
	return offset;
	//return 0;

}
function volumeRipple(i){
	var offset = (amplitude*1000*log(log(i)))*map(noise((frameCount+i)/220), 0,1,-1,1);
	return offset; // analyze music spectrum
}
function sphereRings(){
	for(var i =0; i<numRings; i++){
		stroke(255);
		strokeWeight(1);
		noFill();
		var relativePos = (numRings-i)/numRings;
		var ringW = relativePos*ringWidth;
		var ringH = relativePos*maxHeight*height;

		var adjacent = maxWidth*width/2*cos(asin(abs((ringH/2)/(maxWidth*width/2))));

		// var centerX = width/2 + rotationTo90*(adjacent+perlinRipple(i));
		var centerX = width/2 + rotationTo90*(adjacent+volumeRipple(i));
		var centerY = height/2;

		ellipse(centerX, centerY, ringW, ringH);
	}
}
function ellipticRings(){
	var spectrum = fft.analyze(); // analyze music spectrum
	for(var i =0; i<numRings; i++){
		stroke(0);
		strokeWeight(1);
		noFill();
		var relativePos = (numRings-i)/numRings;
		var ringW = relativePos*maxWidth*width;
		var ringH = relativePos*maxHeight*height;

		var adjacent = maxWidth*width/2*cos(asin(abs((ringH/2)/(maxWidth*width/2))));

		var centerX = width/2 + rotationTo90*(adjacent+rippleAmount);
		var centerY = height/2;

		ellipse(centerX, centerY, ringW, ringH);
	}
}
function coneRings(){
	var zheight = mouseX-width/2;
	var spectrum = fft.analyze(); // analyze music spectrum
	for(var i =0; i<numRings; i++){
		stroke(255);
		strokeWeight(1);
		noFill();
		var relativePos = (numRings-i)/numRings;
		var ringW = relativePos*ringWidth;
		var ringH = relativePos*maxHeight*height;
		var centerX = width/2 + i/numRings*zheight;
		var centerY = height/2 + i/numRings*verticalRotationTo90*0.1*height;
		ellipse(centerX, centerY, ringW, ringH);
	}
}
function invertConeRings(){
	var zheight = mouseX-width/2;
  	ringWidth = map(abs(mouseX-width/2), 0, width/2, maxWidth*width, 0);
	var spectrum = fft.analyze(); // analyze music spectrum
	for(var i =0; i<numRings; i++){
		stroke(255);
		strokeWeight(1);
		noFill();
		var relativePos = (numRings-i)/numRings;
		var ringW = relativePos*ringWidth;
		var ringH = relativePos*maxHeight*height;

		var adjacent = zheight*cos(asin(ringH/zheight));

		var centerX = width/2 + relativePos*adjacent;
		var centerY = height/2;
		ellipse(centerX, centerY, ringW, ringH);
	}
}