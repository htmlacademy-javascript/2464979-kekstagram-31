import { isEscapeKey } from './util.js';

const bigPicture = document.querySelector ('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialComment = bigPicture.querySelector('.social__comments');
const commentsCaption = bigPicture.querySelector('.social__caption');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.social__comments-loader');
const closeFullScreen = bigPicture.querySelector('.big-picture__cancel');

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

closeFullScreen.removeEventListener('keydown', onDocumentKeydown);
closeFullScreen.removeEventListener('click', onDocumentKeydown);

function openBigPicture(picture) {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPictureImg.src = picture.url;
  commentsCaption.textContent = picture.description;
  likesCount.textContent = picture.likes;

  const bigPictureCommentElement = document.querySelector('.social__comment').cloneNode(true);

  while(socialComment.firstChild) {
    socialComment.removeChild(socialComment.firstChild);
  }

  let loadingComments = 0;
  const COMMENTS_PER_PORTION = 5;

  function renderComments() {

    while(socialComment.firstChild) {
      socialComment.removeChild(socialComment.firstChild);
    }
    loadingComments += COMMENTS_PER_PORTION;

    const commentsToShow = Math.min(picture.comments.length, loadingComments);

    picture.comments.forEach((comment, index) => {
      if (index < commentsToShow) {
        const commentElement = bigPictureCommentElement.cloneNode(true);
        commentElement.querySelector('.social__picture').src = comment.avatar;
        commentElement.querySelector('.social__picture').alt = comment.name;
        commentElement.querySelector('.social__text').textContent = comment.message;

        commentsCount.textContent = `${commentsToShow} из ${picture.comments.length} комментариев`;

        if (loadingComments >= picture.comments.length) {
          commentsLoader.classList.add('hidden');
          loadingComments = picture.comments.length;
          commentsLoader.removeEventListener('click', renderComments);
        } else {
          commentsLoader.classList.remove('hidden');
          commentsLoader.addEventListener('click', renderComments);
        }
        socialComment.append(commentElement);
      }
    });
  };

  renderComments();

  closeFullScreen.addEventListener('click', closeBigPicture);

  document.addEventListener('keydown', onDocumentKeydown);
};

export {openBigPicture};
