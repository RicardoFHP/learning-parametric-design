
// Tutorial used: https://www.youtube.com/watch?v=uk96O7N1Yo0
// Tutorial used : https://modest-mayer-1e081f.netlify.app/de/bonus/sound/
// inspo https://www.youtube.com/watch?v=6i5hho2aD-E



// TODO
// Input Slider,
// INput Radio Buttons
// Buttons for diffrent Sound
//Array for Ghost effect
//Pitch, Bass, mids, lows define How soundwave looks.

// Emotion changes appearance (color and may form)
// Css Visual UI



//global value to store information
var audio
var fft //FFT = (Fast Fourier Transform) is an analysis algorithm that isolates individual audio frequencies within a waveform.
var counter = 0; 
let easing = 0.05;
//let amp; //Variable for Amplitud: Loudness and Soundlevel
let colorPicker;

const points = []; // empty Array (for Array ghost effect)
const numLoops = 20;
const minOpacity = 200;

// load soundfile
function preload() {
  audio = loadSound('jarvis_s.mp3')
}

function setup() {
  // create canvas to draw in. Size is the height and width of the Browserwindow
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.mouseClicked(mouseClickedOnCanvas); // fix for only play/pause when clicking on Canvas, linking to function
  angleMode(DEGREES);

  fft = new p5.FFT();

      // audio activation...

      amp = new p5.Amplitude();
      amp.setInput(audio);


//##################################
// Colorpicker Sets up
//##################################
      
      colorPicker = createColorPicker('#00fbfb');
      colorPicker.position(width + 20, 200);
      
//##################################    


}




function draw() {
  //background rgb color 30 = dark gray 0=black, 255=white red=0,green=0,blue=0
  background(20,20,30);
  stroke(230 + 20 * noise(counter, 1))
  strokeWeight(0.1 + 5.9 * noise(counter))

  counter += 0.05;
  const level = amp.getLevel();
  const clr = colorPicker.color();//use color Value from Colorpicker  //color(hue, sat, light);




  // adding glow shadow
  drawingContext.shadowBlur = 30;
  drawingContext.shadowColor = color(clr); //color(random(0,80), 10, random(200,255));



  //Center Circle by getting the half of screen for width and hight.
  translate(width / 2, height / 2)

  //variable for fft waveform, returns array with thousands of elements
  var wave = fft.waveform()
  


  //##################################
  //Circles
  //##################################

  //##################################
  //draw outer circle right

  beginShape()
  for (var i = 0; i/*index variable*/ < 180/*halber Kreis*/; i++) {
    var index = floor(map(i, 0, 180, 0, wave.length - 1))

    var r = map(wave[index], -1, 1, 150, 350)
    var x = r * sin(i) 
    var y = r * cos(i)
    point(x, y) //point or vertex to change apperence, creates half circle

  }
  endShape()


  //##################################
  //draw outer circle left
  beginShape()
  for (var i = 0; i/*index variable*/ < 180/*halber Kreis*/; i++) {
    var index = floor(map(i, 0, 180, 0, wave.length - 1))

    var r = map(wave[index], -1, 1, 150, 350)
    var x = r * -sin(i) //-sin mirrors half circle Waveform
    var y = r * cos(i)
    point(x, y) //point or vertex to change apperence

  }
  endShape()


//##################################
  //mid Circle lieft
  stroke(random(230, 250))
  strokeWeight(1)
  noFill()

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
  strokeWeight(1)
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
  strokeWeight(6)
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
  strokeWeight(6)
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
  if (audio.isPlaying()) {
    audio.pause()
    noLoop() // makes it stop instead of canceling
  } else {
    audio.play()
    loop() // makes it stop instead of canceling
  }
}





