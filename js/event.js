document.addEventListener("DOMContentLoaded", () => {

    const container = document.getElementById("event-container");

    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get("id"));

    const event = window.events.find(e => e.id === id);

    if (!event) {
        container.innerHTML = "<p>Event not found.</p>";
        return;
    }

    const club = window.clubs.find(c => c.id === event.clubId);

    container.innerHTML = `
        <div class="card">
            <h2>${event.title}</h2>

            <p><strong>Club:</strong> ${club ? club.name : "Unknown Club"}</p>

            <p><strong>Date:</strong> ${event.date}</p>

            <p><strong>Location:</strong> ${event.location}</p>

            <p>${event.description}</p>
        </div>
    `;
});