import { isEscapeKey } from './util.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadOpen = document.querySelector('.img-upload__overlay');
const uploadClose = document.querySelector('.img-upload__cancel');
const uploadFile = document.querySelector('.img-upload__input');

const textDescription = document.querySelector('.text__description');
const textHashtags = document.querySelector('.text__hashtags');

function onUploadClose () {
  closePhotoEditor();
}

function onDocumentKeydown (evt) {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    closePhotoEditor();
   /*  if(document.activeElement === textHashtags || document.activeElement === textDescription) {
      evt.stopPropagation();
    } else {
      uploadForm.reset();
      closePhotoEditor();
    } */
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

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});


const HASHTAG_VALID = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_COUNT = 5;

