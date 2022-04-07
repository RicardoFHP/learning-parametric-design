function preload(){
  // preload assets
}

function setup() {
  createCanvas(400, 400);
}

let offset = 0;

function draw() {
  background(20,20,20);
  nofill();
  stroke(0)
  strokeWeigth(1);

  rect(0, 0, 40, 20);
  stroke('red');
  strokeWeigth(20);
  point(0,0);
  point(40,0);
  point(40,20);
  point(0,20);

  beginShape();
  vertex()
}
