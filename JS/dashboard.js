const DEMO_CLUB_ID = 1;
let editingEventId = null;

function getClub() {
  return clubs.find((c) => c.id === DEMO_CLUB_ID);
}

function getClubEvents() {
  const seedEvents = events.filter((e) => e.clubId === DEMO_CLUB_ID);
  const customEvents = getCustomEvents().filter((e) => e.clubId === DEMO_CLUB_ID);
  return [...seedEvents, ...customEvents].sort((a, b) => a.date.localeCompare(b.date));
}

function signupCountFor(event) {
  const base = event.seedSignups || 0;
  return base + (isSignedUp(event.id) ? 1 : 0);
}

function renderHeader() {
  const club = getClub();
  document.getElementById("club-name").textContent = club ? `${club.name} — Dashboard` : "Club not found";
  document.getElementById("club-description").textContent = club ? club.description : "";
}

function renderStats() {
  const club = getClub();
  const clubEvents = getClubEvents();
  const totalSignups = clubEvents.reduce((sum, e) => sum + signupCountFor(e), 0);
  
  // FIX: Treat seedMembers as a primitive number, not an array
  const totalMembers = (club?.seedMembers || 0) + (isMember(DEMO_CLUB_ID) ? 1 : 0);

  document.getElementById("stats-row").innerHTML = `
    <div class="stat-card">
      <div class="stat-num">${totalMembers}</div>
      <div class="stat-label">Total Members</div>
    </div>
    <div class="stat-card">
      <div class="stat-num">${clubEvents.length}</div>
      <div class="stat-label">Events Hosted</div>
    </div>
    <div class="stat-card">
      <div class="stat-num">${totalSignups}</div>
      <div class="stat-label">Event Sign-ups</div>
    </div>
  `;
}

function renderEventsList() {
  const clubEvents = getClubEvents();
  const container = document.getElementById("events-list");

  if (clubEvents.length === 0) {
    container.innerHTML = `<p class="empty-state">No events scheduled yet.</p>`;
    return;
  }

  container.innerHTML = clubEvents
    .map((e) => {
      const isCustom = !events.some((seed) => seed.id === e.id);
      return `
      <div class="dashboard-event-item">
        <div>
          <h3>${escapeHtml(e.title)}</h3>
          <span class="event-meta">📅 ${formatDate(e.date)} | 📍 ${escapeHtml(e.location)}</span>
          <p style="margin: 4px 0 0 0; font-size: 0.9rem; color: #555;">${escapeHtml(e.description)}</p>
        </div>
        <div class="event-actions">
          <span class="signup-badge">👥 ${signupCountFor(e)} sign-ups</span>
          ${
            isCustom
              ? `
            <button class="btn btn-secondary btn-sm" data-edit="${e.id}">Edit</button>
            <button class="btn btn-danger btn-sm" data-delete="${e.id}">Delete</button>
          `
              : `<span class="text-muted" style="font-size:0.8rem;">Seed Event</span>`
          }
        </div>
      </div>
    `;
    })
    .join("");

  container.querySelectorAll("[data-edit]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.edit);
      const target = getCustomEvents().find((e) => e.id === id);
      if (target) {
        editingEventId = id;
        document.getElementById("form-heading").textContent = "Edit Event";
        document.getElementById("form-submit-btn").textContent = "Save Changes";
        document.getElementById("form-cancel-btn").removeAttribute("hidden");

        document.getElementById("event-title").value = target.title;
        document.getElementById("event-date").value = target.date;
        document.getElementById("event-location").value = target.location;
        document.getElementById("event-description").value = target.description;
        document.getElementById("event-form").scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  container.querySelectorAll("[data-delete]").forEach((btn) => {
    btn.addEventListener("click", () => {
      if(confirm("Are you sure you want to delete this event?")) {
         deleteEvent(Number(btn.dataset.delete));
         renderAll();
      }
    });
  });
}

function renderMembers() {
  const club = getClub();
  
  // FIX: Generate placeholders safely matching the seed primitive count
  const members = club ? Array.from({ length: club.seedMembers }, (_, i) => `Member #${i + 1}`) : [];
  if (isMember(DEMO_CLUB_ID)) members.push("You");

  document.getElementById("members-list").innerHTML = members
    .map((name) => `<span class="member-chip ${name === "You" ? "is-you" : ""}">${escapeHtml(name)}</span>`)
    .join("");
}

function renderAnnouncements() {
  const list = getAnnouncements(DEMO_CLUB_ID);
  const container = document.getElementById("announcements-list");

  if (list.length === 0) {
    container.innerHTML = `<p class="text-muted" style="font-size:0.9rem;">No announcements posted yet.</p>`;
    return;
  }

  container.innerHTML = list
    .map(
      (a) => `
    <div class="announcement-card" style="background:#fdfdfd; border:1px solid #eee; padding:12px; margin-bottom:10px; border-radius:6px;">
      <p style="margin:0 0 6px 0; font-size:0.95rem;">${escapeHtml(a.text)}</p>
      <small style="color:#888;">Posted on: ${formatDateTime(a.date)}</small>
    </div>
  `
    )
    .join("");
}

function resetForm() {
  editingEventId = null;
  document.getElementById("form-heading").textContent = "Create an event";
  document.getElementById("form-submit-btn").textContent = "Add event";
  document.getElementById("form-cancel-btn").setAttribute("hidden", "true");
  document.getElementById("event-form").reset();
}

function renderAll() {
  renderHeader();
  renderStats();
  renderEventsList();
  renderMembers();
  renderAnnouncements();
}

document.addEventListener("DOMContentLoaded", () => {
  renderAll();
});

document.getElementById("event-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const eventData = {
    clubId: DEMO_CLUB_ID,
    title: document.getElementById("event-title").value.trim(),
    date: document.getElementById("event-date").value,
    location: document.getElementById("event-location").value.trim(),
    description: document.getElementById("event-description").value.trim(),
  };

  if (editingEventId) {
    updateEvent(editingEventId, eventData);
  } else {
    addEvent({ id: Date.now(), seedSignups: 0, ...eventData });
  }

  resetForm();
  renderAll();
});

document.getElementById("form-cancel-btn").addEventListener("click", resetForm);

document.getElementById("announcement-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const textarea = document.getElementById("announcement-text");
  saveAnnouncement(DEMO_CLUB_ID, textarea.value.trim());
  textarea.value = "";
  renderAnnouncements();
});

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function formatDateTime(isoStr) {
  const d = new Date(isoStr);
  if (isNaN(d)) return isoStr;
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" }) + " " + d.toLocaleTimeString(undefined, {hour: '2-digit', minute:'2-digit'});
}