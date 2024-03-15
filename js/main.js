import { getArrayPhotos } from './create-array-miniatures.js';
import { getThumbnails } from './create-thumbnail.js';
import { openBigPicture } from './make-big-photo.js';

getThumbnails(getArrayPhotos);

getThumbnails.addEventListener('click', (evt) => {
  const currentPhoto = evt.target.closest('.picture');

  if(currentPhoto) {
    openBigPicture(currentPhoto.dataset.photoId);
  }
})
