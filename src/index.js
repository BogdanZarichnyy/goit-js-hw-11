import { Pixabay } from './pixabay-API';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import templateContentList from './templates/contentList.hbs';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const inputData = document.querySelector('#search-form');
// console.log(inputData);

const listGalleryContent = document.querySelector('.gallery');
// console.log(listGalleryContent);

const buttonLoadContent = document.querySelector('.load-more');
// console.log(loadContent);

const pixabayAPI = new Pixabay();
// console.dir(pixabayAPI);

let pages;
let itemsResidual;

const modal = new SimpleLightbox('.gallery a', {
    // sourceAttr: '',
    captionsData: 'alt',
    captionDelay: 250,
    captionClass: 'gallery__item-image',
});

// console.dir(modal);

// const loadMoreResults = event => {
//     // console.log(event.target);

//     pixabayAPI.page += 1;
    
//     if (pixabayAPI.page > pages) {
//         console.log('We\'re sorry, but you\'ve reached the end of search results.');
//         Notify.failure('We\'re sorry, but you\'ve reached the end of search results.');

//         buttonLoadContent.removeEventListener('click', loadMoreResults);
//         buttonLoadContent.style.display = 'none';

//         return;
//     }

//     if (pixabayAPI.page === pages) {
//         pixabayAPI.per_page = itemsResidual;
//     }

//     pixabayAPI.getContentByInputData()
//         .then(response => {
//             // console.log(response);
            
//             console.log(`Get your results: page №${pixabayAPI.page}`);
//             Notify.success(`Get your results: page №${pixabayAPI.page}`);

//             const { hits, total, totalHits } = response.data;
//             console.log(hits)
//             console.log('total:', total, '; totalHits:', totalHits);

//             if (hits.length === 0) {
//                 console.log('Sorry, there are no images matching your search query. Please try again.');
//                 Notify.failure('Sorry, there are no images matching your search query. Please try again.');

//                 return;
//             }

//             listGalleryContent.insertAdjacentHTML('beforeend', templateContentList(hits));

//             modal.refresh();

//             const { height: cardHeight } = listGalleryContent.firstElementChild.getBoundingClientRect();
//             // console.log(cardHeight);

//             window.scrollBy({
//                 top: cardHeight * 2,
//                 behavior: "smooth",
//             });

//         })
//         .catch(error => console.log(error));
// }

// const initData = async event => {
//     event.preventDefault();
//     // console.dir(event.target);

//     console.log('Input search:', event.target.elements.searchQuery.value);

//     pages = null;
//     itemsResidual = null;
//     listGalleryContent.innerHTML = '';
//     buttonLoadContent.style.display = 'none';

//     pixabayAPI.searchQuery = event.target.elements.searchQuery.value;
//     pixabayAPI.page = 1;
//     pixabayAPI.per_page = 40;

//     // console.dir(pixabayAPI);

//     await pixabayAPI.getContentByInputData()
//         .then(response => {
//             console.log(response)

//             const { hits, total, totalHits } = response.data;
//             console.log(hits);
//             console.log('total:', total, '; totalHits:', totalHits);

//             itemsResidual = totalHits % pixabayAPI.per_page;

//             if (itemsResidual === 0) {
//                 pages = Math.floor(totalHits / pixabayAPI.per_page);
//             } else if (totalHits <= pixabayAPI.per_page) { 
//                 pixabayAPI.per_page = totalHits;
//                 pages = 1;
//             } else {
//                 pages = Math.floor(totalHits / pixabayAPI.per_page) + 1;
//             }

//             console.log('Total pages:', pages);
//             console.log('Total items:', itemsResidual);

//             if (hits.length === 0) {
//                 Notify.failure('Sorry, there are no images matching your search query. Please try again.');
//                 return;
//             } else {
//                 console.log(`Get your results: page №${pixabayAPI.page}`);
//                 Notify.success(`Get your results: page №${pixabayAPI.page}`);

//                 console.log('Hooray! We found totalHits images.');
//                 Notify.success('Hooray! We found totalHits images.');
//             }

//             listGalleryContent.innerHTML = templateContentList(hits);

//             modal.refresh();

//             const { height: cardHeight } = listGalleryContent.firstElementChild.getBoundingClientRect();
//             // console.log(cardHeight);

//             window.scrollBy({
//                 top: cardHeight * 2,
//                 behavior: "smooth",
//             });

//             buttonLoadContent.style.display = 'block';
//             buttonLoadContent.addEventListener('click', loadMoreResults);
//         })
//         .catch(error => console.log(error));
// }

const loadMoreResults = async event => {
    try {
        // console.log(event.target);

        pixabayAPI.page += 1;
    
        if (pixabayAPI.page > pages) {
            console.log('We\'re sorry, but you\'ve reached the end of search results.');
            Notify.failure('We\'re sorry, but you\'ve reached the end of search results.');

            buttonLoadContent.removeEventListener('click', loadMoreResults);
            buttonLoadContent.style.display = 'none';

            return;
        }

        if (pixabayAPI.page === pages) {
            pixabayAPI.per_page = itemsResidual;
        }

        const response = await pixabayAPI.getContentByInputData();
        // console.log(response);
    
        console.log(`Get your results: page №${pixabayAPI.page}`);
        Notify.success(`Get your results: page №${pixabayAPI.page}`);

        const { hits, total, totalHits } = response.data;
        console.log(hits);
        console.log('total:', total, '; totalHits:', totalHits);

        if (hits.length === 0) {
            console.log('Sorry, there are no images matching your search query. Please try again.');
            Notify.failure('Sorry, there are no images matching your search query. Please try again.');

            return;
        }

        listGalleryContent.insertAdjacentHTML('beforeend', templateContentList(hits));

        modal.refresh();

        const { height: cardHeight } = listGalleryContent.firstElementChild.getBoundingClientRect();
        // console.log(cardHeight);

        window.scrollBy({
            top: cardHeight * 2,
            behavior: "smooth",
        });
    }
    catch (error) {
        console.log(error);
    }
}

const initData = async event => {
    try {
        event.preventDefault();
        // console.dir(event.target);

        console.log('Input search:', event.target.elements.searchQuery.value);

        pages = null;
        itemsResidual = null;
        listGalleryContent.innerHTML = '';
        buttonLoadContent.style.display = 'none';

        pixabayAPI.searchQuery = event.target.elements.searchQuery.value;
        pixabayAPI.page = 1;
        pixabayAPI.per_page = 40;

        // console.dir(pixabayAPI);

        const response = await pixabayAPI.getContentByInputData();
        console.log(response)

        const { hits, total, totalHits } = response.data;
        console.log(hits)
        console.log('total:', total, '; totalHits:', totalHits);
        Notify.info(`total: ${total}; totalHits: ${totalHits}`);

        itemsResidual = totalHits % pixabayAPI.per_page;

        if (itemsResidual === 0) {
            pages = Math.floor(totalHits / pixabayAPI.per_page);
        } else if (totalHits <= pixabayAPI.per_page) {
            pixabayAPI.per_page = totalHits;
            pages = 1;
        } else {
            pages = Math.floor(totalHits / pixabayAPI.per_page) + 1;
        }

        console.log('Total pages:', pages);
        console.log('Total items:', itemsResidual);

        if (hits.length === 0) {
            Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            return;
        } else {
            console.log(`Get your results: page №${pixabayAPI.page}`);
            Notify.success(`Get your results: page №${pixabayAPI.page}`);

            console.log(`Hooray! We found ${totalHits} images.`);
            Notify.success(`Hooray! We found ${totalHits} images.`);
        }

        listGalleryContent.innerHTML = templateContentList(hits);

        modal.refresh();

        const { height: cardHeight } = listGalleryContent.firstElementChild.getBoundingClientRect();
        // console.log(cardHeight);

        window.scrollBy({
            top: cardHeight * 2,
            behavior: "smooth",
        });

        buttonLoadContent.style.display = 'block';
        buttonLoadContent.addEventListener('click', loadMoreResults);
    }
    catch (error) {
        console.log(error);
    }
}

inputData.addEventListener('submit', initData);