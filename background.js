import * as THREE from '../MyPortfolio/node_modules/three/build/three.js';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

//scene
const scene = new THREE.Scene();

//camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
camera.position.setZ(30);

//renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

//light
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(20,20,20);

const ambientLight = new THREE.AmbientLight(0xffffff);

//geometry
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({color: 0xFF6347});
const torus = new THREE.Mesh(geometry, material);


//helpers
const pointLightHelper = new THREE.PointLightHelper( pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(pointLightHelper, gridHelper);

//controls
const controls = new OrbitControls(camera, renderer.domElement);

//Textures
// const spaceTexture = new THREE.TextureLoader().load('../img/react.svg');

const spaceTexture = new THREE.TextureLoader().load('../img/galaxy2.avif');
scene.background = spaceTexture;

const avatarCatTexture = new THREE.TextureLoader().load('../img/avatarCat.jpg');
const avatarCat = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map: avatarCatTexture})
);

//scene.add
scene.add(torus);
scene.add(pointLight, ambientLight);
scene.add(avatarCat);

//addStar
function addStar(){
  const geometry = new THREE.SphereGeometry(0.25,24,24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

//animate
function animate(){
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  // torus.rotation.z += 0.01;

  avatarCat.rotation.x += 0.01;
  avatarCat.rotation.y += 0.005;
  avatarCat.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate();





//123
// var texture = new THREE.TextureLoader().load('img/react.svg');

// var geometry = new THREE.BoxGeometry( 200, 200, 200 );
// var material = new THREE.MeshBasicMaterial( { map: texture } );

// cube = new THREE.Mesh( geometry, material );
// scene.add(cube);

// renderer.render(scene, camera);