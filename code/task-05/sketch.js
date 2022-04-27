function preload(){
  // preload assets
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(#eb91ac');
    
  
  
  // Stroke (wie kann dieser auf nur einen arc bezogen werden?)
    stroke('#3f2a14');
    strokeWeight(3);

//Mund
  fill('#0');
  arc(
    200, 220,
    30, 30,
    Math.PI / 280 * 10,
    Math.PI / 280 * 270,
    OPEN
  );

//Auge Links
fill('black');
strokeWeight(0);
circle(189, 205, 6);


  //Auge rechts
  fill('black');
  circle(210, 205, 6);

  textSize(12);
fill(0, 102, 153, 51);
text('La vie est belle', 10, 90);
  


}

