import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/* TODO
    - Canvas as Texture - IN PROGRESS
    - Import Custom Models
    - Trigger 3D Animations
    - 4 botones que triggerean animaciones
    - Generative Ambients
    - Play ToneJS Waveform in screen Texture
    - Play Sound Design layers to make animation sounds
    - 
*/
 
/*----------------------------s------------------------*/

document.querySelector('.play').addEventListener('click', function () {
  console.log('Tone started');
  Tone.start();
  Tone.Transport.start();
});

document.querySelector('.stop').addEventListener('click', function () {
  console.log('Stop Transport');
  Tone.Transport.stop();
});

/*----------------------------------------------------*/
//AUDIO

let ambientOne = new Tone.Player(
  './samples/Backrooms_Ambients-01.wav',
  function () {
    console.log('Ambient 01 is Ready');
  }
);

let ambientTwo = new Tone.Player(
  './samples/Backrooms_Ambients-02.wav',
  function () {
    console.log('Ambient 02 is Ready');
  }
);

/*----------------------------------------------------*/
//Canvas HTML

// Create a new canvas element and set its dimensions
let canvas2d = document.querySelector('canvas.html');
canvas2d.width = 1024;
canvas2d.height = 1024;

// Get the canvas context and draw something on it
let context = canvas2d.getContext('2d');
context.fillStyle = '#FF0000';
context.fillRect(0, 0, 200, 200);
context.font = "80px JetBrainsMono";
context.fillStyle = "white";
context.textAlign = "center";
context.fillText("I'm a Cube", canvas2d.width/2, canvas2d.height/2);

/*----------------------------------------------------*/
// THREE JS
const canvas = document.querySelector('canvas.webgl');

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Cursor
const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener('mousemove', (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.height - 0.5);
});

// Scene
const scene = new THREE.Scene();

// Object
const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
scene.add(mesh);

// Camera
// const camera = new THREE.PerspectiveCamera(
//   75,
//   sizes.width / sizes.height,
//   0.1,
//   100
// );
const aspectRatio = sizes.width / sizes.height;
const camera = new THREE.OrthographicCamera(
  -1 * aspectRatio,
  1 * aspectRatio,
  1,
  -1,
  0.1,
  100
);
camera.position.z = 3;
camera.position.y = 1;
camera.position.x = 2;
camera.lookAt(mesh.position);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
// controls.target.y = 2
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setClearColor(0xffffff, 0);
// Animate
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();
  mesh.rotation.y += 0.01;
  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
