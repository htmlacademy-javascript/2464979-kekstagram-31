import { getArrayPhotos } from './create-array-miniatures.js';
import { getThumbnails } from './create-thumbnail.js';
import './make-big-photo.js';

getThumbnails(getArrayPhotos);

/* getArrayPhotos.addEventListener('click', (evt) => {
  const currentPhoto = evt.target.closest('.picture');

  if(currentPhoto) {
    openBigPicture(currentPhoto.dataset.photoId);
  }
});
 */
