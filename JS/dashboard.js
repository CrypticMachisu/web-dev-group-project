// js/dashboard.js
// Person 4 — club dashboard logic.
// Manages a single hardcoded demo club for now (see DEMO_CLUB_ID below).
// Swap this for a real club switcher later only if there's time left.

const DEMO_CLUB_ID = 1;
let editingEventId = null; // null = creating a new event, otherwise editing an existing one

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
  const totalMembers = (club?.seedMembers.length || 0) + (isMember(DEMO_CLUB_ID) ? 1 : 0);

  document.getElementById("stats-row").innerHTML = `
    <div class="stat-card">
      <div class="stat-number">${clubEvents.length}</div>
      <div class="stat-label">Events</div>
    </div>
    <div class="stat-card">
      <div class="stat-number">${totalMembers}</div>
      <div class="stat-label">Members</div>
    </div>
    <div class="stat-card">
      <div class="stat-number">${totalSignups}</div>
      <div class="stat-label">Total sign-ups</div>
    </div>
  `;
}

function renderEvents() {
  const clubEvents = getClubEvents();
  const container = document.getElementById("events-list");

  if (clubEvents.length === 0) {
    container.innerHTML = `<p class="empty-state">No events yet — add your first one above.</p>`;
    return;
  }

  container.innerHTML = clubEvents
    .map((event) => {
      const isCustom = !events.some((seed) => seed.id === event.id);
      return `
        <div class="event-card">
          <div>
            <div class="event-title">${escapeHtml(event.title)}</div>
            <div class="event-meta">${formatDate(event.date)} · ${escapeHtml(event.location)}</div>
          </div>
          <div class="btn-row" style="margin-top:0; align-items:center;">
            <span class="signup-badge">${signupCountFor(event)} signed up</span>
            ${
              isCustom
                ? `<button type="button" class="btn-secondary" data-edit="${event.id}">Edit</button>
                   <button type="button" class="btn-danger" data-delete="${event.id}">Delete</button>`
                : `<span class="event-meta">Seed event</span>`
            }
          </div>
        </div>
      `;
    })
    .join("");

  container.querySelectorAll("[data-edit]").forEach((btn) => {
    btn.addEventListener("click", () => startEditEvent(Number(btn.dataset.edit)));
  });
  container.querySelectorAll("[data-delete]").forEach((btn) => {
    btn.addEventListener("click", () => {
      deleteEvent(Number(btn.dataset.delete));
      renderAll();
    });
  });
}

function renderMembers() {
  const club = getClub();
  const members = club ? [...club.seedMembers] : [];
  if (isMember(DEMO_CLUB_ID)) members.push("You");

  document.getElementById("members-list").innerHTML = members
    .map((name) => `<span class="member-chip ${name === "You" ? "is-you" : ""}">${escapeHtml(name)}</span>`)
    .join("");
}

function renderAnnouncements() {
  const announcements = getAnnouncements(DEMO_CLUB_ID);
  const container = document.getElementById("announcements-list");

  if (announcements.length === 0) {
    container.innerHTML = `<p class="empty-state">No announcements posted yet.</p>`;
    return;
  }

  container.innerHTML = announcements
    .map(
      (a) => `
        <div class="announcement">
          <div>${escapeHtml(a.text)}</div>
          <div class="announcement-date">${formatDateTime(a.date)}</div>
        </div>
      `
    )
    .join("");
}

function renderAll() {
  renderHeader();
  renderStats();
  renderEvents();
  renderMembers();
  renderAnnouncements();
}

function startEditEvent(eventId) {
  const event = getCustomEvents().find((e) => e.id === eventId);
  if (!event) return;

  editingEventId = eventId;
  document.getElementById("event-title").value = event.title;
  document.getElementById("event-date").value = event.date;
  document.getElementById("event-location").value = event.location;
  document.getElementById("event-description").value = event.description;
  document.getElementById("form-heading").textContent = "Edit event";
  document.getElementById("form-submit-btn").textContent = "Update event";
  document.getElementById("form-cancel-btn").hidden = false;
}

function resetForm() {
  editingEventId = null;
  document.getElementById("event-form").reset();
  document.getElementById("form-heading").textContent = "Create an event";
  document.getElementById("form-submit-btn").textContent = "Add event";
  document.getElementById("form-cancel-btn").hidden = true;
}

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

// --- tiny helpers ---
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
  return d.toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

renderAll();
