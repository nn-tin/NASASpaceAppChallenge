// Import các modules
import { initNavigation } from './modules/navigation.js';
import { initForm } from './modules/form.js';
import { initGallery } from './modules/gallery.js';
import { initCounters } from './modules/counter.js';
import { projects } from './data/projects.js';
import { createElement, querySelector, showMessage } from './modules/utils.js';

// Main initialization function
function init() {
    console.log('NASA Space App Challenge website initialized!');
    
    // Initialize all modules
    initNavigation();
    initForm();
    initGallery();
    initCounters();
    renderProjects();
    setupButtonEffects();
    
    showMessage('Website loaded successfully!', 'success');
}

// Render projects dynamically
function renderProjects() {
    const projectGrid = querySelector('#projectGrid');
    if (!projectGrid) return;
    
    projectGrid.innerHTML = '';
    
    projects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectGrid.appendChild(projectCard);
    });
}

function createProjectCard(project) {
    const article = createElement('article', 'project-card');
    
    article.innerHTML = `
        <img src="${project.image}" alt="${project.title}">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-technologies">
            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
        <div class="project-links">
            <a href="${project.github}" target="_blank" class="project-link">GitHub</a>
            <a href="${project.demo}" target="_blank" class="project-link">Demo</a>
        </div>
    `;
    
    return article;
}

function setupButtonEffects() {
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Export for potential external use
export { init, renderProjects };