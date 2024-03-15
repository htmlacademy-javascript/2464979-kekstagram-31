import { isEscapeKey } from './util.js';

const userElement = document.querySelector('body');
const picturesContainer = document.querySelector('.pictures');
const openFullScreen = document.querySelector('.big-picture');
const cancelFullscreen =  document.querySelector('#picture-cancel');

picturesContainer.addEventListener('click', (evt) => {
  if (openFullScreen = evt.target.closest('picture')) {
    openModal(openFullScreen.dataset.idPicture);
  }
});

function modifyFullScreen (photo) {
  openFullScreen.querySelector('.big-picture__img img').url = photo.src;
  openFullScreen.querySelector('.likes-count').textContent = photo.likes;
  openFullScreen.querySelector('.social__comment-shown-count').textContent = photo.comment-count;
  openFullScreen.querySelector('.social__comment-total-count').textContent = photo.comment-total-count;
  openFullScreen.querySelector('.social__caption').textContent = photo.description;
}

function openModal () {
  openFullScreen.classList.remove('hidden');
  userElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  modifyFullScreen();
}

function closeModal () {
  openFullScreen.classList.add('hidden');
  userElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
}

cancelFullscreen.addEventListener('click', () => {
  closeModal();
});


