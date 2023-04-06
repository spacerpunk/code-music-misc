Linkis:

- https://github.com/PleatherStarfish/8BmySVG
- https://hello-magenta.glitch.me/

SKETCH.JS BACKUP
/\*
Make a simple generative composition with Magenta and Tone. Sequence of base.
Arpegiated chords and random melody given a set of
pre composed melodies than can be chosen at random by the system.
All in a p5js simple sketch with 8bits. Keep it simple and sounding nice.

Arrays for chords...
and then construct melody bass and arpegios from them using the index numbers...
bass only takes the [0] index...
arpegios take the [0] [2] [4] primera tercera quinta...
and so on
\*/
console.clear();
let bpm = 80;
Tone.Transport.bpm.value = bpm;
const timeSignature = [4, 4];
Tone.Transport.timeSignature = timeSignature;

//SCALES
const gMajor = Tonal.Scale.get('G major').notes;
const gChord = Tonal.Chord.get('G major').notes;
const bassArrays = [
[
['G2', 'B2', 'E2', 'C2'],
['D2', 'F#3', 'B2', 'G2'],
['B3', 'D4', 'G3', 'E3'],
],
[
['G2', 'B2', 'E2', 'E2'],
['D2', 'F#3', 'B2', 'B2'],
['B3', 'D4', 'G3', 'A4'],
],
[
['D2', 'E2', 'G2', 'C2'],
['A2', 'B3', 'D2', 'G2'],
['F#3', 'G3', 'B3', 'E3'],
],
];
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

console.log(gMajor);
console.log(gChord);

//FUNCTIONS
function getRndInteger(min, max) {
return Math.floor(Math.random() \* (max - min + 1)) + min;
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

function base() {}
const bassNoteOne = new Tone.Sequence(
function (time, note) {
console.log(note);
console.log(time);
let rand = Math.floor(Math.random() \* 5);
bassSynthOne[rand].triggerAttackRelease(note, '1m', time);
},
['G2', 'B2', 'E2', 'C2'],
'1m'
);

const bassNoteTwo = new Tone.Sequence(
function (time, note) {
console.log(note);
console.log(time);
let rand = Math.floor(Math.random() \* 5);
bassSynthTwo[rand].triggerAttackRelease(note, '1m', time);
},
['D2', 'F#3', 'B2', 'G2'],
'1m'
);

const bassNoteThree = new Tone.Sequence(
function (time, note) {
console.log(note);
console.log(time);
let rand = Math.floor(Math.random() \* 5);
bassSynthThree[rand].triggerAttackRelease(note, '1m', time);
},
['B3', 'D4', 'G3', 'E3'],
'1m'
);

const notes = new Tone.Sequence(
function (time, note) {
console.log(time);
console.log(note);
randomNotesSynth.triggerAttackRelease(note, '8n', time);
},
notitas,
'2n'
);

/_ CANVAS ELEMENT STUFF _/

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
text('source', width / 2, height / 2);
}

function mousePressed() {
if (!isPlaying) {
console.log('Tone Started');
Tone.start();
Tone.Transport.start();
bassNoteOne.start(0);
bassNoteTwo.start(0);
bassNoteThree.start(0);
notes.start(0);
//polySynth.triggerAttackRelease(['G2','D3','B3'],'8n');
isPlaying = true;
} else {
console.log('Tone Stop');
isPlaying = false;
Tone.Transport.stop();
}
}
