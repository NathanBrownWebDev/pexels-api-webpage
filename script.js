const log = (arg) => {
    console.log(arg);
}

const heroBackgroundContainer = document.querySelector('.hero-background-container');
const heroImage = document.querySelector('.hero-image');
const heroPhotoArtistLinkContainer = document.querySelector('.hero-photo-artist-link-container');

function appendHeroBackgroundPhoto(imageData){
    heroImage.alt = `${imageData.alt}`;

    if (window.screen.width <= 350){
        heroImage.src = `${imageData.src.medium}`;
        console.log('medium image used');
    } else if (window.screen.width <= 940){
        heroImage.src = `${imageData.src.large}`;
        console.log('large image used');
    } else if (window.screen.width <= 1200){
        heroImage.src = `${imageData.src.landscape}`;
        console.log('landscape image used');
    } else {
        heroImage.src = `${imageData.src.original}`;
        console.log('original image used');
    }
}

function appendHeroArtistLink (imageData){
    heroPhotoArtistLinkContainer.replaceChildren();
    const heroArtistLink = document.createElement('a');
    const linkText = `Photo by: ${imageData.photographer}`;
    heroArtistLink.append(linkText);
    heroArtistLink.href = imageData.photographer_url;
    heroArtistLink.target = '_blank';
    heroArtistLink.style.color = '#e1e1e1';
    heroPhotoArtistLinkContainer.appendChild(heroArtistLink);
}

function getHeroBackgroundPhoto (){
    const randomPhotoId = Math.floor((Math.random() * 11480000) + 1000);
    const photoURL = "https://api.pexels.com/v1/photos/" + randomPhotoId;
    
    fetch(photoURL,{
        headers: {
            Authorization: '563492ad6f91700001000001fc9be9012a224bfab10e2cf3995cc223'
        }
    })
    .then(response => {
        return response.json();
    })
    .then(data => {   
        if(data.status === 404) {
            getHeroBackgroundPhoto();
        } else {
            appendHeroBackgroundPhoto(data);
            appendHeroArtistLink(data);
        }
    })
}
getHeroBackgroundPhoto();

//APPEND CURATED PHOTO GALLERY
const curatedPhotoColumns = document.querySelectorAll('.curated-photo-column');
const animationContainer = document.querySelector('#tabs-loading-animation');
//let photoColumnNumber = 0;

let pexelsCuratedPhotosURL = "https://api.pexels.com/v1/curated?page=1&per_page=12";

function appendCuratedGallery(){
    fetch(pexelsCuratedPhotosURL, {
        headers: {
            Authorization: '563492ad6f91700001000001fc9be9012a224bfab10e2cf3995cc223',
        }
    })
    .then(response => {
        return response.json();
    })
            .then(data => {   
                if(data.status === 404) {
                    
                } else {
                    pexelsCuratedPhotosURL = data.next_page;
                    
                    data.photos.map(function(photo){
                        
                        //photo elements/classes/properties
                        const curatedPhotoContainer = document.createElement('div');
                        curatedPhotoContainer.classList.add('curated-photo-container');
                        const curatedPhotoLink = document.createElement('a');
                        curatedPhotoLink.classList.add('curated-photo-link');
                        curatedPhotoLink.href = photo.url;
                        curatedPhotoLink.alt = photo.alt;
                        curatedPhotoLink.title = photo.alt;
                        const curatedPhoto = document.createElement('img');
                        curatedPhoto.classList.add('curated-photo');
                        //curatedPhoto.loading = 'lazy';
                        
                        //how to load on columns based on screen width
                        if(document.body.clientWidth < 767) {
                            curatedPhoto.src = photo.src.medium;
                            // if(photoColumnNumber === 2) {
                                //     photoColumnNumber = 0;
                                // }
                            } else if (document.body.clientWidth < 1200) {
                                curatedPhoto.src = photo.src.large;
                                // if(photoColumnNumber === 3) {
                                    //     photoColumnNumber = 0;
                                    // }
                                } else {
                                    curatedPhoto.src = photo.src.large;
                                    // if(photoColumnNumber === 4) {
                                        //     photoColumnNumber = 0;
                                        // }
                                    }
                                    //append photo
                                    curatedPhotoLink.appendChild(curatedPhoto);
                                    curatedPhotoContainer.appendChild(curatedPhotoLink);
                                    
                                    //overlay elements
                                    const photoOverlay = document.createElement('div');
                                    photoOverlay.classList.add('photo-overlay');
                                    const artistInfoContainer = document.createElement('div');
                                    artistInfoContainer.classList.add('artist-info-container');
                                    const artistProfilePhoto = document.createElement('img');
                                    artistProfilePhoto.classList.add('artist-profile-photo');
                                    artistProfilePhoto.src = 'images/headshot-place-holder-100.png'; //no access to artist profile pic with pexels api - placeholder img used.
                                    const artistName = document.createElement('a');
                                    artistName.classList.add('artist-name')
                                    artistName.append(photo.photographer);
                                    artistName.href = photo.photographer_url;
                                    const overlayIconsContainer = document.createElement('div');
                                    overlayIconsContainer.classList.add('overlay-icons-container');
                                    overlayIconsContainer.insertAdjacentHTML('beforeend', `
                                    <svg class="overlay-icon" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
                                    <g>
                                    <path d="M72.2,43.2L58,57.4V17c0-2.2-1.8-4-4-4s-4,1.8-4,4v40.4L35.8,43.2c-1.6-1.6-4.1-1.6-5.7,0c-1.6,1.6-1.6,4.1,0,5.7l21,21   C52,70.7,53,71,54,71s2-0.4,2.8-1.2l21-21c1.6-1.6,1.6-4.1,0-5.7C76.3,41.6,73.8,41.6,72.2,43.2z"></path>
                                    <path d="M32,87h44c2.2,0,4-1.8,4-4s-1.8-4-4-4H32c-2.2,0-4,1.8-4,4S29.8,87,32,87z"></path>
                                    </g>
                                    </svg>
                                    <svg class="overlay-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
                                    </svg>
                                    <svg class="overlay-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"></path>
                                    </svg>
                                    `);
                                    //append overlay
                                    artistInfoContainer.append(artistProfilePhoto, artistName);
                                    //overlayIconsContainer.append(overlayIconOne, overlayIconTwo, overlayIconThree);
                                    photoOverlay.append(artistInfoContainer, overlayIconsContainer);
                                    curatedPhotoContainer.appendChild(photoOverlay);
                                    //append all
                                    //let shortestColumn = 0; //array column index
                                    //let minColumnHeight = 0; 

                        let columnHeightsArray = [];                        
                        for (let column of curatedPhotoColumns) {
                            columnHeightsArray.push(column.scrollHeight);
                        }
                        const smallestColumnHeight = Math.min(...columnHeightsArray);
                        const shortestColumnPosition = columnHeightsArray.indexOf(smallestColumnHeight);
                        console.log(smallestColumnHeight + " " + shortestColumnPosition);
                        
                        
                        // for (let i = 0; i < curatedPhotoColumns.length; i++) {
                        //     let columnHeight = curatedPhotoColumns[i].scrollHeight;
                        //     //console.log(`${curatedPhotoColumns[i].className} ${columnHeight}`);
                        //     if (minColumnHeight > columnHeight){
                        //         minColumnHeight = columnHeight;
                        //         shortestColumn = i;
                        //        // console.log(minColumnHeight + " " + shortestColumn);
                        //     } else if(minColumnHeight === columnHeight){
                        //         return;
                        //     } else if (minColumnHeight < columnHeight){
                            //         return;
                            //     }
                            // }
                            //console.log(minColumnHeight + " " + shortestColumn);
                            
                            //Math.min(...curatedPhotoColumns.scrollHeight);
                            curatedPhotoColumns[shortestColumnPosition].appendChild(curatedPhotoContainer);
                            
                            //const loadListener = document.querySelector('.curated-photo-column._one');
                            curatedPhoto.addEventListener('load', () => {
                                animationContainer.style.display = 'none';
                            })
                            //curatedPhotoColumns[photoColumnNumber].appendChild(curatedPhotoContainer);
                            //photoColumnNumber++;
                        }) 
                }
            })
        }
        appendCuratedGallery();
        
        const curatedGallerySelector = document.querySelector('#gallery-selection');
        
        curatedGallerySelector.addEventListener('change', () => {
            if(curatedGallerySelector.value === 'new') {
                for (let column of curatedPhotoColumns) {
                    column.replaceChildren();
                }
                pexelsCuratedPhotosURL = "https://api.pexels.com/v1/curated?page=10&per_page=12";
        appendCuratedGallery();
        log(curatedGallerySelector.value + ' success');
    }
    if(curatedGallerySelector.value === 'trending') {
        for (let column of curatedPhotoColumns) {
            column.replaceChildren();
        }
        pexelsCuratedPhotosURL = "https://api.pexels.com/v1/curated?page=1&per_page=12";
        appendCuratedGallery();
        log(curatedGallerySelector.value + ' success');
    }
})



// window.onresize = function(){
    
//     if (document.body.clientWidth === 766){
//         curatedPhotoColumns.forEach(column => {
//             column.replaceChildren();   
//         })
//         columnNumber = 0;
//         appendCuratedGallery();
//             console.log('app cur gal 760 has run');
//     }
//     if (document.body.clientWidth === 1200){
//         curatedPhotoColumns.forEach(column => {
//             column.replaceChildren();   
//         })
//         columnNumber = 0;
//         appendCuratedGallery();
//             console.log('app cur gal 1200 has run');
//     }
// }


//DISCOVER TAB - COLLECTIONS FEATURE
let pexelsFeaturedURL = 'https://api.pexels.com/v1/collections/featured?page=1&per_page=12';

function featuredCollectionsPexelsRequest (){
    fetch(pexelsFeaturedURL, {
            headers: {
                Authorization: '563492ad6f91700001000001fc9be9012a224bfab10e2cf3995cc223'
            }
        })
            .then(featuredCollectionsResponse => {
                return featuredCollectionsResponse.json();
            })
            .then(data => {   
                if(data.status == 404) {
                    //
                } else {                          
                    pexelsFeaturedURL = data.next_page;

                    data.collections.map(item => {

                         //UNABLE TO FETCH SPECIFIC COLLECTIONS BY ID DUE TO 401. API KEY IS CORRECT.
            //NOT SURE WHY, EMAILED PEXELS 3/22/22 ABOUT 401.
                        let featuredCollectionID = item.id; 
                        

                    // fetch("https://api.pexels.com/v1/collections/" + featuredCollectionID + "?per_page=1",{
                    //     headers: {
                    //         Authorization: '563492ad6f91700001000001fc9be9012a224bfab10e2cf3995cc223'
                    //     }
                    // })
                    //     .then(collectionResponse => {
                    //         return collectionResponse.json();
                    //     })
                    //     .then(collectionData => {
                    //         console.log(collectionData);
                    //     })

                        const featuredCollectionsContainer = document.querySelector('.featured-collections-container');
                    
                        featuredCollectionsContainer.insertAdjacentHTML('beforeend', 
                        `<div class="collection-container">
                            <div class="main-collection-image-container">
                                <img src="images/search-icon-40.png" alt="" class="main-collection-image">
                            </div>
                            <div class="collection-thumbnails">
                                <div class="thumbnail-container">
                                    <img src="images/search-icon-40.png" alt="" class="collection-thumbnail">
                                </div>                    
                                <div class="thumbnail-container">
                                    <img src="images/search-icon-40.png" alt="" class="collection-thumbnail">
                                </div>                    
                                <div class="thumbnail-container">
                                    <img src="images/search-icon-40.png" alt="" class="collection-thumbnail">
                                </div>                    
                                <div class="thumbnail-container">
                                    <img src="images/search-icon-40.png" alt="" class="collection-thumbnail">
                                </div>                    
                            </div>
                            <div class="collection-title-and-count-container">
                                <h3>${item.title}</h3>
                                <div class="count-container">
                                    <p>icon</p> 
                                    <p class="count">${item.media_count}</p>
                                            
                                </div>
                            </div>
                        </div>`);

                        const mainCollectionImage = document.querySelector('.main-collection-image');
                        mainCollectionImage.addEventListener('load', () => {
                            animationContainer.style.display = 'none';
                        })
                    });

            //UNABLE TO FETCH SPECIFIC COLLECTIONS BY ID DUE TO 401. API KEY IS CORRECT.
            //NOT SURE WHY, EMAILED PEXELS 3/22/22 ABOUT 401.
                    // fetch("https://api.pexels.com/v1/collections/" + "e3uq82x" + "?per_page=1",{
                    //     headers: {
                    //         Authorization: '563492ad6f91700001000001fc9be9012a224bfab10e2cf3995cc223'
                    //     }
                    // })
                    //     .then(response => {
                    //         return response.json();
                    //     })
                    //     .then(data => { 
                    //         console.log('2nd fetch worked');
                    //             const featuredCollectionsContainer = document.querySelector('.featured-collections-container');
                                
                    //             console.log(data.media);
                    //             data.media.forEach(imageOrVideo => {
                                    
                    //                 if(imageOrVideo.type === 'Photo'){
                    //                     console.log('i am a photo');
                    //                     const featuredImageContainer = document.createElement('div');
                    //                     const featuredImage = document.createElement('img');
                                        
                    //                     featuredImageContainer.classList.add('featured-image-container');
                    //                     featuredImage.classList.add('featured-image');

                    //                     featuredImage.src = imageOrVideo.src.medium;
                    //                     featuredImageContainer.appendChild(featuredImage);

                    //                     featuredCollectionContainer.appendChild(featuredImageContainer);
                                        
                    //                 }
                    //                 if(imageOrVideo.type === 'Video'){
                    //                     console.log('i am a video');
                    //                     const featuredVideoContainer = document.createElement('div');
                    //                     const featuredVideo = document.createElement('video');
                                        
                    //                     featuredVideoContainer.classList.add('featured-image-container');
                    //                     featuredVideo.classList.add('featured-image');

                    //                     featuredVideo.src = imageOrVideo.src.medium;
                    //                     featuredVideoContainer.appendChild(featuredImage);

                    //                     featuredCollectionContainer.appendChild(featuredVideoContainer);
                    //                 }
                    //             });
                            
                    // })
                }
            })
        }

//featuredCollectionsPexelsRequest();

//APPEND VIDEO SECTION
const popularVideoColumns = document.querySelectorAll('.popular-video-column');
let popularVideoColumNumber = 0;
let pexelsPopularVideosURL = "https://api.pexels.com/videos/popular?page=1&per_page=12";
let videoCount = 0;

function appendPopularVideosGallery(){
    fetch(pexelsPopularVideosURL, {
        headers: {
            Authorization: '563492ad6f91700001000001fc9be9012a224bfab10e2cf3995cc223',
        }
    })
            .then(response => {
                return response.json();
            })
            .then(data => { 
                pexelsPopularVideosURL = data.next_page;
                data.videos.map(function(video){
                     
                    //placeholder image elements      
                    const popularVideoPlaceholderImageContainer = document.createElement('div');
                    popularVideoPlaceholderImageContainer.classList.add('curated-photo-container');
                    const popularVideoLink = document.createElement('a');
                    popularVideoLink.classList.add('curated-photo-link');
                    popularVideoLink.href = video.url;
                    //popularVideoLink.alt = (NO ALT OR TITLE GIVE BY API)
                    const popularVideoPlaceholderImage = document.createElement('video');
                    popularVideoPlaceholderImage.classList.add('curated-photo');
                    popularVideoPlaceholderImage.preload = 'none';
                    popularVideoPlaceholderImage.muted = 'muted';
                    popularVideoPlaceholderImage.poster = video.video_pictures[1].picture;
                    popularVideoPlaceholderImage.src = video.video_files[0].link;


                    const cssPlayButton = document.createElement('div');
                    cssPlayButton.classList.add('play-button');
                    


                    
                    if(popularVideoColumNumber === 4) {
                        popularVideoColumNumber = 0;
                    }
                    
                    //overlay elements
                    const photoOverlay = document.createElement('div');
                    photoOverlay.classList.add('photo-overlay');
                    const artistInfoContainer = document.createElement('div');
                    artistInfoContainer.classList.add('artist-info-container');
                    const artistProfilePhoto = document.createElement('img');
                    artistProfilePhoto.classList.add('artist-profile-photo');
                    artistProfilePhoto.src = 'images/headshot-place-holder-100.png'; //no access to artist profile pic with pexels api - placeholder img used.
                    const artistName = document.createElement('a');
                    artistName.classList.add('artist-name')
                    artistName.append(video.user.name);
                    artistName.href = video.user.url;
                    const overlayIconsContainer = document.createElement('div');
                    overlayIconsContainer.classList.add('overlay-icons-container');
                    overlayIconsContainer.insertAdjacentHTML('beforeend', `
                    <svg class="overlay-icon" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
                        <g>
                        <path d="M72.2,43.2L58,57.4V17c0-2.2-1.8-4-4-4s-4,1.8-4,4v40.4L35.8,43.2c-1.6-1.6-4.1-1.6-5.7,0c-1.6,1.6-1.6,4.1,0,5.7l21,21   C52,70.7,53,71,54,71s2-0.4,2.8-1.2l21-21c1.6-1.6,1.6-4.1,0-5.7C76.3,41.6,73.8,41.6,72.2,43.2z"></path>
                            <path d="M32,87h44c2.2,0,4-1.8,4-4s-1.8-4-4-4H32c-2.2,0-4,1.8-4,4S29.8,87,32,87z"></path>
                        </g>
                        </svg>
                        <svg class="overlay-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
                        </svg>
                    <svg class="overlay-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"></path>
                    </svg>
                    `);
                    //append overlay
                    artistInfoContainer.append(artistProfilePhoto, artistName);
                    photoOverlay.append(artistInfoContainer, overlayIconsContainer);
                    popularVideoLink.append(popularVideoPlaceholderImage, cssPlayButton);
                    
                    popularVideoPlaceholderImageContainer.append(popularVideoLink, photoOverlay);
                    popularVideoColumns[popularVideoColumNumber].appendChild(popularVideoPlaceholderImageContainer);
                    popularVideoColumNumber++;
                    videoCount++;
                    console.log(videoCount);

                    popularVideoPlaceholderImage.addEventListener('mouseenter', ()=>{
                        popularVideoPlaceholderImage.play();
                    })
                    popularVideoPlaceholderImage.addEventListener('mouseout', ()=> {
                        popularVideoPlaceholderImage.pause();
                    })

                    // popularVideoPlaceholderImageContainer.addEventListener('load', () => {
                    //     animationContainer.style.display = 'none';
                    // })
                }) 
                if (videoCount % 12 === 0) {
                    console.log('is this working?')
                    animationContainer.style.display = 'none';
                }
            })
}

//APPEND SEARCH GALLERY



//let searchedVideosURL = `https://api.pexels.com/videos/search?query=${searchValueText}&per_page=12`;

const searchOverlay = document.querySelector('.modal-overlay');
const pageBody = document.body;

function openModal(modal){
    if (modal === null) return;
    modal.classList.add('active');
    searchOverlay.classList.add('active');
    pageBody.style.overflow = 'hidden';
}
function closeModal(modal){
    if (modal === null) return;
    modal.classList.remove('active');
    searchOverlay.classList.remove('active');
    pageBody.style.overflow = 'auto';
}

const searchForms = document.querySelectorAll('.search-form');
const searchBars = document.querySelectorAll('.search-bar');
const modalLoadingAnimation = document.querySelector('#modal-loading-animation')

for (let form of searchForms) {
    form.addEventListener('submit', function(e){
        e.preventDefault();
        let searchValueText = '';

        for (let focus of searchBars) {
            if (focus === document.activeElement){
                searchValueText = focus.value;
            }
        }

        //MODAL POPUP
        const openModalFormData = document.querySelector('[data-open-modal-form]');
        const closeModalButton = document.querySelector('[data-close-modal-button]');       
        
        const searchModal = document.querySelector(openModalFormData.dataset.openModalForm);
        openModal(searchModal);
        
        closeModalButton.addEventListener('click', () => {
            const modal = closeModalButton.closest('.modal-container');
            console.log(modal);
            closeModal(modal);
        })
        searchOverlay.addEventListener('click', () => {
            const modal = document.querySelector('.modal-container.active');
            closeModal(modal);
        })
        
        let searchedPhotosURL = `https://api.pexels.com/v1/search?query=${searchValueText}&per_page=24`;
        const modalHeader = document.querySelector('.modal-header');
        modalHeader.replaceChildren();
        const modalHeaderInfo = document.createTextNode(`${searchValueText} Photos & Videos`);
        modalHeader.appendChild(modalHeaderInfo);

        const modalMediaColumns = document.querySelectorAll('.modal-media-column');
        for (let column of modalMediaColumns) {
            column.replaceChildren();
        }
        let modalColumnNumber = 0;
        modalLoadingAnimation.style.display = 'flex';

        function appendSearchedGallery(){ //(searchURL, mediaType) - properties to use once organizing photos and videos
            fetch(searchedPhotosURL, {
                headers: {
                    Authorization: '563492ad6f91700001000001fc9be9012a224bfab10e2cf3995cc223',
                }
            })
                .then(response => {
                        return response.json();
                    })
                    .then(data => {   
                        if(data.status === 404) {
            
                        } else {
                            searchedPhotosURL = data.next_page;
                            //if mediaType === photos;
                            //modal tab count update
                            const modalTabs = document.querySelectorAll('.modal-tab');
                            for (let tab of modalTabs) {
                                tab.replaceChildren();
                                if (tab.id === 'searched-photos'){
                                    const photoTotalSearchResults = document.createTextNode(`Photos ${data.total_results}`);
                                tab.appendChild(photoTotalSearchResults);
                            }
                            if(tab.id === 'searched-videos'){
                                const videoTotalSearchResults = document.createTextNode(`Videos ${data.total_results}`);
                                    tab.appendChild(videoTotalSearchResults);
                                }   
                            }
                
                        
                            data.photos.map(function(photo){
                            
                                //photo elements/classes/properties
                                const curatedPhotoContainer = document.createElement('div');
                                curatedPhotoContainer.classList.add('curated-photo-container');
                                const curatedPhotoLink = document.createElement('a');
                                curatedPhotoLink.classList.add('curated-photo-link');
                                curatedPhotoLink.href = photo.url;
                                curatedPhotoLink.alt = photo.alt;
                                curatedPhotoLink.title = photo.alt;
                                const curatedPhoto = document.createElement('img');
                                curatedPhoto.classList.add('curated-photo');
                                //curatedPhoto.loading = 'lazy';

                                //how to load on columns based on screen width
                                if(document.body.clientWidth < 767) {
                                    curatedPhoto.src = photo.src.medium;
                                    if(modalColumnNumber === 2) {
                                        modalColumnNumber = 0;
                                    }
                                } else if (document.body.clientWidth < 1200) {
                                    curatedPhoto.src = photo.src.large;
                                    if(modalColumnNumber === 3) {
                                        modalColumnNumber = 0;
                                    }
                                } else {
                                    curatedPhoto.src = photo.src.large;
                                    if(modalColumnNumber === 4) {
                                        modalColumnNumber = 0;
                                        }
                                    }
                                //append photo
                                curatedPhotoLink.appendChild(curatedPhoto);
                                curatedPhotoContainer.appendChild(curatedPhotoLink);

                                //overlay elements
                                const photoOverlay = document.createElement('div');
                                photoOverlay.classList.add('photo-overlay');
                                const artistInfoContainer = document.createElement('div');
                                artistInfoContainer.classList.add('artist-info-container');
                                const artistProfilePhoto = document.createElement('img');
                                artistProfilePhoto.classList.add('artist-profile-photo');
                                artistProfilePhoto.src = 'images/headshot-place-holder-100.png'; //no access to artist profile pic with pexels api - placeholder img used.
                                const artistName = document.createElement('a');
                                artistName.classList.add('artist-name')
                                artistName.append(photo.photographer);
                                artistName.href = photo.photographer_url;
                                const overlayIconsContainer = document.createElement('div');
                                overlayIconsContainer.classList.add('overlay-icons-container');
                                overlayIconsContainer.insertAdjacentHTML('beforeend', `
                                <svg class="overlay-icon" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
                                    <g>
                                        <path d="M72.2,43.2L58,57.4V17c0-2.2-1.8-4-4-4s-4,1.8-4,4v40.4L35.8,43.2c-1.6-1.6-4.1-1.6-5.7,0c-1.6,1.6-1.6,4.1,0,5.7l21,21   C52,70.7,53,71,54,71s2-0.4,2.8-1.2l21-21c1.6-1.6,1.6-4.1,0-5.7C76.3,41.6,73.8,41.6,72.2,43.2z"></path>
                                        <path d="M32,87h44c2.2,0,4-1.8,4-4s-1.8-4-4-4H32c-2.2,0-4,1.8-4,4S29.8,87,32,87z"></path>
                                    </g>
                                </svg>
                                <svg class="overlay-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
                                </svg>
                                <svg class="overlay-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"></path>
                                </svg>
                                `);
                                //append overlay
                                artistInfoContainer.append(artistProfilePhoto, artistName);
                                photoOverlay.append(artistInfoContainer, overlayIconsContainer);
                                curatedPhotoContainer.appendChild(photoOverlay);
                                //append all
                                modalMediaColumns[modalColumnNumber].appendChild(curatedPhotoContainer);
                                modalColumnNumber++;

                                curatedPhoto.addEventListener('load', ()=> {
                                    modalLoadingAnimation.style.display = 'none';
                                })
                            }) 
                        }
                    })
        }
        appendSearchedGallery();
        const loadMoreButtonForSearches = document.querySelector('#load-more-button-for-searches');
        loadMoreButtonForSearches.addEventListener('click', () => {
            modalLoadingAnimation.style.display = 'flex';
            appendSearchedGallery();
            console.log('button working');
        })
    })
}





// if (modal tab active === photos) {
    //     appendSearchedGallery(searchedPhotosURL, photos);
    // } else if (modal tab active === videos) {
        //     appendCuratedGallery(searchedVideosURL);
        // }
// -------------------------------------------------------
//TAB&CONTENT SELECTOR
const loadMoreButton = document.querySelector('#load-more-button-for-tabs');

const tabs = document.querySelectorAll('.tabs-container__link');
let discoverTabClickCount = 0;
let videosTabClickCount = 0;

function setSectionActive(element) {
    const contentContainers = document.querySelectorAll('.content-container');

    for (let container of contentContainers) {
        container.classList.remove('js-active-content');
    }
    let selectedContent = document.getElementById(element.textContent.trim());
    selectedContent.classList.add('js-active-content');
    

    for (let tab of tabs) {
        tab.classList.remove('js-active-tab');
    }
    element.classList.add('js-active-tab'); 
}

for (let tab of tabs) {
    tab.addEventListener('click', function(clickedElement){
        setSectionActive(clickedElement.currentTarget);

        if(tab.className === "tabs-container__link _home js-active-tab"){ //keeps video tab from loading collections until the tab is clicked
            console.log('home tab clicked');
            loadMoreButton.style.display = "block";
        } 
        if(tab.className === "tabs-container__link _discover js-active-tab"){ //keeps discover tab from loading collections until the tab is clicked
            console.log('discover tab clicked');
            if(discoverTabClickCount === 0){  //keeps discover tab from running function each time tab is clicked
                animationContainer.style.display = 'flex';
                featuredCollectionsPexelsRequest();
                loadMoreButton.style.display = "block";
                discoverTabClickCount++;
            }  
        }
        if(tab.className === "tabs-container__link _videos js-active-tab"){ //keeps video tab from loading collections until the tab is clicked
            console.log('video tab clicked');
            if(videosTabClickCount === 0){  //keeps video tab from running function each time tab is clicked
                animationContainer.style.display = 'flex';
                appendPopularVideosGallery();
                loadMoreButton.style.display = "block";
                videosTabClickCount++;
            }  
        }
        if(tab.className === "tabs-container__link _leaderboard js-active-tab" || tab.className === "tabs-container__link _challenges js-active-tab"){   
            loadMoreButton.style.display = "none";
        }
        // if(tab.className === "tabs-container__link _challenges js-active-tab"){ 
            
        //     loadMoreButton.style.display = "none";
        // } 
    })
}

//NAV BAR CHANGES WHEN SCROLLED
const navHeader = document.querySelector('.nav-bar');
const homeHeroContainer = document.querySelector('.observer-container');
const headerSearchFormContainer = document.querySelector('.header-search-form-container');
const sectionOneOptions = {
  rootMargin: "-350px 0px 0px 0px"
};

const navBarObserver = new IntersectionObserver(function(entries, sectionOneObserver){
  entries.forEach(entry => {
    if(!entry.isIntersecting) {
      navHeader.classList.add('navbar-scrolled');
      headerSearchFormContainer.style.opacity = '1';
    } else {
      navHeader.classList.remove('navbar-scrolled');
      headerSearchFormContainer.style.opacity = '0';
    }
  });
}, sectionOneOptions);

navBarObserver.observe(homeHeroContainer);

//LOADING ANIMATION
    //animationContainer.parentElement.removeChild(animationContainer);

//LOAD MORE MEDIA BUTTON
loadMoreButton.addEventListener('click', function(){
    for (let tab of tabs) {
        
        if(tab.className === "tabs-container__link _home js-active-tab"){
            animationContainer.style.display = 'flex';
            appendCuratedGallery();
        } 
        if(tab.className === "tabs-container__link _discover js-active-tab"){
            animationContainer.style.display = 'flex';
            featuredCollectionsPexelsRequest();
        }
        if(tab.className === "tabs-container__link _videos js-active-tab"){
            animationContainer.style.display = 'flex';
            appendPopularVideosGallery();
        }
       
    }           
})

