/*
  Inspired (typed, commented and changed. *psssst) by
    https://www.youtube.com/watch?v=RrSOv9FH6uo

  inspiration + explanation for golden ratio: 
    Numberphile - The Golden Ratio (why it is so irrational)
    https://www.youtube.com/watch?v=sj8Sg8qnjOg
*/

function setup() {
  const size = min(400);
  createCanvas(size, size);
  noStroke();

  //color
  colorMode(HSL, 1);
}


function cosn(v) { // noramlisierte cosinus funktion. 
  return sin(v * TWO_PI) * 0.5 + 0.5 //geht hoch, damit diese von oben nach unten geht und nicht wieder von unten nach oben wird innvertierte cos genutzt.
}
function invCosn(v) { //invertierte Cosinus Funktion 
  return 1 - cosn(v);
}

const spirale = 3;
const dotSize = 0.05; //größe der punkte
const radius = Math.sqrt(0.5) + dotSize; // größe der kreise + DotSize damit der Kreis von der mitte aus startet
const PHI = (1 + Math.sqrt(5)) / spirale; //phi = irationale nummer, daraus quadratwurzel aus (5)

let t;   // zeit3
const frames = 800; //frames

function draw() {

  t = fract(frameCount / frames); // fractional  wie viele Frames zum rendern, wird zum animieren benutzt
  //t = mouseX / width; per Maus steuern zum testen
  // X Y resize
  scale(width, height);
  background(0);
  fill(1);
  //polar koordinaten 

  //mehrere kreise in einem kreis angeordnet
  const count = 2000 * invCosn(t); //anzahl der einzelnen Kreise * time (animation)
    //loop
  for (let i=0; i < count; i++) {

  // kreise
    const f = i / count; // fraction
    const a = i / PHI; // anordnung im Kreis/spirale = PI oder PHI
    const dist = f * radius; // distance = fraction * radius
    const x = 0.5 + cos(a * TWO_PI) * dist;
    const y = 0.5 + sin(a * TWO_PI) * dist;
    const sig = pow(cosn(f + t * 6), 2);  // Signal für weniger Punkte in der mitte, fraction + time 
    const r = sig * f * dotSize;

    const hue = fract(f * 0.5 + t); //Farbe über zeit ändern. 
    const sat = 1;
    const light = 0.6 * sig + 0.1; 
    const clr = color(hue, sat, light);
    fill(clr);

    circle(x, y, r);
  }
}