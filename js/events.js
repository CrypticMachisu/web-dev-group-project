document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("events-container");

  const registered = getRegisteredEvents();

  if (registered.length === 0) {
    container.innerHTML = "<p>No registered events.</p>";
    return;
  }

  let html = "";

  registered.forEach(id => {
    const event = window.events.find(e => e.id === id);

    if (event) {
      html += `
        <div class="card">
          <h2>${event.title}</h2>
          <p>${event.date}</p>
          <p>${event.location}</p>
        </div>
      `;
    }
  });

  container.innerHTML = html;
});