function preload(){
  // preload assets
}

function setup() {
  createCanvas(400, 400);
}




const size = 5;
let offset = 0;

function draw() {
  background(155);
  noStroke();

  for (let x = 0; x < 400; x += size) {
    for (let y = 0; y < 400; y += size) {
      /*
      we pick x and y as coordinates
      and move the offset on the z-axis
      */
      const colorValue = noise(
        x / 400,
        y / 150,
        offset
      );
      fill(85, 05, colorValue * 245);
      rect(x, y, size);
    }
  }



  offset += 0.02;
}



/*
function draw() {
  background(100);
}


const sketchWidth = 400;
const sketchHeight = 400;
const size = 15;

function setup() {
  createCanvas(sketchWidth, sketchHeight);
}

function draw(){
  background(225);
  noStroke();
  
  const columns = sketchWidth / size;
  const rows = sketchHeight / size;

  for (let x = 0; x < columns; x += 2) {
    for (let y = 0; y < rows; y += 2) {
      fill(random(30, 255), (10, 225), (160, 225));
      rect(x * size, y * size, size, size);
        frameRate(10);
    }
  }
}
*/
