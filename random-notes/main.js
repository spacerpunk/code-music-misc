console.clear()
let volume = -6;
let mouse;
let synth;
let pattern;
let patterNotes = [];
const now = Tone.now();
let loop;

function setup(){
    createCanvas(windowWidth,windowHeight);
    background(0);
    Tone.Master.volume.value = volume;
    const rev = new Tone.Reverb();
    const delay = new Tone.FeedbackDelay(0.125,0.5);
    
    synth = new Tone.Synth({
        oscillator:{
            type: 'triangle',
        },
        envelope:{
            attack: 0.02,
            decay: 0.4,
            sustain: 0.1,
            release: 0.3,
        }
    });
    rev.decay.value = 0.5;
    rev.wet.value = 0.4;
    synth.connect(delay);
    delay.connect(rev);
    rev.toDestination();
    synth.toDestination();
    Tone.Transport.bpm.value = 120;   
}

// On window resize, update the canvas size
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }

function draw(){
    const dim = Math.min(width, height);

    // Instead of drawing black, we draw with
    // transparent black to give a 'ghosting' effect
    const opacity = 0.085;
    background(0, 0, 0, opacity * 255);
    
    // If we have a mouse position, draw it
    if (mouse) {
        noFill();
        stroke(255);
        strokeWeight(dim * 0.01);
        circle(mouse[0], mouse[1], dim * 0.2);
        
        // Clear position so we stop drawing it,
        // this will make it fade away
        mouse = null;
  }
}

function mousePressed(){
    mouse = [mouseX,mouseY];  
    Tone.start();

    //Start playing an array of notes in a ToneJS pattern
    const notes = Tonal.Scale.get("C major").notes;    

    //TODO: Create array with only 3 numbers but of the same lenght of the "notes" array
    const octaves = [2,3,4,2];
    // for(let i=0;i<notes.lenght;i++){
    //     patterNotes[i] = notes[i] + octaves[i]; 
    // }
    
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    loop = new Tone.Loop((time) => {
        console.log(time);
        synth.triggerAttackRelease(notes[getRandomInt(0,notes.length -1)] + octaves[getRandomInt(0,octaves.length - 1)], '8n');
    }, "8n");

    loop.start(0)
    Tone.Transport.start(now);
    
}

function mouseReleased(){
    //Stop playing the ToneJS pattern
     Tone.Transport.stop(now + 1);
} 