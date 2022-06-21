
// Tutorial used: https://www.youtube.com/watch?v=uk96O7N1Yo0
// Tutorial used : https://modest-mayer-1e081f.netlify.app/de/bonus/sound/
// inspo https://www.youtube.com/watch?v=6i5hho2aD-E







//global value to store information
var audio
var fft //FFT = (Fast Fourier Transform) is an analysis algorithm that isolates individual audio frequencies within a waveform.
var counter = 0; 
let easing = 0.05;
//let amp; //Variable for Amplitud: Loudness and Soundlevel
let colorPicker;

// load soundfile
function preload() {
  audio = loadSound('jarvis_s.mp3')
}

function setup() {
  // create canvas to draw in. Size is the height and width of the Browserwindow
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES)

  // START BACKGROUND  https://editor.p5js.org/owenroberts/sketches/jZskipYSa

  const grid = new Bhex.Grid(6);
  const side = 40;
  maze(grid);

  for (let i = 0; i < grid.hexes.length; i++) {
    hexagon(grid.hexes[i], side, i, true, 'inside');
  }
  
  for (let i = 0; i < grid.hexes.length; i++) {
    hexagon(grid.hexes[i], side, i, true, 'walls');
  }

  // ENDE BACKGROUND

  fft = new p5.FFT()

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
    point(x, y) //point or vertex to change apperence

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

//##################################


//##################################
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









// START Background functions

let mazeCount = 1;
function maze(grid) {
  const stack = [];
  let current = grid.getHexAt(new Bhex.Axial(0, 0));
  current.count = mazeCount;
  console.log(current);
  mazeCount++;
  let next = current.getNeighbor(grid);
  next.count = mazeCount;
  mazeCount++;
  while (next) {
    next.visited = true;
    stack.push(current);
    removeWalls(current, next);
    current = next;
    next = current.getNeighbor(grid);
    while (!next && stack.length > 0) {
      current = stack.pop();
      next = current.getNeighbor(grid);
    }
    if (next) next.count = mazeCount;
    mazeCount++;
  } 
}

function removeWalls(a, b) {
  // figure out what wall is between each cell
  var d = { x: a.x - b.x, y: a.y - b.y };
  
  if (d.x === -1 && d.y === 0) {
    a.walls[0] = false;
    b.walls[3] = false;
  }
  
  if (d.x === 0 && d.y === -1) {
    a.walls[1] = false;
    b.walls[4] = false;
  }
  
  if (d.x === 1 && d.y === -1) {
    a.walls[2] = false;
    b.walls[5] = false;
  }
  
  if (d.x === 1 && d.y === 0) {
    a.walls[3] = false;
    b.walls[0] = false;
  }
  
  if (d.x === 0 && d.y === 1) {
    a.walls[4] = false;
    b.walls[1] = false;
  }
  
  if (d.x === -1 && d.y === 1) {
    a.walls[5] = false;
    b.walls[2] = false;
  }
}

function hexagon(hex, side, index, drawLabel, part) {
  const w = side * 2;
  const h = Math.sqrt(3) / 2 * w;
  let { x, y } = hex.getPosition(w, h);
 
  let angle = TWO_PI / 6;
  if (part == 'inside') {
    noStroke();
    fill(20,20,30);
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = x + cos(a) * side;
      let sy = y + sin(a) * side;
      vertex(sx, sy);
    }
    endShape(CLOSE);
    noStroke();
    if (drawLabel) {
      fill(127);
    }
  }
  if (part == 'walls') {
    let points = [];
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = x + cos(a) * side;
      let sy = y + sin(a) * side;
      points.push({ x: sx, y: sy });
    }
    stroke(80, 80, 250);
    strokeWeight(3);
    // SE, S, SW, NW, N, NE
    for (let i = 0; i < points.length - 1; i++) {
      if (hex.walls[i]) {
        line(points[i].x, points[i].y, points[i+1].x, points[i+1].y);
      }
    }
  }

  
}

var Bhex = {};
Bhex.Axial = function(x, y) {
  this.x = x;
  this.y = y;
  
  this.getPosition = function(w, h) {
    let c = this.toCube();
    return { 
      x: Math.round(c.x * w * 3/4), 
      y: Math.round((c.z + c.x / 2) * h),
    };
  };
  
  this.getKey = function() {
    return `${this.x} x ${this.y}`;
  };
  
  this.getCubeKey = function() {
    let c = this.toCube();
    return `${c.x} x ${c.y} x ${c.z}`;
  };
  
  this.toCube = function() {
    return new Bhex.Cube(this.x, -this.x - this.y, this.y);
  };
  
  this.compareTo = function(other) {
    return (this.x == other.x && this.y == other.y);
  };
};

Bhex.Cube = function(x, y, z) {
  Bhex.Axial.call(this, x, y);
  this.z = z || -x-y;

  this.toAxial = function() {
    return new Bhex.Axial(this.x, this.z);
  };
  
  this.round = function() {
    let [cx, cy, cz] = [this.x, this.y, this.z];
    this.x = Math.round(cx);
    this.y = Math.round(cy);
    this.z = Math.round(cz);
    
    let xDiff = Math.abs(this.x - cx);
    let yDiff = Math.abs(this.y - cy);
    let zDiff = Math.abs(this.z - cz);
    
    if (xDiff > yDiff && xDiff > zDiff) {
      this.x = -this.y - this.z;
    } else if (yDiff > zDiff) {
      this.y = -this.x - this.z;
    } else {
      this.z = -this.x - this.y
    }
    
    return this;
  };
};

Bhex.Grid = function(radius) {
  this.radius = radius || 0;
  this.hexes = [];
  
  for (let x = -radius; x <= radius; x++) {
    for (let y = -radius; y <= radius; y++) {
      for (let z = -radius; z <= radius; z++) {
        if (x + y + z === 0) this.hexes.push(new Bhex.Hexagon(x, y));
      }
    }
  }
  
  this.getHexAt = function(a) {
    let hex;
    this.hexes.map(h => {
      if (h.compareTo(a)) {
        hex = h;
        return;
      }
    });
    return hex;
  };
  
  this.getNeighbors = function(a) {
    let grid = this;
    let neighbors = [];
    let directions = [
      new Bhex.Axial(a.x + 1, a.y), new Bhex.Axial(a.x + 1, a.y - 1), new Bhex.Axial(a.x, a.y - 1), 
      new Bhex.Axial(a.x - 1, a.y), new Bhex.Axial(a.x - 1, a.y + 1), new Bhex.Axial(a.x, a.y + 1), 
    ];
    
    directions.forEach(dir => {
      let h = grid.getHexAt(dir);
      if (h) neighbors.push(h);
    });
    return neighbors;
  };
  
  // get distance ?
};

Bhex.Hexagon = function(x, y, cost, blocked) {
  Bhex.Axial.call(this, x, y);
  this.cost = (cost) ? cost : 1;
  this.blocked = !!blocked;
  // SE, S, SW, NW, N, NE
  this.walls = [false, false, false, false, false, false];
  
  // kind of arbitrary but probably mathematically reducible
  let c = this.toCube();
  if (c.y <= 0) this.walls[0] = true;
  if (c.z >= 0) this.walls[1] = true;
  if (c.x <= 0) this.walls[2] = true;
  if (c.y >= 0) this.walls[3] = true;
  if (c.z <= 0) this.walls[4] = true;
  if (c.x >= 0) this.walls[5] = true;
  
  this.visited = false;
  
  this.getNeighbor = function(grid) {
    const neighbors = grid.getNeighbors(this)
      .filter(n => !n.visited);
    return random(neighbors);
  };
  
};

// need this?
Bhex.Grid.Search = {};
Bhex.Grid.Heap = function() {
  if (!BinaryHeap) throw new Error("BinaryHeap was not found.");
  return new BinaryHead(node => {
    return node.F;
  });
};
// END Background functions



