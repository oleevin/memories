document.addEventListener('DOMContentLoaded', function() {

    // Add event listener to form submission
    document.querySelector('#search').addEventListener('submit', search)
});

function search(e) {
    e.preventDefault();

    // Hide gallery list container
    document.querySelector('#gallery-list').style.display = 'none';

    // Retrive user input
    const searchInput = document.querySelector('#input').value;
    

    // Retrive all images, select all li element with img class
    const images = document.querySelectorAll('li.img');

    // Check if result gallery exist, if does, delete it
    let resultGalleryList = document.querySelector('#result-gallery-list');
    if (resultGalleryList) {
        resultGalleryList.parentNode.removeChild(resultGalleryList);
    }

    // Create New gallery list to hold search results
    resultGalleryList = document.createElement('ul');
    resultGalleryList.classList.add('images');
    resultGalleryList.innerHTML = '';

    // Add id to list, use for removal when people search again
    resultGalleryList.setAttribute('id', 'result-gallery-list')

    // Loop though each li element form query result
    images.forEach((image) => {

        // Retrive image name that inside span element within li element
        const imageName = image.querySelector('span').innerHTML;
        
        // Check if image name contain substring of search input
        if (imageName.toLowerCase().includes(searchInput.toLowerCase())) {

            // Add image that have name matched with search input to gallery list
            const cloneImgNode = image.cloneNode(true);
            
            if (!resultGalleryList.contains(cloneImgNode)) {
                resultGalleryList.appendChild(cloneImgNode);   
            }
            
            document.querySelector('#input').value = '';
        }
    });

    // Display result gallery list
    document.querySelector('#gallery-container').appendChild(resultGalleryList);

    return false;
}

const allImages = document.querySelectorAll(".images .img");
// const allspan = document.querySelectorAll(".images .span");
const lightbox = document.querySelector(".lightbox");
const closeImgBtn = lightbox.querySelector(".close-icon");
const downloadImgBtn = lightbox.querySelector(".uil-import");

const downloadImg = (imgUrl) => {
    // Converting received img to blob, creating its download link, & downloading it
    fetch(imgUrl).then(res => res.blob()).then(blob => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = new Date().getTime();
        a.click();
    }).catch(() => alert("Failed to download image!"));
}


allImages.forEach(img => {
    // Calling showLightBox function with passing clicked img src as argument
    img.addEventListener("click", () => showLightbox(img.querySelector("img")));
});

const showLightbox = (img) => {

    // Showing lightbox and updating img source
    lightbox.querySelector("img").src = img.src;
    lightbox.querySelector("span").innerText = img.parentNode.querySelector('span').innerHTML;
    lightbox.classList.add("show");
    document.body.style.overflow = "hidden";
}

closeImgBtn.addEventListener("click", () => {
    // Hiding lightbox on close icon click
    lightbox.classList.remove("show");
    document.body.style.overflow = "auto";
});

