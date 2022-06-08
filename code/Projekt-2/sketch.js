//https://discourse.processing.org/t/siri-style-waveform-design-with-p5-sound/21529/9

function preload(){
  // preload assets
}



let s = sk => {
  const width = sk.windowWidth;
  const height = 300;

  sk.setup = () => {
    context = sk.getAudioContext();
    const sound = sk.loadSound('file.mp3');
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