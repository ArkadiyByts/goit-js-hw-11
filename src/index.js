import { fetchImages as getImages } from './imgfetch';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
//import 'notiflix/dist/notiflix-3.2.5.min.css';

const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.input');
const imageGallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more-btn');

let currentPage;
let remainingImages;

searchForm.addEventListener('submit', initiateNewSearch);
loadMoreBtn.addEventListener('click', loadMoreImg);

function initiateNewSearch(e) {
  e.preventDefault();
  loadMoreBtn.style.display = 'none';
  currentPage = 1;
  imageGallery.innerHTML = '';
  fetchImg();
}

function loadMoreImg() {
  currentPage++;
  fetchImg();
}

function fetchImg() {
    getImages(searchInput.value.trim(), currentPage)
    .then(res => renderImg(res))
    .catch(error => error);
}

function renderImg({ hits, totalHits }) {
  console.log(hits);
  const markup = hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<div class="photo-card">
  <a href="${largeImageURL}"><img class="img" src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${downloads}
    </p>
  </div>
</div>`
    )
    .join('');

  imageGallery.insertAdjacentHTML('beforeend', markup);



  remainingImages = totalHits - currentPage * 40;
  checkingLeftImages();

  if (remainingImages <= 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else if (remainingImages > 0 && remainingImages === totalHits) {
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  } else if (remainingImages > 0 && currentPage === 1) {
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
  }

  const lightbox = new SimpleLightbox('.gallery a');
}

function checkingLeftImages() {
  if (currentPage === 0) {
    loadMoreBtn.style.display = 'none';
  } else {
    loadMoreBtn.style.display = 'block';
  }
}


//const lightbox = new SimpleLightbox('.gallery a',{ captionsData: "alt",captionDelay: "250" });