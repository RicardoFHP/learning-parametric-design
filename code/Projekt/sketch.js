
// Tutorial used: https://www.youtube.com/watch?v=uk96O7N1Yo0
// Tutorial used : https://modest-mayer-1e081f.netlify.app/de/bonus/sound/
// inspo https://www.youtube.com/watch?v=6i5hho2aD-E
// inspo https://youtu.be/BQSoNYb69TE?t=12
// Sounds used: https://www.101soundboards.com/boards/28217-dj-sona-league-of-legends


// Can do
//Pitch, Bass, mids, lows define How soundwave looks.
// make soundwave smoother, less far movement
// play random sound 
//play random sound (add random sounds)




//global value to store information
var audio
var fft //FFT = (Fast Fourier Transform) is an analysis algorithm that isolates individual audio frequencies within a waveform.
var counter = 0; 
let easing = 0.05;
//let amp; //Variable for Amplitud: Loudness and Soundlevel
let colorPicker;
let sliderDotSize; //erstellt Variable Slider
let sliderAudio; // Variable for Slider 
//var rotationLeft = 0; // rotattion for inner circle left
//var rotationRight = 0; // rotattion for inner


var points = []; // empty Array (for Array ghost effect)
const minOpacity = 200; //transparency to use for points

let state = 1;
let radio;

var buttonPP;


//##################################
// Function for Switch Sound when pressing Button to sound array 0,1 or 2
//##################################
function myInputEvent() {
  sound1.pause();
  sound2.pause();
  sound3.pause();
  
  state = radio.value();
  console.log(state);
  if (state === '1') {
  changemusic1.play();
  amp.setInput(sound1);
  sound1.loop();
} else if (state === '2') {
  changemusic1.play();
  amp.setInput(sound2);
  sound2.loop();
} else if (state === '3') {
  changemusic2.play();
  amp.setInput(sound3);
  sound3.loop();
} 
}



// load soundfile
function preload() {
  sound1 = loadSound('concussive.mp3');
  sound2 = loadSound('ethernal.mp3');
  sound3 = loadSound('kinetic.mp3');
  changemusic1 = loadSound('changemusic1.mp3');
  changemusic2 = loadSound('changemusic2.mp3');

  // load svg for buttons
  happySvg = loadImage('happy.svg');
  superhappySvg = loadImage('superhappy.svg');
  neutralSvg = loadImage('neutral.svg');

}

function setup() {
  // create canvas to draw in. Size is the height and width of the Browserwindow
  var canvas = createCanvas(windowWidth -300, windowHeight);
  angleMode(DEGREES);

  fft = new p5.FFT();

      // audio activation...

      amp = new p5.Amplitude();
      


//##################################
// INPUTS 
//##################################
     
  labelRadio = createDiv();
  labelRadio.position(30, 30);  
      radio = createRadio();
      radio.parent(labelRadio);
      radio.addClass('rating');// adds class for Radio buttons
      radio.option(1, 'Agressive');
      radio.option(2, 'Chilled');
      radio.option(3, 'Energetic');
      radio.position(width - 8, 160);
      radio.input(myInputEvent);
      radio.style('width', '60px');
      radio.style('height', '600px');
  
    

      // creates button for play and pause
      buttonPP = createButton('Pause');
      buttonPP.addClass('playbutton');// adds class for toggle Style 
      buttonPP.mousePressed(togglePlaying);
      buttonPP.position(width + 24, 460);

      //creates slider for audio volume
      sliderAudio = createSlider(0, 0.6, 0.3, 0.01);
      sliderAudio.position(width + 24, 514);
      sliderAudio.size(100);
      sliderAudio.style('width', '230px');

         
        
  //##################################

      // creates slider für dot size
      sliderDotSize = createSlider(1,50,10,0.5); // Min, max, start, steps
      sliderDotSize.position(width + 24, 548);
      sliderDotSize.size(100);
      sliderDotSize.style('width', '230px');

}

// Function for pause or play
function togglePlaying() {
  
  
  if (
    radio.value() == 1
  ){
  if (!sound1.isPlaying()) {
    sound1.loop();
    buttonPP.html('Pause');
  } else {
    sound1.pause();
    buttonPP.html('Play');
  }}

  if (
    radio.value() == 2
  ){
  if (!sound2.isPlaying()) {
    sound2.loop();
    buttonPP.html('Pause');
  } else {
    sound2.pause();
    buttonPP.html('Play');
  }}

  if (
    radio.value() == 3
  ){
  if (!sound3.isPlaying()) {
    sound3.loop();
    buttonPP.html('Pause');
  } else {
    sound3.pause();
    buttonPP.html('Play');
  }}

}

function draw() {

  //background rgb color 30 = dark gray 0=black, 255=white red=0,green=0,blue=0
  background(20,20,30);
  stroke(230 + 20 * noise(counter, 1));
  strokeWeight(0.1 + sliderDotSize.value() * noise(counter));



  
  counter += 0.05;
  const level = amp.getLevel();


  //##################################
  //Sets the Volume of sounds to the value of the slider
  //##################################

  let sliderAudioVal = sliderAudio.value();
  sound1.setVolume(sliderAudio.value());
  sound2.setVolume(sliderAudio.value());
  sound3.setVolume(sliderAudio.value());
  changemusic1.setVolume(sliderAudio.value());
  changemusic2.setVolume(sliderAudio.value());



  var shadowcolor=('blue'); // variable for shadow color used in strokeWeight default blue
  var ColorState1 = color(random(223,255), 0, 20);
  
  //##################################
  //Diffrent color for Soundstates
  //##################################
  // 
  if (state === '1') {
      shadowcolor=(ColorState1);
      strokeWeight(sliderDotSize.value() * noise(0.05,0.2));
    } else if (state === '2') {
      shadowcolor=('purple');
      strokeWeight(sliderDotSize.value() * 0.5);
    } else if (state === '3') {
      shadowcolor=('cyan');
      strokeWeight(sliderDotSize.value() * 1);
    }

  // adding glow shadow
  drawingContext.shadowBlur = 30;
  drawingContext.shadowColor = color(shadowcolor); //color(random(0,80), 10, random(200,255));



  //Center Circle by getting the half of screen for width and hight.
  translate(width / 2, height / 2)

  //variable for fft waveform, returns array with thousands of elements
  var wave = fft.waveform()
  
  //set rotationSpeed
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
  points = points.slice(-10); //slice/delete all but the last (X) arrays

  for (let p = 0; p < points.length; p += 1)/*inner array*/ 
  {
    for (let pp = 0; pp < points[p].length; pp += 3) {
      point(points[p][pp][0], points[p][pp][1])
    }

  } //go through big array 
 
  endShape()


  strokeWeight(1 + (sliderDotSize.value() / 8))

  //set rotation speed
  //rotationLeft += (0.002 * sin);
  //rotate(rotationLeft);

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
  
  var newpoints = []; //empty Array for newpoints
  const minOpacity = 200;

  for (var i = 0; i/*index variable*/ < 180/*halber Kreis*/; i++) {
    var index = floor(map([i], 0, 180, 0, wave.length - 1))

    var r = map(wave[index], -1, 1, 180, 350)
    var x = r * -sin(i) 
    var y = r * cos(i)
    
    newpoints.push([x, y]) //point or vertex to change appearence

  }
  points.push(newpoints); //
  points = points.slice(-20); //slice/delete all but the last (X) arrays

  for (let p = 0; p < points.length; p += 1)
  //stroke(10, minOpacity/newpoints * l)

  /*inner array*/ 
  {
    for (let pp = 0; pp < points[p].length; pp += 3) {
      point(points[p][pp][0], points[p][pp][1])
    }

  } //go through big array 
 
  endShape()

//##################################
  //mid Circle lieft
  stroke(random(230, 250))
  strokeWeight(1 + (sliderDotSize.value() / 8))
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
