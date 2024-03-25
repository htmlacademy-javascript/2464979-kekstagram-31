import { openBigPicture } from './big-photo.js';

const picturesContainer = document.querySelector('.pictures');

const templatePicture = document.querySelector('#picture').content.querySelector('.picture');

function createPhoto (photoData) {
  const photo = templatePicture.cloneNode(true);
  photo.dataset.photoId = photoData.id;
  photo.querySelector('.picture__img').src = photoData.url;
  photo.querySelector('.picture__img').alt = photoData.description;
  photo.querySelector('.picture__comments').textContent = photoData.comments.length;
  photo.querySelector('.picture__likes').textContent = photoData.likes;

  photo.addEventListener('click', (evt) => {
    evt.preventDefault();
    openBigPicture(photoData);
  });

  return photo;
}

const getThumbnails = (data) => picturesContainer.append(...data.map(createPhoto));

export { getThumbnails, picturesContainer };
