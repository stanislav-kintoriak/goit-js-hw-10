// Описаний в документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);

const picturesContainerUl = document.querySelector('.gallery');

// creating markup

const picturesMarkupInUl = createPicturesCardsMarkupForUl(galleryItems);

picturesContainerUl.insertAdjacentHTML('afterbegin', picturesMarkupInUl);

function createPicturesCardsMarkupForUl(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<li>
    <a class="gallery__item" href="${original}">
    <img class="gallery__image" src="${preview}" alt="${description}" 
    />
  </a>
  </li>`;
    })
    .join('');
}

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDElay: 250,
});
