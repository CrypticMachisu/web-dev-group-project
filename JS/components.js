// js/components.js
// TEMPORARY STUB — replace with Person 1's real components.js once it lands on main.

function renderNavbar() {
  const el = document.getElementById("navbar");
  if (!el) return;
  el.innerHTML = `
    <nav class="navbar">
      <a href="index.html" class="navbar-brand">Club Platform</a>
      <div class="navbar-links">
        <a href="index.html">Discover</a>
        <a href="my-events.html">My Stuff</a>
        <a href="dashboard.html">Dashboard</a>
      </div>
    </nav>
  `;
}

function renderFooter() {
  const el = document.getElementById("footer");
  if (!el) return;
  el.innerHTML = `<footer class="footer">Club Platform — Web Dev Group Project</footer>`;
}

document.addEventListener("DOMContentLoaded", () => {
  renderNavbar();
  renderFooter();
});
