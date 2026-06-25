// ============================================
// COMPONENTS FILE - Shared UI Components
// Person 1 - Foundation
// ============================================

/**
 * Inject the navbar into the page
 */
function injectNavbar() {
    const navbar = document.createElement('nav');
    navbar.className = 'navbar';
    navbar.innerHTML = `
        <div class="container">
            <a href="index.html" class="brand">
                <span>🏛️</span> Club<span>Hub</span>
            </a>
            <div class="nav-links">
                <a href="index.html" class="${window.location.pathname.includes('index') ? 'active' : ''}">Home</a>
                <a href="my-events.html" class="${window.location.pathname.includes('my-events') ? 'active' : ''}">My Events</a>
                <a href="dashboard.html" class="${window.location.pathname.includes('dashboard') ? 'active' : ''}">Dashboard</a>
            </div>
        </div>
    `;
    
    // Insert at the top of the body
    document.body.insertBefore(navbar, document.body.firstChild);
}

/**
 * Inject the footer into the page
 */
function injectFooter() {
    const footer = document.createElement('footer');
    footer.className = 'footer';
    footer.innerHTML = `
        <div class="container">
            <p>&copy; 2026 ClubHub - Community Club Management System</p>
            <div class="social-links">
                <a href="#">Twitter</a>
                <a href="#">GitHub</a>
                <a href="#">LinkedIn</a>
            </div>
        </div>
    `;
    
    document.body.appendChild(footer);
}

/**
 * Initialize all components
 */
function initComponents() {
    injectNavbar();
    injectFooter();
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initComponents);
} else {
    initComponents();
}