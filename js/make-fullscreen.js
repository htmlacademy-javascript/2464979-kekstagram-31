import { isEscapeKey } from './util';

//const userElement = document.querySelector('.picture__img');
const openFullScreen = document.querySelector('.big-picture');
const cancelFullscreen =  bigPictureElement.querySelector('#picture-cancel');

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
}

function modifyFullScreen (photo) {
  openFullScreen.querySelector('.big-picture__img img').setAttribute('src', photo.url);
  openFullScreen.querySelector('.likes-count').textContent = photo.likes;
  openFullScreen.querySelector('.social__comment-shown-count').textContent = photo.comment-count;
  openFullScreen.querySelector('.social__caption').textContent = photo.description;
}

function openModal () {
  openFullScreen.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  modifyFullScreen();
}

function closeModal () {
  openFullScreen.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
}

cancelFullscreen.addEventListener('click', () => {
  closeModal();
});

export {openModal};
