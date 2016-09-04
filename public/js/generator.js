importScripts('three.js', 'utility.js');

var CHUNK_SIZE;
var CHUNKS_TO_GENERATE;

function generateBlock(length, color, pos) {
  const blockGeometry = new THREE.BoxGeometry(length, length, length);

  for (var i = 0; i < blockGeometry.faces.length; i++) {
    face = blockGeometry.faces[i];
    face.color.setHex('0x' + color);
  }

  const block = new THREE.Mesh(blockGeometry);
  block.position.set(pos.x, pos.y, pos.z);
  block.updateMatrix();

  return block;
}

function generateChunk(chunkX, chunkY, chunkZ) {
  const chunkGeometry = new THREE.Geometry();
  const chunkMaterial = new THREE.MeshLambertMaterial({
    shading: THREE.SmoothShading,
    vertexColors: THREE.VertexColors
  });

  for (var x = 0; x < CHUNK_SIZE; x++) {
    for (var y = 0; y < CHUNK_SIZE; y++) {
      for (var z = 0; z < CHUNK_SIZE; z++) {
        // const length = getRandomArbitrary(0.1, 1);
        const length = 1;
        const pos = new THREE.Vector3(x, y, z);
        const block = generateBlock(length, getRandomHex(), pos);
        chunkGeometry.merge(block.geometry, block.matrix);
      }
    }
  }

  const chunk = new THREE.Mesh(new THREE.BufferGeometry().fromGeometry(chunkGeometry), chunkMaterial);
  return chunk;
}

function generateWorld(origin) {
  console.log(origin.x, (CHUNKS_TO_GENERATE * CHUNK_SIZE) + origin.x);
  for (var x = origin.x; x < (CHUNKS_TO_GENERATE * CHUNK_SIZE) + origin.x; x++) {
    for (var y = origin.y; y < (CHUNKS_TO_GENERATE * CHUNK_SIZE) + origin.y; y++) {
      for (var z = origin.z; z < (CHUNKS_TO_GENERATE * CHUNK_SIZE) + origin.z; z++) {
        const chunk = generateChunk(x, y, z);
        chunk.position.set(x * CHUNK_SIZE, y * CHUNK_SIZE, z * CHUNK_SIZE);
        chunk.updateMatrix();
        const chunkData = chunk.toJSON();
        postMessage(chunkData);
      }
    }
  }
}

onmessage = function(e) {
  CHUNKS_TO_GENERATE = e.data.WORLD_SIZE;
  CHUNK_SIZE = e.data.CHUNK_SIZE;
  generateWorld(e.data.origin);
}
