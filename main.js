import './style.css'
// Importing Stuffs
import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Mesh, MeshToonMaterial } from 'three';

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Scene
const scene = new THREE.Scene();

// Object
const mars = new Mesh(
  new THREE.SphereGeometry(2, 64, 64),
  new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load('images/earth-texture.jpeg'),
  })
);
scene.add(mars);

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
camera.position.z = 5;
scene.add(camera);

// Lights
const light = new THREE.SpotLight(0xffffff, 1);
light.position.set(3, 3, 3);
scene.add(light);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

// Rendering
const canvas = document.querySelector("#bg");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);
renderer.render(scene, camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 2;
controls.minZoom = 2.5;
controls.maxZoom = 4;
scene.background = new THREE.TextureLoader().load('images/background.jpeg');

// Responsive
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
})

// Main Loop
function animate() {
  controls.update();
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

// Mobiles & Tabs
if (window.innerWidth <= 500) {
  mars.scale.set(.4, .4, .4);
}