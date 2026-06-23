// ===== NAVBAR COMPONENT =====
function createNavbar() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    return `
      <nav class="navbar">
        <div class="container">
          <a href="index.html" class="navbar-brand">ClubHub</a>
          <ul class="navbar-nav">
            <li><a href="index.html" class="${currentPage === 'index.html' ? 'active' : ''}">Home</a></li>
            <li><a href="clubs.html" class="${currentPage === 'clubs.html' ? 'active' : ''}">Clubs</a></li>
            <li><a href="events.html" class="${currentPage === 'events.html' ? 'active' : ''}">Events</a></li>
            <li><a href="my-clubs.html" class="${currentPage === 'my-clubs.html' ? 'active' : ''}">My Clubs</a></li>
          </ul>
        </div>
      </nav>
    `;
  }
  
  // ===== FOOTER COMPONENT =====
  function createFooter() {
    return `
      <footer class="footer">
        <div class="container">
          <span>&copy; ${new Date().getFullYear()} ClubHub. All rights reserved.</span>
          <div>
            <a href="#">About</a> | 
            <a href="#">Contact</a> | 
            <a href="#">Privacy Policy</a>
          </div>
        </div>
      </footer>
    `;
  }
  
  // ===== INJECT COMPONENTS =====
  function injectNavbar() {
    const navbarContainer = document.getElementById('navbar');
    if (navbarContainer) {
      navbarContainer.innerHTML = createNavbar();
    }
  }
  
  function injectFooter() {
    const footerContainer = document.getElementById('footer');
    if (footerContainer) {
      footerContainer.innerHTML = createFooter();
    }
  }
  
  // ===== INITIALIZE COMPONENTS =====
  document.addEventListener('DOMContentLoaded', function() {
    injectNavbar();
    injectFooter();
  });