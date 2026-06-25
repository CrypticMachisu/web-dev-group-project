document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("clubs-container");

  const joined = getJoinedClubs();

  if (joined.length === 0) {
    container.innerHTML = "<p>You have not joined any clubs.</p>";
    return;
  }

  let html = "";

  joined.forEach(id => {
    const club = window.clubs.find(c => c.id === id);

    if (club) {
      html += `
        <div class="card">
          <h2>${club.name}</h2>
          <p>${club.category}</p>
          <p>${club.description}</p>
        </div>
      `;
    }
  });

  container.innerHTML = html;
});