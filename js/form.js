import { isEscapeKey } from './util.js';
import { error, isHashtagValid } from './error.js';
import { showErrorMessage, showSuccessMessage } from './alert.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadOpen = document.querySelector('.img-upload__overlay');
const uploadClose = document.querySelector('.img-upload__cancel');
const uploadFile = document.querySelector('.img-upload__input');
const submitButton = document.querySelector('.img-upload__submit');

const textDescription = document.querySelector('.text__description');
const textHashtags = document.querySelector('.text__hashtags');

function onUploadClose () {
  closePhotoEditor();
}

function onDocumentKeydown (evt) {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    if(document.activeElement === textHashtags || document.activeElement === textDescription) {
      evt.stopPropagation();
    } else {
      uploadForm.reset();
      closePhotoEditor();
    }
  }
}

function closePhotoEditor () {
  uploadOpen.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadClose.removeEventListener('click', onUploadClose);
}

function uploadModal() {
  uploadFile.addEventListener('change', function () {
    uploadOpen.classList.remove('hidden');
    document.body.classList.add('modal-open');
    uploadClose.addEventListener('click', onUploadClose);
    document.addEventListener('keydown', onDocumentKeydown);
  });
}

uploadFile.addEventListener('input', uploadModal);

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

function onHashtagInput () {
  isHashtagValid(textHashtags.value)
} //проверка на ошибку сразу

textHashtags.addEventListener('input', onHashtagInput);

function onFormSubmit (evt) {
  evt.preventDefault();

  if(pristine.validate()) {
    textHashtags.value = textHashtags.trim().replaceAll(/\s+/g, '');
  }
} //каждая непрерывная строка символов пробела заменяется пустой строкой

uploadForm.addEventListener('submit', onFormSubmit);

pristine.addValidator(textHashtags, isHashtagValid, error, 2, false);

//console.log(pristine);

textHashtags.addEventListener('input', () => {
  if (pristine.validate()){
    submitButton.removeAttribute('disabled');
  } else {
    submitButton.setAttribute('disabled','disabled');
  }
});

function blockSubmitButton() {
  submitButton.disabled = true;
  submitButton.textContent = 'Опубликовываю...';
};

function unblockSubmitButton() {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
}

function onSuccess() {
  showSuccessMessage();
  unblockSubmitButton();
  closePhotoEditor();
}

function onFailure() {
  showErrorMessage();
  unblockSubmitButton();
  closePhotoEditor();
}

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    blockSubmitButton();
    sendData(onSuccess, onFailure, new FormData(evt.target));
  }
});

export {onUploadClose};
