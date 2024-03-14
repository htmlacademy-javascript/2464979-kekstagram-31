import { getArrayPhotos } from './create-array-miniatures.js';
import { getThumbnails } from './create-thumbnail.js';
import { openModal } from './make-fullscreen.js';

getThumbnails(getArrayPhotos);

openModal();
