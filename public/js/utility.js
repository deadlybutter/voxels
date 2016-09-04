// http://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// http://www.paulirish.com/2009/random-hex-color-code-snippets/
function getRandomHex() {
  return Math.floor(Math.random()*16777215).toString(16);
}

// function convertBackToType(current, type) {
//   type.
// }
