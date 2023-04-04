// ThreeJS
const threeCanvas = document.getElementById('threeCanvas');
const threeRenderer = new THREE.WebGLRenderer({ canvas: threeCanvas });
const scene = new THREE.Scene();

// p5js
// const p5Canvas = document.getElementById('p5Canvas');
// const p5Sketch = new p5((p) => {
//     p.setup = () => {
//         p.createCanvas(256,256);
//     };
//     p.draw = () => {
//         p.background(255, 0, 0);
//         p.ellipse(p.mouseX, p.mouseY, 50, 50);
//     };
// });

// Create a new canvas element and set its dimensions
let canvas = document.createElement('canvas');
canvas.width = 1024;
canvas.height = 1024;

// Get the canvas context and draw something on it
let context = canvas.getContext('2d');
context.fillStyle = '#FF0000';
context.fillRect(0, 0, 1024, 1024);
context.font = "80px JetBrainsMono";
context.fillStyle = "white";
context.textAlign = "center";
context.fillText("I'm a Cube", canvas.width/2, canvas.height/2);

// Create a new texture from the canvas element
var texture = new THREE.CanvasTexture(canvas);

let materials = [
    new THREE.MeshBasicMaterial({ color: 0xffff00 }), // right
    new THREE.MeshBasicMaterial({ color: 0xff00ff }), // left
    new THREE.MeshBasicMaterial({ color: 0x00ffff }), // top
    new THREE.MeshBasicMaterial({ color: 0xffffff }), // bottom
    new THREE.MeshBasicMaterial({ map: texture }), // front
    new THREE.MeshBasicMaterial({ color: 0xff000f }) // back
  ];
  //var cubeMaterial = new THREE.MeshFaceMaterial(materials);

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    materials,
  );
  scene.add(mesh);

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

//sizes.width = 800;
//sizes.height = 600;

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

threeRenderer.setSize(sizes.width, sizes.height);
threeRenderer.setClearColor(0xffffff, 0);

const clock = new THREE.Clock();
const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    mesh.rotation.y += 0.01;
    mesh.rotation.z += 0.01;
    threeRenderer.render(scene, camera)
    window.requestAnimationFrame(tick)
};

tick();
