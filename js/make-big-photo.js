import { isEscapeKey } from './util.js';
import { getArrayPhotos } from './create-array-miniatures.js';

const bigPicture = document.querySelector ('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture_img img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialComment = bigPicture.querySelector('.social_comments');
const socialCommentTemplate = document.querySelector('.social_comment');
const commentsCaption = bigPicture.querySelector('.social_caption');
const commentsCount = bigPicture.querySelector('.social_comment-count');
const commentsLoader = bigPicture.querySelector('.social_comments-loader');
const closeFullScreen= bigPicture.querySelector('.big-picture_cancel');

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

function closeBigPicture () {
  bigPicture.classList.add('hidden');
  closeFullScreen.removeEventListener('click', onDocumentKeydown);
}

function openBigPicture (photoId) {
  const currentPhoto = getArrayPhotos.find((photo) => photo.id === Number(photoId));
  const socialCommentsFragment = document.createDocumentFragment();

  bigPictureImg.src =currentPhoto.url;
  likesCount.textContent = currentPhoto.likes;
  socialComment.innerHtml = '';

  currentPhoto.comments.forEach((comment) => {
    const socialComment = socialCommentTemplate.cloneNode(true);

    socialComment.querySelector('.social_picture').src = comment.avatar;
    socialComment.querySelector('.social_picture').alt = comment.name;
    socialComment.querySelector('social_text').textContent = comment.message;

    socialCommentsFragment.append(socialComment);
  });
  socialComment.append(socialCommentsFragment);
  commentsCaption.textContent = currentPhoto.description;
  commentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  bigPicture.classList.remove ('hidden');
  closeBigPicture.addEventListener('click', onDocumentKeydown);
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', isEscapeKey);
}

export {openBigPicture};
