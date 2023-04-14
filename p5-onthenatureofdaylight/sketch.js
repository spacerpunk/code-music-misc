console.clear();
console.log('On the Nature of Daylight');
const now = Tone.now();
const waveOne = new Tone.Waveform();
const waveTwo = new Tone.Waveform();
const waveThree = new Tone.Waveform();
const mainWave = new Tone.Waveform();
let mainGain;
let isPlaying;

/* FINAL TODO
  - Make the melody choose from random arrays every time the page is refreshed
  - Make the SineWave look nicer
  - Change font and Intro Text: every time you refresh it it displays a different quote
  - Add a random pluck synth that plays random notes every loop. (Some Null)
  - Better controls of X + Y with the Mouse
  - Make the synths oscillate their parameters in loops
  - Generate new synths for the parts every time the page is refreshed, steal the function from the Source Project
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

function makeSynths(count) {
  const synths = [];
  for (let i = 0; i < count; i++) {
    let oscType;
    if (i < 2) {
      oscType = 'sine';
    } else if (i == 2) {
      oscType = 'triangle';
    } else {
      oscType = 'square8';
    }
    let synth = new Tone.Synth({
      oscillator: { type: oscType },
      envelope: {
        attack: 2,
        decay: 1,
        sustain: 1,
        release: 1,
      },
    }).connect(masterGain);
    synth.volume.value = -15;
    synths.push(synth);
  }
  return synths;
}

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
let gainRight = new Tone.Gain(0.4);
let gainLeft = new Tone.Gain(0.5);
let gainFarRight = new Tone.Gain(0.14);
let gainFarLeft = new Tone.Gain(0.1);
let masterGain = new Tone.Gain(mainGain);
let melodyGain = new Tone.Gain(0.65);
let melodyHiGain = new Tone.Gain(0.8);
let subGain = new Tone.Gain(0.3);
//Filter
let filter = new Tone.Filter(400, 'lowpass');
let subFilter = new Tone.Filter(500, 'lowpass');

let masterRev = new Tone.Reverb();
masterRev.wet.value = 0.4;
let masterVolume = 0.8;
let mainVolumeGain = new Tone.Gain(masterVolume);



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
gainFarRight.connect(waveThree);
//Tone.Master.connect(mainWave);
comp.connect(masterRev);
masterRev.connect(mainVolumeGain);
mainVolumeGain.toDestination();

/* ------- PATTERNS ------- */
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
Tone.Transport.bpm.value = 15;

function setup(){
    createCanvas(windowWidth, windowHeight);
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
          let x1 = map(i - 1, start, end, 0, width);
          let y1 = map(buffer[i - 1], -1, 1, 0, height);
    
          let x2 = map(i, start, end, 0, width);
          let y2 = map(buffer[i], - 1, 1, 0, height);
          line(x1, y1, x2, y2);
        }
}

function draw(){
    background(0);
    if(isPlaying){
        drawBuffer(mainWave,255,2);
        drawBuffer(waveOne,'red',10);
        drawBuffer(waveTwo,'green',6);
        drawBuffer(waveThree,'blue',4);
        filter.frequency.value = map(mouseX , 0, width, 100, 4000);
        mainVolumeGain.gain.value = map(mouseY, height,0,0,5);
        

        
    } else {
        background(0);
        fill(255);
        noStroke();
        textAlign(CENTER, CENTER);
        text('CLICKEA PARA ESCUCHAR', width / 2, height / 2);
        text('El Mouse Controla Filtro y Volumen', width / 2, height / 2 + 20);
        text('No te salgas de los bordes', width / 2, height / 2 + 40);

    }
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
