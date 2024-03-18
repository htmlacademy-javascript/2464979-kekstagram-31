import { bigPicture } from './make-big-photo.js';
import { openBigPicture } from './make-big-photo.js';
import { getArrayPhotos } from './create-array-miniatures.js';

const picturesContainer = document.querySelector('.pictures');
const thumbnailTemplete = document.querySelector('#picture').content.querySelector('.picture');
const thumbnailBox = document.createDocumentFragment();
const commentstBlock = document.querySelector('.social__comments');
const commentPattern = commentstBlock.querySelector('.social__comment');
const coutns = bigPicture.querySelector('.social__comment-count');
const loaders = bigPicture.querySelector('.comments-loader');

const PPORTION_COMMENTS = 5;

const renderCards = (photoObject) => {

  photoObject.forEach((item) => {
    const newThumbnail = thumbnailTemplete.cloneNode(true);

    newThumbnail.querySelector('.picture__img').src = item.url;
    newThumbnail.querySelector('.picture__img').alt = item.description;
    newThumbnail.querySelector('.picture__likes').textContent = item.likes;
    newThumbnail.querySelector('.picture__comments').textContent = item.comments.length;
    newThumbnail.dataset.newThumbnailId = item.id;
    thumbnailBox.appendChild(newThumbnail);

    newThumbnail.addEventListener('click', () => {

      openBigPicture();
      bigPicture.querySelector('.big-picture__img > img').src = newThumbnail.querySelector('.picture__img').src;
      bigPicture.querySelector('.likes-count').textContent = newThumbnail.querySelector('.picture__likes').textContent;
      bigPicture.querySelector('.social__caption').textContent = newThumbnail.querySelector('.picture__img').alt;

      const sameId = getArrayPhotos.find((photoObject)=> photoObject.id === +newThumbnail.dataset.photoId);
      let quantityComments = 0;
      function addPortionComments () {
        quantityComments += PPORTION_COMMENTS;
        let addedComments = 0;
        commentstBlock.innerHTML = '';

        if(sameId){
          for (let i = 0 ; i < quantityComments ; i++) {
            const newComment = commentPattern.cloneNode(true);

            if(quantityComments >= sameId.comments.length){
              bigPicture.querySelector('.comments-loader').classList.add('hidden');
              quantityComments = sameId.comments.length;
            }else{
              bigPicture.querySelector('.comments-loader').classList.remove('hidden');
            }
            newComment.querySelector('.social__picture').src = sameId.comments[i].avatar;
            newComment.querySelector('.social__picture').alt = sameId.comments[i].name;
            newComment.querySelector('.social__text').textContent = sameId.comments[i].message;
            commentstBlock.appendChild(newComment);
            addedComments ++;
            coutns.textContent = `${addedComments} из ${sameId.comments.length} комментариев`;
          }
        }
      }

      addPortionComments();

      loaders.addEventListener('click', addPortionComments);
    });
  });
  picturesContainer.appendChild(thumbnailBox);
};

export { renderCards };
