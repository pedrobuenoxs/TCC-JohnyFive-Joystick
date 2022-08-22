import * as THREE from "./three/three.module.js";
import { GLTFLoader } from "./three/GLTFLoader.js";
import { OrbitControls } from "./three/OrbitControls.js";

var scene, camera, renderer, light, controls, axes, grid, model, box, pivot;
let rotationX = 0,
  rotationY = 0,
  rotationZ = 0;

var socket = io();

const init = () => {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xa0a0a0);

  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.set(0, 150, 750);

  axes = new THREE.AxesHelper(250);

  light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(0, 0, 1);

  scene.add(axes);
  scene.add(camera);
  scene.add(light);

  const loader = new GLTFLoader();
  loader.load(
    "./models/scene.gltf",
    function (gltf) {
      model = gltf.scene;
      scene.add(model);
      box = new THREE.Box3().setFromObject(model);
      box.getCenter(model.position);
      model.position.multiplyScalar(-1);

      pivot = new THREE.Group();
      scene.add(pivot);
      pivot.add(model);
    },
    function (error) {
      console.log(error);
    }
  );
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  controls = new OrbitControls(camera, renderer.domElement);
  animate();
};
init();
let x = 0;
function animate() {
  socket.on("imu", (data) => {
    rotationX = data.imuX;
    rotationY = data.imuY;
    rotationZ = data.imuZ;
  });
  requestAnimationFrame(animate);
  if (pivot) {
    pivot.rotation.set(rotationX, rotationY, rotationZ);
  }
  renderer.render(scene, camera);
}
