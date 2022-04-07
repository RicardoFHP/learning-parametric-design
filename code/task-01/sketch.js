function preload(){
  // preload assets
}

function setup() {
  createCanvas(400,400);
}

function draw(){
  background('rgba(150,200,250,0.55)');

  noStroke();
// background gen uebung 2
background(20,20,30);
fill(100,60,255);

for (let x = 40; x < 400; x +=30) {
  for (let y = 0; y < 400; y += 30) {
    const size = random(5,10);
    circle(x, y, size);
  }
  frameRate(15);


}

// Hintergrund 1/2
  fill('#FFCB4C');
  arc(
    200, 200,
    300, 300,
    Math.PI / 180 * -90,
    Math.PI / 180 * 90,
    
    OPEN
  );

// Hintergrund 2/2

  fill('#FFCB4C');
  arc(
    200, 200,
    300, 300,
    Math.PI / 180 * 90,
    Math.PI / 180 * 270,
    CHORD
  );

    // Stroke (wie kann dieser auf nur einen arc bezogen werden?)
    stroke('#3f2a14');
    strokeWeight(3);

//Mund
  fill('#FFFEF7');
  arc(
    200, 200,
    200, 200,
    Math.PI / 280 * 10,
    Math.PI / 280 * 270,
    CHORD
  );

  
//Auge Links
  fill('#654321');
  arc(
    150, 150,
    50, 50,
    Math.PI / 280 * 270,
    Math.PI / 280 * 10,
    CHORD
  );

  //Auge rechts
  fill('#654321');
  arc(
    250, 150,
    50, 50,
    Math.PI / 280 * 270,
    Math.PI / 280 * 10,
    CHORD
  );

  
  //noLoop();
}

/*
      ___                                 _    _
     / __| ___  _ __  _  _  _ _ (_) __ _ | |_ | |_
    | (__ / _ \| '_ \| || || '_|| |/ _` || ' \|  _|
     \___|\___/| .__/ \_, ||_|  |_|\__, ||_||_|\__|
               |_|   _|__/_    ___ |___/ FHP?
          */