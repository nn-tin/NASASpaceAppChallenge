import { statistics } from '../data/stats.js';
import { animateNumber, querySelectorAll } from './utils.js';

export function initCounters() {
    updateStatistics();
    setupCounterAnimation();
}

function updateStatistics() {
    const stats = document.querySelectorAll('.stat-item');
    const values = Object.values(statistics);
    
    stats.forEach((stat, index) => {
        const h3 = stat.querySelector('h3');
        if (h3 && values[index]) {
            h3.dataset.target = values[index];
        }
    });
}

function setupCounterAnimation() {
    const counters = querySelectorAll('.stat-item h3');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.dataset.target || element.textContent.replace(/[^\d]/g, ''));
    const suffix = element.textContent.replace(/[\d,]/g, '');
    
    animateNumber(element, 0, target, 2000);
    
    // Add suffix back
    const checkForCompletion = setInterval(() => {
        if (parseInt(element.textContent) >= target) {
            element.textContent = target.toLocaleString() + suffix;
            clearInterval(checkForCompletion);
        }
    }, 100);
}

export { animateCounter };