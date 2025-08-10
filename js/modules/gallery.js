import { galleryImages } from '../data/projects.js';
import { createElement, querySelector } from './utils.js';

export function initGallery() {
    renderGallery();
    setupLightbox();
}

function renderGallery() {
    const galleryContainer = querySelector('#imageGallery');
    if (!galleryContainer) return;
    
    galleryContainer.innerHTML = '';
    
    galleryImages.forEach(image => {
        const imgElement = createElement('img');
        imgElement.src = image.src;
        imgElement.alt = image.alt;
        imgElement.title = image.title;
        imgElement.dataset.description = image.description;
        imgElement.style.cursor = 'pointer';
        
        galleryContainer.appendChild(imgElement);
    });
}

function setupLightbox() {
    const galleryImages = document.querySelectorAll('#imageGallery img');
    
    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            openLightbox(img);
        });
    });
}

function openLightbox(imgElement) {
    const lightbox = createElement('div', 'lightbox');
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.8);
        z-index: 9999;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    `;
    
    const img = createElement('img');
    img.src = imgElement.src;
    img.alt = imgElement.alt;
    img.style.cssText = `
        max-width: 90%;
        max-height: 80%;
        border-radius: 10px;
        margin-bottom: 20px;
    `;
    
    const info = createElement('div', 'lightbox-info');
    info.style.cssText = `
        color: white;
        text-align: center;
        max-width: 600px;
        padding: 0 20px;
    `;
    
    const title = createElement('h3', '', imgElement.title);
    const description = createElement('p', '', imgElement.dataset.description);
    
    info.appendChild(title);
    info.appendChild(description);
    
    lightbox.appendChild(img);
    lightbox.appendChild(info);
    
    document.body.appendChild(lightbox);
    
    // Close on click
    lightbox.addEventListener('click', () => {
        document.body.removeChild(lightbox);
    });
    
    // Close on ESC key
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            if (document.body.contains(lightbox)) {
                document.body.removeChild(lightbox);
            }
            document.removeEventListener('keydown', escHandler);
        }
    });
}

export { openLightbox };