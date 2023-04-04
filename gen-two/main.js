import './style.css';
import * as Tone from 'tone';

console.clear();
console.log('Gen Two-2');
const now = Tone.now();

document.querySelector('.play').addEventListener('click', function () {
  console.log('Tone started');
  Tone.start();
  Tone.Transport.start();
});

document.querySelector('.stop').addEventListener('click', function () {
  console.log('Stop Transport');
  Tone.Transport.stop();
  synthOne.triggerRelease(now + 1);
  synthTwo.triggerRelease(now + 1);
  synthThree.triggerRelease(now + 1);
  synthFour.triggerRelease(now + 1);
  synthSubs.triggerRelease(now + 1);
});

// document.querySelector('.play').addEventListener('click', function () {
//   console.log('Play');
//   synthOne.triggerAttack('D3', now);
//   synthTwo.triggerAttack('F3', now + 1);
//   synthThree.triggerAttack('Bb3', now + 2);
//   synthFour.triggerAttack('Eb1', now + 4);
// });

// document.querySelector('.stop').addEventListener('click', function () {
//   console.log('Stop');
//   synthOne.triggerRelease(now + 1);
//   synthTwo.triggerRelease(now + 1);
//   synthThree.triggerRelease(now + 1);
//   synthFour.triggerRelease(now + 1);
// });

const patternOne = new Tone.Pattern(
  (time, note) => {
    synthOne.triggerAttackRelease(note, '2n', time);
  },
  ['E3', 'D3', 'A3', 'G3', 'F#3', 'E3', 'D3', 'A3'],
  'up'
);

const patternTwo = new Tone.Pattern(
  (time, note) => {
    synthTwo.triggerAttackRelease(note, '4n', time + 1);
  },
  ['E3', 'D3', 'A3', 'G3', 'F#3', 'E3', 'D3', 'A3', 'A3', 'G3', 'F#3'],
  'up'
);

const patternThree = new Tone.Pattern(
  (time, note) => {
    synthThree.triggerAttackRelease(note, '1n', time + 4);
  },
  ['F2', 'C2', 'G2', 'Bb2'],
  'upDown'
);

const patternFour = new Tone.Pattern(
  (time, note) => {
    synthFour.triggerAttackRelease(note, 'n', time + 4);
  },
  ['F2', 'C2', 'G2', 'Bb2'],
  'upDown'
);

const patternSubs = new Tone.Pattern(
  (time, note) => {
    synthSubs.triggerAttackRelease(note, '1n', time + 1);
  },
  ['B1', 'A1', 'G1', 'D1'],
  'up'
);

const seq = new Tone.Sequence(
  (time, note) => {
    synthOne.triggerAttackRelease(note, '2n', time);
    // subdivisions are given as subarrays
  },
  ['C4', ['E4', 'D4', 'E4'], 'G4', ['A4', 'G4']]
).start(0);

//Synth Definitions
const synthOne = new Tone.Synth({
  oscillator: {
    type: 'sawtooth',
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
    type: 'square',
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
//Panning Loop
const panLoop = new Tone.Loop((time) => {
  // triggered every eighth note.
  console.log(time);
  if (rightPanner.pan.value < 0) {
    rightPanner.pan.rampTo(0.5, 6);
    leftPanner.pan.rampTo(-0.5, 6);
  } else {
    rightPanner.pan.rampTo(-0.5, 6);
    leftPanner.pan.rampTo(0.5, 6);
  }
}, '4n').start(0);

const rev = new Tone.Reverb();
rev.decay = 0.8;

const comp = new Tone.Compressor(-3, 2);
//Filter
let filter = new Tone.Filter(400, 'lowpass');
let subFilter = new Tone.Filter(500, 'lowpass');
// const filterLoop = new Tone.Loop((time) => {
//   if(filter.frequency < 2000){
//   filter.frequency.rampTo(4000,6);
//   } else {
//     filter.frequency.rampTo(300,6);
//   }
// }, "2n").start(0);

//Connections
synthOne.connect(rightPanner);
synthTwo.connect(leftPanner);
synthThree.connect(farRightPanner);
synthFour.connect(farLeftPanner);
rightPanner.connect(rev);
leftPanner.connect(rev);
farRightPanner.connect(rev);
farLeftPanner.connect(rev);
synthSubs.connect(subFilter);
rev.connect(filter);
subFilter.connect(comp);
filter.connect(comp);
comp.toDestination();

//patternOne.start(0);
//patternTwo.start(0);
//patternThree.start(2);
//patternFour.start(4);
//patternSubs.start(0);

//Start the timeline
Tone.Transport.bpm.value = 30;
//Tone.Transport.start();
