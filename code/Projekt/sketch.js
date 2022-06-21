
// Tutorial used: https://www.youtube.com/watch?v=uk96O7N1Yo0
// Tutorial used : https://modest-mayer-1e081f.netlify.app/de/bonus/sound/
// inspo https://www.youtube.com/watch?v=6i5hho2aD-E
// inspo https://youtu.be/BQSoNYb69TE?t=12


// TODO
// INput Radio Buttons for chaning emotion
// Buttons for diffrent Sound
//Array for Ghost effect
//Pitch, Bass, mids, lows define How soundwave looks.

// Emotion changes appearance (color and may form) using Sound instead of Voice for easier recognition
// Css Visual UI



//global value to store information
var audio
var fft //FFT = (Fast Fourier Transform) is an analysis algorithm that isolates individual audio frequencies within a waveform.
var counter = 0; 
let easing = 0.05;
//let amp; //Variable for Amplitud: Loudness and Soundlevel
let colorPicker;
let sliderDotSize; //erstellt Variable Slider
let sliderB; // Variable for Slider 
//var rotationLeft = 0; // rotattion for inner circle left
//var rotationRight = 0; // rotattion for inner
let radio; //radio button 


var points = []; // empty Array (for Array ghost effect)
const minOpacity = 200; //transparency to use for points

// load soundfile
function preload() {
  song1 = loadSound('concussive.mp3');
  song2 = loadSound('ethernal.mp3');
  song3 = loadSound('kinetic.mp3');
}

function setup() {
  // create canvas to draw in. Size is the height and width of the Browserwindow
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.mouseClicked(mouseClickedOnCanvas); // fix for only play/pause when clicking on Canvas, linking to function
  angleMode(DEGREES);

  fft = new p5.FFT();

      // audio activation...

      amp = new p5.Amplitude();
      amp.setInput(song1);


//##################################
// INPUTS 
//##################################
      // Colorpicker Sets up
      colorPicker = createColorPicker('#00fbfb');
      colorPicker.position(width + 20, 200);
      
      // Erstellt slider für die größe der Kreise
      sliderDotSize = createSlider(1,50,10,5); // Min, max, start, steps
      sliderDotSize.position(20, 460);
      sliderDotSize.size(100);
      //Erstellt slider B
      sliderB = createSlider(0.01, 0.1, 0.01, 0.01);
      sliderB.position(20, 480);
      sliderB.size(100);
      //creates radio button for diffrent sound Input
      radio = createRadio();
      radio.option('red', '1');
      radio.option('purple', '2');
      radio.option('cyan', '3');
      radio.style('width', '300px');
      radio.selected('purple', '2');

      //load selected sound with radio button
     // let val = radio.value();
     // if (val) {
     //   song1 = playSound('concussive.mp3')
      //}
    //  function radiobuttonchoice() {
   //   if radio.option('1') {
   //     playSound('concussive.mp3')
   //   }
  //  }

     // function radiobuttonchoice() {
   //    if radio.option('1') {
    //      // .isPlaying() returns a boolean
    //      amp.setInput(song1);
   //   }
    //  }

//##################################    

}



function draw() {

  

    // Radio Button Input change
    // Get the value of the radio-button
    var radioValue = radio.value();
     
    // set/change the sound to value of Button
    //amp.setInput(song1);
    //song1 = loadSound('ethernal.mp3');



  //background rgb color 30 = dark gray 0=black, 255=white red=0,green=0,blue=0
  background(20,20,30);
  stroke(230 + 20 * noise(counter, 1));
  strokeWeight(0.1 + sliderDotSize.value() * noise(counter));

  counter += 0.05;
  const level = amp.getLevel();
  const clr = colorPicker.color();//use color Value from Colorpicker  //color(hue, sat, light);


  //##################################
  //Diffrent spectrum for bass, mids and tremble
  //##################################

  let spectrum = fft.analyze();
  let bass, lowMid, mid, highMid, treble;

  bass = fft.getEnergy("bass");
  lowMid = fft.getEnergy("lowMid");
  mid = fft.getEnergy("mid");
  highMid = fft.getEnergy("highMid");
  treble = fft.getEnergy("treble");
  
  let bins=[bass,lowMid,mid,highMid,treble]

  //##################################



  // adding glow shadow
  drawingContext.shadowBlur = 30;
  drawingContext.shadowColor = color(radioValue); //was clr for colorpicker //color(random(0,80), 10, random(200,255));



  //Center Circle by getting the half of screen for width and hight.
  translate(width / 2, height / 2)

  //variable for fft waveform, returns array with thousands of elements
  var wave = fft.waveform()
  
  //set rotation speed
  //rotationLeft -= 0.002;

  //##################################
  //Circles
  //##################################

  //##################################
  //draw outer circle right


  //stroke(255,255,255,30)
  beginShape()
  
  var newpoints = []; //empty Array for newpoints

  for (var i = 0; i/*index variable*/ < 180/*halber Kreis*/; i++) {
    var index = floor(map([i], 0, 180, 0, wave.length - 1))

    var r = map(wave[index], -1, 1, 180, 350)
    var x = r * sin(i) 
    var y = r * cos(i)
    
    newpoints.push([x, y]) //point or vertex to change appearence

  }
  points.push(newpoints); //
  points = points.slice(-8); //slice/delete all but the last (X) arrays

  for (let p = 0; p < points.length; p += 1)/*inner array*/ 
  {
    for (let pp = 0; pp < points[p].length; pp += 3) {
      point(points[p][pp][0], points[p][pp][1])
    }

  } //go through big array 
 


  


  endShape()


  strokeWeight(1 + (sliderDotSize.value() / 8))

 //set rotation speed
  //rotationRight += (0.002 * sin);
  //rotate(rotationRight);

  beginShape()
  for (var i = 0; i/*index variable*/ < 180/*halber Kreis*/; i++) {
    var index = floor(map(i, 0, 180, 0, wave.length - 1))

    var r = map(wave[index], -1, 1, 150, 250)
    var x = r * sin(i) //-sin mirrors half circle Waveform
    var y = r * cos(i)
    vertex(x, y) //point or vertex to change apperence


  }
  endShape()


  //##################################
  //draw outer circle left
  beginShape()
  for (var i = 0; i/*index variable*/ < 180/*halber Kreis*/; i++) {
    var index = floor(map(i, 0, 180, 0, wave.length - 2))

    var r = map(wave[index], -1, 1, 180, 350)
    var x = r * -sin(i) //-sin mirrors half circle Waveform
    var y = r * cos(i)
    point(x, y) //point or vertex to change appearence

  }
  endShape()


//##################################
  //mid Circle lieft
  stroke(random(230, 250))
  strokeWeight(1 + (sliderDotSize.value() / 8))
  noFill()

 //set rotation speed
  //rotationRight += (0.002 * sin);
  //rotate(rotationRight);

  beginShape()
  for (var i = 0; i/*index variable*/ < 180/*halber Kreis*/; i++) {
    var index = floor(map(i, 0, 180, 0, wave.length - 1))

    var r = map(wave[index], -1, 1, 150, 250)
    var x = r * -sin(i) //-sin mirrors half circle Waveform
    var y = r * cos(i)
    vertex(x, y) //point or vertex to change apperence


  }
  endShape()

//##################################
  //mid Circle right
  stroke(random(230, 250))
  strokeWeight(1 + (sliderDotSize.value() / 8))
  noFill()

  beginShape()
  for (var i = 0; i/*index variable*/ < 180/*halber Kreis*/; i++) {
    var index = floor(map(i, 0, 180, 0, wave.length - 1))

    var r = map(wave[index], -1, 1, 150, 250)
    var x = r * sin(i) //-sin mirrors half circle Waveform
    var y = r * cos(i)
    vertex(x, y) //point or vertex to change apperence

  }
  endShape()

  //##################################
  //draw inner circle left
  strokeWeight(6 + (sliderDotSize.value() / 6))
  beginShape()
  for (var i = 0; i/*index variable*/ < 180/*halber Kreis*/; i++) {
    var index = floor(map(i, 0, 180, 0, wave.length - 1))

    var r = map(wave[0], -1, 1, 150, 30)
    var x = r * -sin(i) //-sin mirrors half circle Waveform
    var y = r * cos(i)
    vertex(x, y) //point or vertex to change apperence

  }
  endShape()
  
  //##################################
  //draw inner circle right
  strokeWeight(6 + (sliderDotSize.value() / 6))
  beginShape()
  for (var i = 0; i/*index variable*/ < 180/*halber Kreis*/; i++) {
    var index = floor(map(i, 0, 180, 0, wave.length - 1))

    var r = map(wave[0], -1, 1, 150, 30)
    var x = r * sin(i) //-sin mirrors half circle Waveform
    var y = r * -cos(i)
    vertex(x, y) //point or vertex to change apperence

  }
  endShape()


}

//##################################


//##################################
//function to start and pause song if song is playing it should either start or pause
function mouseClickedOnCanvas() {
  if (song1.isPlaying()) {
    song1.pause()
    noLoop() // makes it stop instead of canceling
  } else {
    song1.play()
    loop() // makes it stop instead of canceling
  }
}



