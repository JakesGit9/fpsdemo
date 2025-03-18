// game.js

let scene, camera, renderer, carController, clock, world, car;
let isDrifting = false;

function init() {
  // Set up Three.js scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87CEEB); // Sky color

  // Set up camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 10, 20);
  camera.lookAt(0, 5, 0);

  // Set up renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Set up physics world (Cannon.js)
  world = new CANNON.World();
  world.gravity.set(0, -9.82, 0); // Gravity

  // Set up the car controller
  carController = new CarController(world);
  car = carController.getCar();

  // Set up the ground plane
  const groundGeometry = new THREE.PlaneGeometry(100, 100);
  const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x228B22, side: THREE.DoubleSide });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);

  // Clock to manage frame updates
  clock = new THREE.Clock();

  // Start the animation loop
  animate();
}

// Game loop (animation)
function animate() {
  requestAnimationFrame(animate);

  // Get the delta time for physics update
  const delta = clock.getDelta();

  // Update the physics world (car and wheels)
  carController.update(delta);

  // Render the scene
  renderer.render(scene, camera);
}

// Listen for key events to control the car
window.addEventListener('keydown', (event) => {
  if (event.key === ' ') {  // Spacebar to start drifting
    isDrifting = true;
    carController.drift(isDrifting);
  }
});

window.addEventListener('keyup', (event) => {
  if (event.key === ' ') {  // Spacebar to stop drifting
    isDrifting = false;
    carController.drift(isDrifting);
  }
});

// Handle window resizing
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

init();
