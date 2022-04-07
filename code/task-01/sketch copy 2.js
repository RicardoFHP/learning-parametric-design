function preload(){
  // preload assets
}

function setup() {
  createCanvas(400, 400);
}

let offset = 0;

function draw() {
  background(20,20,20);
  fill(100,60,255);

  for (let x = 40; x < 400; x +=30) {
    for (let y = 0; y < 400; y += 30) {
      const size = random(5,10);
      circle(x, y, size);
    }
  }
  frameRate(1);

  
  //noLoop();
}
