const SAMPLE_LIBRARY = {
  synth: [
    { note: 'F', octave: 3, file: 'samples/F3.wav' },
    { note: 'Ab', octave: 3, file: 'samples/Ab3.wav' },
    { note: 'C', octave: 4, file: 'samples/C4.wav' },
    { note: 'Db', octave: 4, file: 'samples/Db4.wav' },
    { note: 'Eb', octave: 4, file: 'samples/Eb4.wav' },
    { note: 'F', octave: 4, file: 'samples/F4.wav' },
    { note: 'Ab', octave: 4, file: 'samples/Ab4.wav' },
  ],
};
const OCTAVE = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B',
];

let audioContext = new AudioContext();

function fetchSample(path) {
  return fetch(encodeURIComponent(path))
    .then((response) => response.arrayBuffer())
    .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer));
}

function noteValue(note, octave) {
  return octave * 12 + OCTAVE.indexOf(note);
}

function getNoteDistance(note1, octave1, note2, octave2) {
  return noteValue(note1, octave1) - noteValue(note2, octave2);
}

function getNearestSample(sampleBank, note, octave) {
  let sortedBank = sampleBank.slice().sort((sampleA, sampleB) => {
    let distanceToA = Math.abs(
      getNoteDistance(note, octave, sampleA.note, sampleA.octave)
    );
    let distanceToB = Math.abs(
      getNoteDistance(note, octave, sampleB.note, sampleB.octave)
    );
    return distanceToA - distanceToB;
  });
  return sortedBank[0];
}

function flatToSharp(note) {
  switch (note) {
    case 'Bb':
      return 'A#';
    case 'Db':
      return 'C#';
    case 'Eb':
      return 'D#';
    case 'Gb':
      return 'F#';
    case 'Ab':
      return 'G#';
    default:
      return note;
  }
}

function getSample(instrument, noteAndOctave) {
  let [, requestedNote, requestedOctave] = /^(\w[b\#]?)(\d)$/.exec(
    noteAndOctave
  );
  requestedOctave = parseInt(requestedOctave, 10);
  requestedNote = flatToSharp(requestedNote);
  let sampleBank = SAMPLE_LIBRARY[instrument];
  let sample = getNearestSample(sampleBank, requestedNote, requestedOctave);
  let distance = getNoteDistance(
    requestedNote,
    requestedOctave,
    sample.note,
    sample.octave
  );
  return fetchSample(sample.file).then((audioBuffer) => ({
    audioBuffer: audioBuffer,
    distance: distance,
  }));
}

function playSample(instrument, note) {
  getSample(instrument, note).then(({ audioBuffer, distance }) => {
    let playbackRate = Math.pow(2, distance / 12);
    let bufferSource = audioContext.createBufferSource();
    bufferSource.buffer = audioBuffer;
    bufferSource.playbackRate.value = playbackRate;
    bufferSource.connect(audioContext.destination);
    bufferSource.start();
  });
}

// // Temporary test code
// setTimeout(() => playSample('synth', 'F3'), 1000);
// setTimeout(() => playSample('synth', 'Ab3'), 2000);
// setTimeout(() => playSample('synth', 'C4'), 3000);
// setTimeout(() => playSample('synth', 'Db4'), 4000);
// setTimeout(() => playSample('synth', 'Eb4'), 5000);
// setTimeout(() => playSample('synth', 'F4'), 6000);
// setTimeout(() => playSample('synth', 'Ab4'), 7000);
