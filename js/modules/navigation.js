import { querySelector, querySelectorAll } from './utils.js';

export function initNavigation() {
    setupSmoothScrolling();
    setupStickyHeader();
    setupMobileMenu();
}

function setupSmoothScrolling() {
    const navLinks = querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active link
                updateActiveLink(this);
            }
        });
    });
}

function setupStickyHeader() {
    const header = querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            header.classList.add('scrolled');
        } else {
            header.style.boxShadow = 'none';
            header.classList.remove('scrolled');
        }
    });
}

function setupMobileMenu() {
    // Mobile menu toggle (if needed for responsive design)
    const nav = querySelector('nav');
    const menuButton = createElement('button', 'menu-toggle', '☰');
    
    if (window.innerWidth <= 768) {
        nav.style.display = 'none';
        header.appendChild(menuButton);
        
        menuButton.addEventListener('click', () => {
            nav.style.display = nav.style.display === 'none' ? 'block' : 'none';
        });
    }
}

function updateActiveLink(activeLink) {
    const navLinks = querySelectorAll('nav a');
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

export { updateActiveLink };