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
    }).toDestination();
    synths.push(synth);
  }
  return synths;
}

const pupi = makeSynths(5);

const seq = new Tone.Sequence(function(time,note) {
  console.log(note);
  console.log(time);
  let rand = Math.floor(Math.random() * 5);
  pupi[rand].triggerAttackRelease(note,'8n',time);
}, ['G2','G3','G2','G3','G2','G3'], '8n');

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
    //Tone.Transport.start();
    //seq.start(0);
    polySynth.triggerAttackRelease(['G2','D3','B3'],'1n');
    isPlaying = true;
  } else {
    console.log('Tone Stop');
    isPlaying = false;
    Tone.Transport.stop();
  }
}
