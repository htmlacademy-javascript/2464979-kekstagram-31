import { onUploadClose } from '../form.js';
import { isEscapeKey } from '../util.js';

const elementBody = document.querySelector('body');
const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');

const successElement = successMessage.cloneNode(true);
const errorElement = errorMessage.cloneNode(true);


function onSuccessKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (successElement) {
      document.querySelector('.success').remove();
    }
  }
}

function onErrorKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (errorElement) {
      document.querySelector('.error').remove();
      document.addEventListener('keydown', onUploadClose);
    }
  }
}

function onSuccessClick () {
  document.querySelector('.success').remove();
  document.removeEventListener('click', onSuccessClick);
  document.removeEventListener('keydown', onSuccessKeydown);
}

function onErrorClick() {
  document.querySelector('.error').remove();
  document.removeEventListener('click', onErrorClick);
  document.removeEventListener('keydown', onErrorKeydown);
  document.addEventListener('keydown', onUploadClose);
}

function showSuccessMessage() {
  elementBody.append(successElement);
  document.addEventListener('keydown', onSuccessKeydown);
  document.addEventListener('click', onSuccessClick);
}

function showErrorMessage() {
  elementBody.append(errorElement);
  document.removeEventListener('keydown', onUploadClose);
  document.addEventListener('keydown', onErrorKeydown);
  document.addEventListener('click', onErrorClick);
}

export {showErrorMessage, showSuccessMessage};
