import { NAMES, COMMENTS } from './data.js';
import { getRandomInteger, createCount } from './util.js';

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const idComment = createCount();
const idPicture = createCount();

function createObject() {
  return {
    id: idComment(),
    avatar: `img/avatar-${getRandomInteger(1,6)}.svg`,
    message: getRandomArrayElement(COMMENTS),
    name: getRandomArrayElement(NAMES),
  };
}

const createPhotoDescription = function() {
  return {
    id: idPicture(),
    url: `photos/${getRandomInteger(1,25)}.jpg`,
    description: 'Смотри, какая фотка',
    likes: getRandomInteger(15, 200),
    comments: Array.from({length: getRandomInteger(0,30)}, createObject),
  };
};

const getArrayPhotos = Array.from({length: 25}, createPhotoDescription);

export {getArrayPhotos};
