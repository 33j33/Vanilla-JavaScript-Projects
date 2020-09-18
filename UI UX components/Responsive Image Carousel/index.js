const images = document.querySelectorAll('.image');
const next = document.querySelector('#next');
const prev = document.querySelector('#prev');
const auto = true; // Auto scroll
const intervalTime = 10000;
let imageInterval;

const nextImage = () => {
    // Get current class
    const current = document.querySelector('.current');
    // Remove current class
    current.classList.remove('current');
    // Check for next image if it exists, add current to it
    if (current.nextElementSibling && !current.nextElementSibling.isEqualNode(document.querySelector(".buttons"))) {
        // Add current to next sibling
        current.nextElementSibling.classList.add('current');
    } else {
        // Add current to start
        images[0].classList.add('current');
    }

};

const prevImage = () => {
    // Get current class
    const current = document.querySelector('.current');
    // Remove current class
    current.classList.remove('current');
    // Check for prev image and if it exists then add current class to it
    if (current.previousElementSibling) {
        // Add current to prev sibling
        current.previousElementSibling.classList.add('current');
    } else {
        // Add current to last
        images[images.length - 1].classList.add('current');
    }
};

// Button events
next.addEventListener('click', e => {
    nextImage();
    if (auto) {
        clearInterval(imageInterval);
        imageInterval = setInterval(nextImage, intervalTime);
    }
});

prev.addEventListener('click', e => {
    prevImage();
    if (auto) {
        clearInterval(imageInterval);
        imageInterval = setInterval(nextImage, intervalTime);
    }
});

// Auto scrolling of Images
if (auto) {
    // Run next image at interval time
    imageInterval = setInterval(nextImage, intervalTime);
}
