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
let bpm = 80;
Tone.Transport.bpm.value = bpm;
const timeSignature = [4,4];
Tone.Transport.timeSignature = timeSignature;

//SCALES
const gMajor = Tonal.Scale.get('G major').notes;
const gChord = Tonal.Chord.get('G major').notes;

//INSTRUMENTS
const polySynth = new Tone.PolySynth(Tone.Synth).toDestination();
polySynth.set({
  oscillator: {
    type:'sine'
  },
  envelope: {
    attack:2,
    decay: 4,
    sustain: 1,
    release: 2,
  }
})
polySynth.volume.value = -10;


//EFFECTS
const reverb =  new Tone.Reverb();
const lpFilter = new Tone.Filter();
const mainGain = new Tone.Gain();

//EFFECTS PARAMETERS
reverb.wet.value = 0.7;

//CONNECTIONS
polySynth.connect(reverb);
reverb.connect(lpFilter);
lpFilter.connect(mainGain);
mainGain.toDestination();



console.log(gMajor);
console.log(gChord);

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
        release:1
      }
    }).connect(reverb);
    synth.volume.value = -4
    synths.push(synth);
  }
  return synths;
}

const pupi = makeSynths(5);
const bassSynths = makeSynths(3);

const bassNoteOne = new Tone.Sequence(function(time,note) {
  console.log(note);
  console.log(time);
  let rand = Math.floor(Math.random() * 5);
  pupi[rand].triggerAttackRelease(note,'1m',time);
}, ['G2','B2','E2','C2'], '1m');

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
  text('source', width / 2, height / 2);
}

function mousePressed() {
  if (!isPlaying) {
    console.log('Tone Started');
    Tone.start();
    
    Tone.Transport.start();
    bassNoteOne.start(0);
    //polySynth.triggerAttackRelease(['G2','D3','B3'],'1m');
    isPlaying = true;
  } else {
    console.log('Tone Stop');
    isPlaying = false;
    Tone.Transport.stop();
  }
}
