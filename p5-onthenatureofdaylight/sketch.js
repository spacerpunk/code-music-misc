console.clear();
console.log('On the Nature of Daylight');
const now = Tone.now();
const waveOne = new Tone.Waveform();
const waveTwo = new Tone.Waveform();
const waveThree = new Tone.Waveform();
const mainWave = new Tone.Waveform();
let mainGain;
let isPlaying;

const quotes = ["Art illuminates the beauty of science.", 
"All you have to decide is what to do with the time that is given to you.",
"ON THE NATURE OF JAVA SCRIPT",
"Somewhere, something incredible is waiting to be known.",
"All reality is a game.",
"We'd stared into the face of Death, and Death blinked first.",
"Reality is that which, when you stop believing in it, doesn't go away."
];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* FINAL TODO
  - Make the SineWave look nicer
  - Change font and Intro Text for Futura: every time you refresh it it displays a different quote - DONE
  - Image sequence in Low Res playing in the BG (RadioheadNude)
  - Add a random pluck synth that plays random notes every loop. (Some Null) - DONE
  - Make the synths oscillate their parameters in loops 
  - Publish
*/


/* ------- PATTERN CREATION ------- */
const bassPattern = new Tone.Pattern(
  (time, note) => {
    synthOne.triggerAttackRelease(note, '2n', time);
  },
  ['Bb2', 'Ab2', 'F2', 'F#2'],
  'up'
);

const bassPatternTwo = new Tone.Pattern(
  (time, note) => {
    synthOne.triggerAttackRelease(note, '2n', time);
  },
  ['Bb2', 'C3', 'Db3', 'C3'],
  'up'
);

const celloPattern = new Tone.Pattern(
  (time, note) => {
    synthTwo.triggerAttackRelease(note, '2n', time);
  },
  ['F3', 'Eb3', 'C3', 'Db3'],
  'up'
);

const celloPatternTwo = new Tone.Pattern(
  (time, note) => {
    synthTwo.triggerAttackRelease(note, '2n', time);
  },
  ['F3', 'Ab3', 'Ab3', 'F3'],
  'up'
);

const violaPattern = new Tone.Pattern(
  (time, note) => {
    synthThree.triggerAttackRelease(note, '2n', time);
  },
  ['Db4', 'C4', 'Ab3', 'Bb3'],
  'up'
);

const violaPatternTwo = new Tone.Pattern(
  (time, note) => {
    synthThree.triggerAttackRelease(note, '2n', time);
  },
  ['Db4', 'Eb4', 'Eb4', 'F4'],
  'up'
);

const violinOneSeq1 = new Tone.Sequence(
  (time, note) => {
    synthFive.triggerAttackRelease(note, '8n', time);
  },
  [
    ['Bb4', 'C5', 'Bb4', 'C5'],
    ['Bb4', 'C5', 'Db5', 'Eb5'],
    ['Eb5', 'Ab4', 'Eb5', 'Ab4'],
    ['Eb5', 'Ab4', 'Eb5', 'Ab4'],
    ['Ab4', 'Bb4', 'Ab4', 'Bb4'],
    ['Ab4', 'Bb4', 'C5', 'Db5'],
    ['Db5', 'Gb4', 'Db5', 'Gb4'],
    ['Db5', 'Gb4', 'Db5', 'Gb4'],
  ]
);

const violinOneSeq2 = new Tone.Sequence(
  (time, note) => {
    synthSix.triggerAttackRelease(note, '8n', time);
    // subdivisions are given as subarrays
  },
  ['Db5', 'F6', 'F6', 'Eb6', 'Eb6', 'Db6', 'Db6', 'Db6']
);

const patternSubs = new Tone.Pattern(
  (time, note) => {
    synthSubs.triggerAttackRelease(note, '2n', time);
  },
  ['Bb1', 'Ab1', 'F1', 'F#1'],
  'up'
);

violinOneSeq1.humanize = true;
violinOneSeq2.humanize = true;

/* ------- SYNTH DEFINITIONS ------- */
const synthOne = new Tone.Synth({
  oscillator: {
    type: 'sine',
  },
  envelope: {
    attack: 1,
    decay: 0.5,
    sustain: 1,
    release: 1,
  },
});

const synthTwo = new Tone.Synth({
  oscillator: {
    type: 'sine',
  },
  envelope: {
    attack: 1,
    decay: 0.5,
    sustain: 0.5,
    release: 0.5,
  },
});

const synthThree = new Tone.Synth({
  oscillator: {
    type: 'triangle',
  },
  envelope: {
    attack: 1,
    decay: 0.5,
    sustain: 0.5,
    release: 0.5,
  },
});

const synthFour = new Tone.Synth({
  oscillator: {
    type: 'triangle',
  },
  envelope: {
    attack: 1,
    decay: 0.5,
    sustain: 0.5,
    release: 0.5,
  },
});

const synthFive = new Tone.FMSynth({
  oscillator: {
    type: 'triangle',
  },
  envelope: {
    attack: 1,
    decay: 0.5,
    sustain: 0.5,
    release: 0.5,
  },
});

const synthSix = new Tone.FMSynth({
  oscillator: {
    type: 'triangle',
  },
  envelope: {
    attack: 1,
    decay: 0.5,
    sustain: 0.5,
    release: 1,
  },
});

const synthSubs = new Tone.Synth({
  oscillator: {
    type: 'triangle',
  },
  envelope: {
    attack: 1,
    decay: 0.5,
    sustain: 1,
    release: 1,
  },
});


//Effects
let rightPanner = new Tone.Panner(0.5);
let leftPanner = new Tone.Panner(-0.5);
let farRightPanner = new Tone.Panner(1.0);
let farLeftPanner = new Tone.Panner(-1.0);
const rev = new Tone.Reverb();
const melodyRev = new Tone.Reverb();
const chorus = new Tone.Chorus();
const vibrato = new Tone.Vibrato();
mainGain = 0.5;
vibrato.depth.value = 0.2;
vibrato.frequency.value = 2;
chorus.feedback.value = 0.2;
chorus.wet.value = 1;
melodyRev.decay = 2;
melodyRev.wet.value = 1;
rev.decay = 0.8;
rev.wet.value = 0.2;
const comp = new Tone.Compressor(-3, 2);
let gainRight = new Tone.Gain(0.2);
let gainLeft = new Tone.Gain(0.3);
let gainFarRight = new Tone.Gain(0.11);
let gainFarLeft = new Tone.Gain(0.1);
let masterGain = new Tone.Gain(mainGain);
let melodyGain = new Tone.Gain(0.5);
let melodyHiGain = new Tone.Gain(0.6);
let subGain = new Tone.Gain(0.2);
//Filter
let filter = new Tone.Filter(400, 'lowpass');
let subFilter = new Tone.Filter(500, 'lowpass');

let masterRev = new Tone.Reverb();
masterRev.wet.value = 0.4;
let masterVolume = 0.3;
let mainVolumeGain = new Tone.Gain(masterVolume);


//RANDOM NOTES

//ARRAY NOTITAS SHOULD BE POPULATED IN A RANDOM WAY, AND LATER CREATED BY MAGENTA JS
const scale = ['Bb3', 'C3', 'Db3', 'F3', 'Gb3', 'Ab3', null, null, null, null];
const notitas = [
  [null, 'Eb3', null, 'Bb4', 'Bb4', 'Eb4', null, null, 'Ab3', 'Bb3', null, 'F4', 'C4', null, 'Bb4', 'F4', null, 'Db4'],
  [
   scale[getRandomInt(0,scale.length)],
   scale[getRandomInt(0,scale.length)],
   scale[getRandomInt(0,scale.length)],
   scale[getRandomInt(0,scale.length)],
   scale[getRandomInt(0,scale.length)],
   scale[getRandomInt(0,scale.length)],
   scale[getRandomInt(0,scale.length)],
   scale[getRandomInt(0,scale.length)],
   scale[getRandomInt(0,scale.length)],
   scale[getRandomInt(0,scale.length)],
   scale[getRandomInt(0,scale.length)],
  ],
  [
    scale[getRandomInt(0,scale.length)],
    scale[getRandomInt(0,scale.length)],
    scale[getRandomInt(0,scale.length)],
    scale[getRandomInt(0,scale.length)],
    scale[getRandomInt(0,scale.length)],
    scale[getRandomInt(0,scale.length)],
    scale[getRandomInt(0,scale.length)],
    scale[getRandomInt(0,scale.length)],
    scale[getRandomInt(0,scale.length)],
    scale[getRandomInt(0,scale.length)],
    scale[getRandomInt(0,scale.length)],
   ],
   [
    scale[getRandomInt(0,scale.length)],
    scale[getRandomInt(0,scale.length)],
    scale[getRandomInt(0,scale.length)],
    scale[getRandomInt(0,scale.length)],
    scale[getRandomInt(0,scale.length)],
    scale[getRandomInt(0,scale.length)],
    scale[getRandomInt(0,scale.length)],
    scale[getRandomInt(0,scale.length)],
    scale[getRandomInt(0,scale.length)],
    scale[getRandomInt(0,scale.length)],
    scale[getRandomInt(0,scale.length)],
   ],
];

function makeSynths(count) {
  const synths = [];
  for (let i = 0; i < count; i++) {
    let oscType;
    const filter = new Tone.Filter(500, 'lowpass');
    if (i < 2) {
      oscType = 'sine';
    } else if (i == 2) {
      oscType = 'triangle';
    } else {
      oscType = 'sine';
    }
    let synth = new Tone.Synth({
      oscillator: { type: oscType },
      envelope: {
        attack: 0,
        decay: 0.5,
        sustain: 0.4,
        release: 0.2,
      },
    }).connect(filter);
    filter.connect(rev);
    filter.connect(waveThree);
    synth.volume.value = -20;
    synths.push(synth);
  }
  return synths;
}

const randomSynth = makeSynths(5);
let randomSeed = getRandomInt(0,3);

const notes = new Tone.Sequence(
  function (time, note) {
    //console.log(time);
    randomSeed = getRandomInt(0,3);
    console.log(note);
    let rand = Math.floor(Math.random() * 5);
    randomSynth[rand].triggerAttackRelease(note, '16n', time);
  },
  notitas[randomSeed],
  '16n'
);

/* ------- CONNECTIONS ------- */
synthOne.connect(rightPanner);
synthTwo.connect(leftPanner);
synthThree.connect(farRightPanner);
synthFour.connect(farLeftPanner);
synthFive.connect(melodyGain);
synthFive.connect(mainWave);
synthSix.connect(melodyHiGain);

rightPanner.connect(gainRight);
leftPanner.connect(gainLeft);
farRightPanner.connect(gainFarRight);
farLeftPanner.connect(gainFarLeft);

gainFarLeft.connect(masterGain);
gainFarRight.connect(masterGain);
gainLeft.connect(masterGain);
gainRight.connect(masterGain);
masterGain.connect(rev);
melodyGain.connect(melodyRev);
melodyHiGain.connect(melodyRev);
melodyRev.connect(vibrato);
vibrato.connect(filter);
rev.connect(chorus);
chorus.connect(filter)
filter.connect(comp);


synthSubs.connect(subGain);
subGain.connect(subFilter);
subFilter.connect(comp);
rightPanner.connect(waveOne);
leftPanner.connect(waveTwo);

//Tone.Master.connect(mainWave);
comp.connect(masterRev);
masterRev.connect(mainVolumeGain);
mainVolumeGain.toDestination();

/* ------- PATTERNS ------- */
notes.start(2);
bassPattern.start(0);
bassPattern.stop(4);
bassPatternTwo.start(4);
bassPatternTwo.stop(8);
bassPattern.start(8);
celloPattern.start(0);
celloPattern.stop(4);
celloPatternTwo.start(4);
celloPatternTwo.stop(8);
celloPattern.start(8);
violaPattern.start(0);
violaPattern.stop(4);
violaPatternTwo.start(4);
violaPatternTwo.stop(8);
violaPattern.start(8);
violinOneSeq1.start(8);
violinOneSeq2.start(16);
patternSubs.start(8);

//* ------- START THE TIMELINE ------- */
Tone.Transport.bpm.value = 20;

let img;
let myFont;
let imgSequence = []
let currentFrame = 0;
let rand = Math.floor(Math.random() * quotes.length);
let particles = [];

class Particle {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.radius = random(1, 5);
  }

  move() {
    this.position.add(this.velocity);
    if (this.position.x < 0 || this.position.x > width) {
      this.velocity.x *= -1;
    }
    if (this.position.y < 0 || this.position.y > height) {
      this.velocity.y *= -1;
    }
  }

  draw() {
    let alpha = map(this.radius, 1, 5, 20, 220); // map the radius to a transparency value
    let color = (255, alpha); // create a color with the mapped transparency value
    fill(color);
    noStroke();
    circle(this.position.x, this.position.y, this.radius * 2);
  }
}


function setup(){
  background(0);
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 100; i++) {
    particles.push(new Particle());
  }
  isPlaying = false;
}

// On window resize, update the canvas size
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }

function drawBuffer(wave,color,weight){
    strokeWeight(weight);
    stroke(color);
        let buffer = wave.getValue();
        //Look for point where samples go from negative to positive. Roots of the signal.
        let start = 0;
        for (let i = 1; i < buffer.length; i++) {
          if (buffer[i - 1] < 0 && buffer[i] >= 0) {
            start = i;
            break; // interrupts the for loop
          }
        }
        let end = start + buffer.length * 0.5;
        for (let i = start; i < end; i++) {
          // let x1 = map(i - 1, start, end, 0, width);
          // let y1 = map(buffer[i - 1], -1, 1, 0, height);
          // let x2 = map(i, start, end, 0, width);
          // let y2 = map(buffer[i], - 1, 1, 0, height);
          let x1 = map(i - 1, start, end, 0, height);
          let y1 = map(buffer[i - 1], -1, 1, 0, width);
          let x2 = map(i, start, end, 0, height);
          let y2 = map(buffer[i], - 1, 1, 0, width);
          line(y1, x1, y2, x2);
        }
}


function preload() {
  let frames = 10;
  // //load images
  // for (let i=0; i < frames; i++)
  // {
  //   let filename = "image_" + i + ".png";
  //   imgSequence[i] = loadImage(filename);
  // }
  myFont = loadFont('./ad.otf');  
}

function draw(){
    let c1 = color(255, 0, 0); // red
    let c2 = color(0, 0, 0); // blue
    background(0);
    particles.forEach((particle) => {
      particle.move();
      particle.draw();
    });
    if(isPlaying){
        drawBuffer(mainWave,255,2);
        drawBuffer(waveOne,200,10);
        drawBuffer(waveTwo,180,6);
        drawBuffer(waveThree,130,4);
        filter.frequency.value = map(mouseX , 0, width, 100, 4000);
        mainVolumeGain.gain.value = map(mouseY, height,0,0,1);      
    } else {
        //background(0);
        fill(220);
        noStroke();
        textAlign(CENTER, CENTER);
        textFont(myFont);
        textSize(42);
        text(quotes[rand].toUpperCase(), width / 2, height / 2 - 10);
        textSize(30);
        text('Click Anywhere', width / 2, height / 2 + 50);
    }
}

function gradient(c1, c2) {
  // Calculate the gradient color based on the current x-position of the line
  let gradientColor = [];
  for (let x = 0; x <= width; x++) {
    let interp = map(x, 0, width, 0, 1);
    gradientColor[x] = lerpColor(c1, c2, interp);
  }
  return gradientColor;
}

function mousePressed(){
      if(!isPlaying){
      console.log('Tone started');
      Tone.start();
      Tone.Transport.start();
      isPlaying = true;
  } else {
      console.log('Stop Transport');
      Tone.Transport.stop();
      isPlaying = false;
      synthOne.triggerRelease(now + 1);
      synthTwo.triggerRelease(now + 1);
      synthThree.triggerRelease(now + 1);
      synthFour.triggerRelease(now + 1);
      synthSubs.triggerRelease(now + 1);
  }

}
