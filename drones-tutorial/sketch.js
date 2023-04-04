let ready = false;
let masterVolume = -10;
let osc;
let osc2;

// Create a new canvas to match the browser size
function setup() {
  createCanvas(windowWidth, windowHeight);

  osc = new Tone.Oscillator();
  osc.frequency.value = 73.4;
  osc.toDestination();
  osc2 = new Tone.Oscillator();
  osc2.frequency.value = 110;
  osc2.toDestination();
  wave = new Tone.Waveform();
  Tone.Master.connect(wave);
  Tone.Master.volume.value = masterVolume;
}

// On window resize, update the canvas size
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Main render loop
function draw() {
  background(0);
  if (ready) {
    //AudioStuff
    osc.frequency.value = map(mouseX, 0, width, 40, 640);

    stroke(255);
    let buffer = wave.getValue(0);

    //Look for point where samples go from negative to positive. Roots of the signal.
    let start = 0;
    for (let i = 1; i < buffer.length; i++) {
      if (buffer[i - 1] < 0 && buffer[i] >= 0) {
        start = i;
        break; // interrupts the for loop
      }
    }

    let end = start + buffer.length / 2;
    for (let i = start; i < end; i++) {
      let x1 = map(i - 1, start, end, 0, width);
      let y1 = map(buffer[i - 1], -1, 1, 0, height);

      let x2 = map(i, start, end, 0, width);
      let y2 = map(buffer[i], -1, 1, 0, height);
      line(x1, y1, x2, y2);
    }
  } else {
    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    text('CLICK TO START', width / 2, height / 2);
  }
}

function mousePressed() {
  if (!ready) {
    osc.start();
    //osc2.start();
    ready = true;
  }
}
