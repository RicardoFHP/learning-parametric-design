
// Tutorial used: https://www.youtube.com/watch?v=uk96O7N1Yo0
// Tutorial used : https://modest-mayer-1e081f.netlify.app/de/bonus/sound/
// inspo https://www.youtube.com/watch?v=6i5hho2aD-E







//global value to store information
var audio
var fft //FFT = (Fast Fourier Transform) is an analysis algorithm that isolates individual audio frequencies within a waveform.
let easing = 0.05;
//let amp; //Variable for Amplitud: Loudness and Soundlevel


// load soundfile
function preload() {
  audio = loadSound('jarvis_s.mp3')
}

function setup() {
  // create canvas to draw in. Sizw is the height and width of the Browserwindow
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES)
  fft = new p5.FFT()

      // audio activation...

      amp = new p5.Amplitude();
      amp.setInput(audio);
}


function draw() {
  //background rgb color 30 = dark gray 0=black, 255=white red=0,green=0,blue=0
  background(30) 
  stroke(random(230, 250))
  strokeWeight(random(0.1, 10))

  const level = amp.getLevel();

  // adding glow shadow
  drawingContext.shadowBlur = 30;
  drawingContext.shadowColor = color(random(0,80), 10, random(200,255));

  translate(width / 2, height / 2)

  //variable for fft waveform, returns array with thousands of elements
  var wave = fft.waveform()
  


  //########################################
  //draw outer circle right

  beginShape()
  for (var i = 0; i/*index variable*/ < 180/*halber Kreis*/; i++) {
    var index = floor(map(i, 0, 180, 0, wave.length - 1))

    var r = map(wave[index], -1, 1, 150, 350)
    var x = r * sin(i) 
    var y = r * cos(i)
    point(x, y) //point or vertex to change apperence

  }
  endShape()


  //########################################
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


//########################################
  //inner Circle lieft
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

}

//function to start and pause song if song is playing it should either start or pause
function mouseClicked() {
  if (audio.isPlaying()) {
    audio.pause()
    noLoop() // makes it stop instead of canceling
  } else {
    audio.play()
    loop() // makes it stop instead of canceling
  }
  
}





