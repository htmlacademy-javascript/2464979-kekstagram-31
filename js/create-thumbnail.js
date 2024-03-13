const picturesContainer = document.querySelector('.pictures');

const templatePicture = document.querySelector('#picture').content.querySelector('.picture');

function createPhoto (photoData) {
  const photo = templatePicture.cloneNode(true);
  photo.querySelector('.picture__img').src = photoData.url;
  photo.querySelector('.picture__img').alt = photoData.description;
  photo.querySelector('.picture__comments').textContent = photoData.comments.length;
  photo.querySelector('.picture__likes').textContent = photoData.likes;

  return photo;
}

const getThumbnails = (data) => picturesContainer.append(...data.map(createPhoto));

export { getThumbnails };
