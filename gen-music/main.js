import './style.css';
import * as Tone from 'tone';

console.clear();
console.log('TuVieja');

let audioContext = new AudioContext();

function startLoop(audioBuffer, pan = 0) {
  let sourceNode = audioContext.createBufferSource();
  let pannerNode = audioContext.createStereoPanner();
  sourceNode.buffer = audioBuffer;
  sourceNode.loop = true;
  sourceNode.loopStart = 2.98;
  sourceNode.loopEnd = 5;
  pannerNode.pan.value = pan;
  sourceNode.connect(pannerNode);
  pannerNode.connect(audioContext.destination);
  sourceNode.start(0, 2.98);
}

document.querySelector('.play').addEventListener('click', function () {
  console.log('Play');
  synthone.triggerAttackRelease('C3', '2n');
});

document.querySelector('.sample').addEventListener('click', function () {
  console.log('Sample');
  fetch('sample.ogg')
    .then((response) => response.arrayBuffer())
    .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer))
    .then((audioBuffer) => {
      startLoop(audioBuffer, -1);
      startLoop(audioBuffer, 1);
    })
    .catch((e) => console.error(e));
});

const synthone = new Tone.Synth({
  oscillator: {
    type: 'sine',
  },
  envelope: {
    attack: 1,
    decay: 0.0,
    sustain: 1,
    release: 1,
  },
}).toDestination();
