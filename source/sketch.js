/*
Make a simple generative composition with Magenta and Tone. Sequence of base.
Arpegiated chords and random melody given a set of
pre composed melodies than can be chosen at random by the system.
All in a p5js simple sketch with 8bits. Keep it simple and sounding nice.

Arrays for chords...
and then construct melody bass and arpegios from them using the index numbers...
bass only takes the [0] index...
arpegios take the [0] [2] [4] primera tercera quinta...
and so on
*/
console.clear();
const now = Tone.now();
let bpm = 40;
Tone.Transport.bpm.value = bpm;
const timeSignature = [4, 4];
Tone.Transport.timeSignature = timeSignature;

//NOTE ARRAYS
const gMajor = Tonal.Scale.get('G major').notes;
const gChord = Tonal.Chord.get('G major').notes;
const array1 = [
  ['G2', 'B2', 'E2', 'C2'],
  ['D2', 'F#3', 'B2', 'G2'],
  ['B3', 'D4', 'G3', 'E3'],
];
const array2 = [
  ['A2', 'G2', 'F#2', 'D2'],
  ['E2', 'D2', 'D2', 'D2'],
  ['C3', 'B3', 'A3', 'A3'],
];
const array3 = [
  ['C2', 'E2', 'G2', 'C2'],
  ['G2', 'B3', 'D2', 'G2'],
  ['E3', 'G3', 'B3', 'E3'],
];

const bassArrays = [array1, array2, array3];

//ARRAY NOTITAS SHOULD BE POPULATED IN A RANDOM WAY, AND LATER CREATED BY MAGENTA JS
const notitas = [
  null,
  'G3',
  null,
  'B4',
  'B4',
  'E4',
  null,
  null,
  ['B3', 'C4', 'D4', 'G4'],
  'B3',
  null,
  'G4',
  'G5',
  null,
  'B5',
  'G5',
  null,
  'D5',
];

//SAMPLES
//PADS:

//INSTRUMENTS
const polySynth = new Tone.PolySynth(Tone.Synth).toDestination();
polySynth.set({
  oscillator: {
    type: 'sine',
  },
  envelope: {
    attack: 2,
    decay: 4,
    sustain: 1,
    release: 2,
  },
});
polySynth.volume.value = -15;

const randomNotesSynth = new Tone.Synth();
randomNotesSynth.set({
  oscillator: {
    type: 'sine',
  },
  envelope: {
    attack: 0,
    decay: 0.3,
    sustain: 0.5,
    release: 1,
  },
});
randomNotesSynth.volume.value = -10;

//EFFECTS
const reverb = new Tone.Reverb();
const lpFilter = new Tone.Filter();
const mainGain = new Tone.Gain();
const melodyDelay = new Tone.Delay().toDestination();
//EFFECTS PARAMETERS
reverb.wet.value = 0.7;
melodyDelay.delayTime.value = 0.5;

//CONNECTIONS
randomNotesSynth.connect(reverb);
reverb.connect(lpFilter);
lpFilter.connect(mainGain);
mainGain.toDestination();

//FUNCTIONS
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomNotes(count, chord) {
  //FUNCTION THAT RETURNS AN ARRAY OF RANDOM NOTES
  //An array of nulls and you fill it randomly with random notes and intervals, each time the sequence starts
  const randomNotes = [];
  let randNumber = getRndInteger(2, 4);
}

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
    }).connect(reverb);
    synth.volume.value = -15;
    synths.push(synth);
  }
  return synths;
}

//SEQUENCES
const bassSynthOne = makeSynths(5);
const bassSynthTwo = makeSynths(5);
const bassSynthThree = makeSynths(5);

let randNum;
let noteArray = [];

function base() {
  //I have the problem of having to regenerate the randNum number every time the function is called so I get new chords to play every 4 measures.
  randNum = getRndInteger(0, 2);
  noteArray = bassArrays[randNum];
}

base();

const bassNoteOne = new Tone.Sequence(
  function (time, note) {
    console.log(note);
    console.log(time);
    let rand = Math.floor(Math.random() * 5);
    bassSynthOne[rand].triggerAttackRelease(note, '1m', time);
  },
  noteArray[0],
  '1m'
);

const bassNoteTwo = new Tone.Sequence(
  function (time, note) {
    console.log(note);
    console.log(time);
    let rand = Math.floor(Math.random() * 5);
    bassSynthTwo[rand].triggerAttackRelease(note, '1m', time);
  },
  noteArray[1],
  '1m'
);

const bassNoteThree = new Tone.Sequence(
  function (time, note) {
    console.log(note);
    console.log(time);
    let rand = Math.floor(Math.random() * 5);
    bassSynthThree[rand].triggerAttackRelease(note, '1m', time);
  },
  noteArray[2],
  '1m'
);

const baseNotesLoop = new Tone.Loop(function (time) {
  console.log(time);
  //console.log('Y AHI VA LA TERCERAA!');
  base();
  console.log('NUMBER ' + randNum);
  console.log('NOTES ' + noteArray);
  bassNoteOne.stop(now);
  bassNoteTwo.stop(now);
  bassNoteThree.stop(now);
  bassNoteOne.start(now);
  bassNoteTwo.start(now);
  bassNoteThree.start(now);
}, '4m');

const notes = new Tone.Sequence(
  function (time, note) {
    console.log(time);
    console.log(note);
    randomNotesSynth.triggerAttackRelease(note, '8n', time);
  },
  notitas,
  '4n'
);

/* CANVAS ELEMENT STUFF */

let isPlaying = false;

function setup() {
  createCanvas(640, 480);
}

function windowResized() {}

function draw() {
  background(0);
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  text('MAKAKO', width / 2, height / 2);
}

function mousePressed() {
  if (!isPlaying) {
    console.log('Tone Started');
    Tone.start();
    Tone.Transport.start();
    baseNotesLoop.start(0);
    //notes.start(0);
    isPlaying = true;
  } else {
    console.log('Tone Stop');
    isPlaying = false;
    Tone.Transport.stop();
  }
}
