const HASHTAG_VALID = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_COUNT = 5;
const MAX_HASHTAG_LENGHT = 20;

let errorMessage = ''; //изменяемая переменная

function error() {
  errorMessage;
} // возвращает ошибку

function isHashtagValid(value) {
  errorMessage = ''; //обнуляем сообщение об ошибке
  const inputText = value.toLowerCase().trim(); // приводим текст к нужному виду

  if(inputText.length === 0) {
    return true;
  } //проверка длины текста

  const inputArray = inputText.split(/\s+/); //удаление лишних пробелов, разбивка строки
  const rules = [
    {
      check: inputArray.some((item) => item === '#'),
      error: 'Хэштег не может состоять только из одной решетки',
    },
    {
      check: inputArray.some((item) => item.slice(1).includes('#')),
      error: 'Хэштеги разделяются пробелами',
    },
    {
      check: inputArray.some((item) => item[0] !== '#'),
      error: 'Хэштег должен начинаться с символа \'#\'',
    },
    {
      check: inputArray.some((item, number, array) => array.includes(item, number + 1)),
      error: 'Хэштеги не должны повторяться',
    },
    {
      check: inputArray.some((item) => HASHTAG_VALID.test(item)),
      error: 'Хэштег содержит недопустимые символы',
    },
    {
      check: inputArray.some((item) => item.length > MAX_HASHTAG_LENGHT),
      error: 'Максимальная длина одного хэштега ${MAX_HASHTAG_LENGHT} символов, включая решетку',
    },
    {
      check: inputArray.length > MAX_HASHTAG_COUNT,
      error: 'Нельзя указывать больше ${MAX_HASHTAG_LENGHT} хэштегов',
    },
  ]; //массив ошибок

  return rules.every((rule) => {
    const isInvalid = rule.check;
    if(isInvalid) {
      errorMessage = rule.error;
    }
    return !isInvalid
  });
} // проверка для каждого элемента массива

export {error, isHashtagValid};
