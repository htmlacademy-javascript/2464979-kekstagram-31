import { getArrayPhotos } from './create-array-miniatures.js';
import { getThumbnails, picturesContainer } from './create-thumbnail.js';
import { openBigPicture } from './bigPHOTO.js';

getThumbnails(getArrayPhotos);

picturesContainer.addEventListener('click', (evt) => {
  const currentPhoto = evt.target.closest('.picture');
  const currentPhotoObject = getArrayPhotos.find((photoObject) => photoObject.id === Number(currentPhoto.dataset.photoId));

  if(currentPhoto) {
    openBigPicture(currentPhotoObject);
  }
});
