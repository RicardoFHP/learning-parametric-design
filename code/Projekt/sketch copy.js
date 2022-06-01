
let fft;

let audio;
// load the audio file
function preload() {
  audio = loadSound('loop.wav');
}

function setup() {
  // Will loop the audio track forever
  audio.loop();

  // Browser hack for mic activation
  getAudioContext().suspend();
  userStartAudio();

  audio = new p5.AudioIn();
  audio.start();


  // audio activation...

  fft = new p5.FFT();
  fft.setInput(audio);
  

}


function draw() {
  let spectrum = fft.analyze();
  noStroke();
  fill(255, 0, 255);
  for (let i = 0; i < spectrum.length; i++){
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h )
  }

  let waveform = fft.waveform();
  noFill();
  beginShape();
  stroke(20);
  for (let i = 0; i < waveform.length; i++){
    let x = map(i, 0, waveform.length, 0, width);
    let y = map( waveform[i], -1, 1, 0, height);
    vertex(x,y);
  }
  endShape();
}



























/*


function preload() {
  audio = loadSound('loop.wav');
}


let s = sk => {
  const width = sk.windowWidth;
  const height = 300;

  sk.setup = () => {
    context = sk.getAudioContext();
    const sound = sk.loadSound('loop.wav');
    var canvas = sk.createCanvas(width, height);
    canvas.parent('canvas');
    sk.noFill();
    fft = new p5.FFT(0.8, 1024);
    fft.setInput(sound);
    sound.play();
  };

  sk.draw = () => {
    sk.background(255);
    sk.colorMode(sk.RGB);
    sk.strokeWeight(3);

    fft.analyze();
    var bass = fft.getEnergy('bass', 'lowMid');
    var mid = fft.getEnergy('mid', 'highMid');
    var treble = fft.getEnergy('treble');

    var inc = sk.TWO_PI / 100;
    var multipliers = [0.7, 0.65, 0.6, 0.55, 0.5, 0.45, 0.4, 0.35];

    var waves = [
      {
        range: bass,
        amplitude: 0.5,
        from: sk.color(228, 229, 248, 255),
        to: sk.color(228, 229, 248, 0),
      },
      {
        range: mid,
        offset: 400,
        from: sk.color(195, 192, 240, 255),
        to: sk.color(195, 192, 240, 0),
      },
      {
        range: treble,
        offset: 900,
        from: sk.color(180, 213, 255, 255),
        to: sk.color(180, 213, 255, 0),
      },
    ];

    waves.map(({range, offset = 1, amplitude = 1, from, to}) => {
      for (var multiplier of multipliers) {
        sk.beginShape();
        sk.curveVertex(width, height / 2);
        let a = 0.0;
        var energy = sk.map(range, 0, 255, 0, amplitude, true);
        sk.stroke(sk.lerpColor(from, to, multiplier - 0.1));
        for (let i = 0; i < sk.displayWidth; i++) {
          var y = sk.sin(a) * multiplier * (height * energy) + height / 2;
          sk.curveVertex(i * 10 - multiplier * offset - width, y);
          a = a + inc;
        }
        sk.curveVertex(width, height / 2);
        sk.endShape();
      }
    });
  };
};

const P5 = new p5(s);

*/