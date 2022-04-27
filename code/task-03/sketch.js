function preload(){
  // preload assets
}






function setup() {
  createCanvas(400, 400);
}



const sketchHeight = 400;
const sketchWidth = 400;

function setup() {
  createCanvas(sketchWidth, sketchHeight);
}

function draw(){
  frameRate (5);
  background(255);
  beginShape();
  for(let angle = 0; angle < 360; angle += 15) {
    const radius = random(50, 45);
    const x = radius * cos(Math.PI / 180 * angle);
    const y = radius * sin(Math.PI / 180 * angle);
    curveVertex(x + sketchWidth / 2, y + sketchHeight / 2);
  }

  
  fill('rgba(255, 20, 80, 0.1)');
  noStroke();
  endShape(CLOSE);

  beginShape();
  for(let angle = 0; angle < 360; angle += 15) {
    const radius = random(60, 55);
    const x = radius * cos(Math.PI / 180 * angle);
    const y = radius * sin(Math.PI / 180 * angle);
    curveVertex(x + sketchWidth / 2, y + sketchHeight / 2);
  }

  fill('rgba(255, 20, 80, 0.1)');
  noStroke();
  endShape(CLOSE);
  
  beginShape();
  for(let angle = 0; angle < 360; angle += 15) {
    const radius = random(70, 65);
    const x = radius * cos(Math.PI / 180 * angle);
    const y = radius * sin(Math.PI / 180 * angle);
    curveVertex(x + sketchWidth / 2, y + sketchHeight / 2);
  }

  
  fill('rgba(255, 20, 80, 0.05)');
  noStroke();
  endShape(CLOSE);

}



/*
function draw(){
  background(200);


  circle(80, 30, 40);
  
  fill('rgba(255, 20, 80, 0.5)');


}*/