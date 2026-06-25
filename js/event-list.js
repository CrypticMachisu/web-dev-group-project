document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("events-container");

  const events = window.events || [];
  const clubs = window.clubs || [];

  let html = "";

  events.forEach(e => {
    const club = clubs.find(c => c.id === e.clubId);

    html += `
      <div class="card">
        <h3>${e.title}</h3>
        <p>Club: ${club ? club.name : "Unknown"}</p>
        <p>${e.date}</p>
        <p>${e.location}</p>

        <!-- VERY IMPORTANT -->
        <a href="event.html?id=${e.id}">
          View Details
        </a>
      </div>
    `;
  });

  container.innerHTML = html;
});