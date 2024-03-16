function getRandomInteger(a,b) {
  const lower = Math.ceil(Math.min(a,b));
  const upper = Math.floor(Math.max(a,b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function createCount() {
  let count = 0;
  return function() {
    count += 1;
    return count;
  };
}

/* function isEscapeKey (evt) {
  return evt.key === 'Escape';
} */

//export {getRandomInteger, createCount, isEscapeKey};
export {getRandomInteger, createCount};
