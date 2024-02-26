const NAMES = [
  'Вика', 'Антон', 'Даша', 'Анастасия', 'Виктор', 'Николай', 'Женя'
];

const COMMENTS = [
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.'
];

const getRandomInteger = (a,b) => {
  const lower = Math.ceil(Math.min(a,b));
  const upper = Math.floor(Math.max(a,b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createCount = () => {
  let count = 0;
  return function () {
    count += 1;
    return count;
  };
};

const idComment = createCount ();
const idPicture = createCount ();

const createObject = () => ({
  id: idComment (),
  avatar: `img/avatar-${getRandomInteger(1,6)}.svg`,
  message: getRandomArrayElement(COMMENTS),
  name: getRandomArrayElement(NAMES),
});

const createPhotoDescription = function () {
  return {
    id: idPicture(),
    url: `photos/${getRandomInteger(1,25)}.jpg`,
    description: 'Смотри, какая фотка',
    likes: getRandomInteger(15, 200),
    comments: Array.from({length: getRandomInteger(0,30)}, createObject),
  };
};

createPhotoDescription();
