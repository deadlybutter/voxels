const CHUNK_SIZE = 4;
const WORLD_SIZE = 2;

var scene;
var camera;
var renderer;
var stats;
var rendererStats;
var loader;

init();
animate();

function init() {
	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
	camera.position.z = 100;

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

  stats = new Stats();
  document.body.appendChild(stats.dom);
  rendererStats = new THREEx.RendererStats();
  rendererStats.domElement.style.position = 'absolute';
  rendererStats.domElement.style.left = '0px';
  rendererStats.domElement.style.bottom = '0px';
  document.body.appendChild(rendererStats.domElement);

  var ambientLight = new THREE.AmbientLight(0x555555);
  scene.add(ambientLight);
  var light = new THREE.DirectionalLight(0xffffff, 3);
  light.position.set(-200, 80, -100);
  scene.add(light);

  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.target = new THREE.Vector3(0, 0, 0);
  controls.enableDamping = true;
  controls.dampingFactor = 0.15;
  controls.enableZoom = true;
  controls.enablePan = true;
  controls.enableKeys = true;

  loader = new THREE.ObjectLoader();

  // generateWorld(); scene.add(chunk);
  for (var i = 0; i < 2; i++) {
    const generator = new Worker('js/generator.js');
    generator.onmessage = function(chunkData) {
      const chunkObj = loader.parse(chunkData.data);
      scene.add(chunkObj);
    }

    generator.postMessage({
      WORLD_SIZE: WORLD_SIZE,
      CHUNK_SIZE: CHUNK_SIZE,
      origin: {
        x: i * WORLD_SIZE * CHUNK_SIZE,
        y: 0,
        z: 0
      }
    });
  }
  }

function animate() {
	requestAnimationFrame(animate);

	renderer.render(scene, camera);
  stats.update();
  rendererStats.update(renderer);
}
