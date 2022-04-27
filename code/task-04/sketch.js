function preload(){
  // preload assets
}

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
}

const size = 40;
const padding = 5;

function draw() {
  background(255);
  frameRate(10);
  noStroke();
  fill(40);

  for (let x = 0; x < 400; x += (size + 1 * padding)) {
    for (let y = 0; y < 400; y += (size + 2 * padding)) {
      push();
      translate(x, y);
      strokeWeight(1);
      stroke(40);
      scale(random(0, 1));
      fill(255);
      circle(-size/2, -size/2, size, size);
      
      pop();
    }
  }

  
 // noLoop();
}


//wenn Punkte nahe am Rand
//dann nutze größere Zahl x wie mach ich das?

