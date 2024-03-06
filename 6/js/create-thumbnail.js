/* Адрес изображения url подставьте как атрибут src изображения.
Описание изображения description подставьте в атрибут alt изображения.
Количество лайков likes выведите в блок .picture__likes.
Количество комментариев comments выведите в блок .picture__comments */

const picturesContainer = document.querySelector('.pictures');

const templatePicture = document.querySelector('#picture').content.querySelector('.picture');

function createPhoto (photoData) {
  const photo = templatePicture.cloneNode(true);
  photo.querySelector('.picture__img').src = photoData.url;
  photo.querySelector('.picture__img').alt = photoData.description;
  photo.querySelector('.picture__comments').textContent = photoData.comments;
  photo.querySelector('.picture__likes').textContent = photoData.likes;

  return photo;
}

function getThumbnails (data) {
  const createListFragment = document.createDocumentFragment();

  data.forEach(({ url, description, likes, comments }) => {
    createListFragment.append(createPhoto({ url, description, likes, comments }));
  });

  picturesContainer.append(createListFragment);
}

export { getThumbnails };
