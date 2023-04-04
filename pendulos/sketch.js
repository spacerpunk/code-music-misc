let masterVolume = -9;
let ready = false;

function setup(){
    createCanvas(windowWidth,windowHeight);
    Tone.Master.volume.value = masterVolume;
}

function windowResized(){
    resizeCanvas(windowWidth,windowHeight);
}

function draw(){
    background(0);

    if (ready) {

    } else { 
        fill(255);
        noStroke();
        textAlign(CENTER,CENTER);
        text("CLICK TO START",width / 2, height / 2);
    }
}


function mousePressed(){
    if(!ready){
        ready = true;
    }
}