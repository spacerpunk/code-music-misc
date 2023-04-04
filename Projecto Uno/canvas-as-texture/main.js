var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("myCanvas") });
renderer.setSize(window.innerWidth, window.innerHeight);

var geometry = new THREE.BoxGeometry(1, 1, 1);
var loader = new THREE.TextureLoader();
var material = new THREE.MeshBasicMaterial({ map: loader.load('./atari.jpg') });

var cube = new THREE.Mesh(geometry, material);

cube.position.set(0, 0, 0);

scene.add(cube);
renderer.render(scene, camera);

var materials = [
    new THREE.MeshBasicMaterial({ color: 0xffffff }), // right
    new THREE.MeshBasicMaterial({ color: 0xffffff }), // left
    new THREE.MeshBasicMaterial({ color: 0xffffff }), // top
    new THREE.MeshBasicMaterial({ color: 0xffffff }), // bottom
    new THREE.MeshBasicMaterial({ map: loader.load('./atari.jpg') }), // front
    new THREE.MeshBasicMaterial({ color: 0xffffff }) // back
  ];
  var cubeMaterial = new THREE.MeshFaceMaterial(materials);
  var cube = new THREE.Mesh(geometry, cubeMaterial);
  
 