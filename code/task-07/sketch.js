function preload() {
  // preload assets
}

const sketchWidth = 400;
const sketchHeight = 450;

function setup() {
  createCanvas(sketchWidth, sketchHeight);
}



function draw() {
  stroke(80);
  strokeWeight:(3);
  //fill(0);
  // noFill();
  
  beginShape();

  vertex(0, 0);
  vertex(40, 0);
  
  for (let y = 1; y < 6; y += 1.5) {
    const x = noise(5);
    const cX = noise(5);
    let direct = 91;
    if (y%2===0) {
      direct = 1;
      
    }

    curveVertex(100 + cX * direct, 400 / 5 * y - (400 / 5 * 0.5), 200 + x * direct * -1, 400 / 5 * y)
  }

  vertex(0, 400);
  vertex(0, 400);
  11
  endShape(CLOSE);
}