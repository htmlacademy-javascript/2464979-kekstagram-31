import { isEscapeKey } from './util.js';

const bigPicture = document.querySelector ('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialComment = bigPicture.querySelector('.social__comments');
const socialCommentTemplate = document.querySelector('.social__comment');
const commentsCaption = bigPicture.querySelector('.social__caption');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.social__comments-loader');
const closeFullScreen = bigPicture.querySelector('.big-picture__cancel');

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

function closeBigPicture () {
  bigPicture.classList.add('hidden');
  closeFullScreen.removeEventListener('click', closeBigPicture);
  document.removeEventListener ('keydown', onDocumentKeydown);
}

function openBigPicture (photoObject) {
  const socialCommentsFragment = document.createDocumentFragment();

  bigPictureImg.src = photoObject.url;
  likesCount.textContent = photoObject.likes;
  socialComment.innerHtml = '';

  photoObject.comments.forEach((comment) => {
    const socialCommentsNode = socialCommentTemplate.cloneNode(true);
    socialCommentsNode.querySelector('.social__picture').src = comment.avatar;
    socialCommentsNode.querySelector('.social__picture').alt = comment.name;
    socialCommentsNode.querySelector('.social__text').textContent = comment.message;
    socialCommentsFragment.append(socialCommentsNode);
  });

  socialComment.append(socialCommentsFragment);
  commentsCaption.textContent = photoObject.description;

  commentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  bigPicture.classList.remove ('hidden');

  closeFullScreen.addEventListener('click', closeBigPicture);
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

export {openBigPicture};
