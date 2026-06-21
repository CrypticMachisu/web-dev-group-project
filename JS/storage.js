// js/storage.js
// TEMPORARY STUB — replace with Person 1's real storage.js once it lands on main.
// Keep these exact function names/signatures so other pages don't need to change.
//
// NOTE FOR PERSON 1: the dashboard needed a few functions beyond the original
// signup/membership contract — getCustomEvents, addEvent, updateEvent,
// deleteEvent, getAnnouncements, saveAnnouncement. Flag these to the group so
// they end up in the real storage.js too.

const SIGNUPS_KEY = "club_platform_signups";
const MEMBERSHIPS_KEY = "club_platform_memberships";
const CUSTOM_EVENTS_KEY = "club_platform_custom_events";
const ANNOUNCEMENTS_KEY = "club_platform_announcements";

function _read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}

function _write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// --- Event sign-ups (original contract) ---
function getSignups() {
  return _read(SIGNUPS_KEY, []);
}

function saveSignup(eventId) {
  const signups = getSignups();
  if (!signups.includes(eventId)) {
    signups.push(eventId);
    _write(SIGNUPS_KEY, signups);
  }
}

function isSignedUp(eventId) {
  return getSignups().includes(eventId);
}

// --- Club memberships (original contract) ---
function getMyClubs() {
  return _read(MEMBERSHIPS_KEY, []);
}

function joinClub(clubId) {
  const myClubs = getMyClubs();
  if (!myClubs.includes(clubId)) {
    myClubs.push(clubId);
    _write(MEMBERSHIPS_KEY, myClubs);
  }
}

function leaveClub(clubId) {
  const myClubs = getMyClubs().filter((id) => id !== clubId);
  _write(MEMBERSHIPS_KEY, myClubs);
}

function isMember(clubId) {
  return getMyClubs().includes(clubId);
}

// --- Dashboard-only additions (new — tell Person 1) ---
function getCustomEvents() {
  return _read(CUSTOM_EVENTS_KEY, []);
}

function addEvent(event) {
  const customEvents = getCustomEvents();
  customEvents.push(event);
  _write(CUSTOM_EVENTS_KEY, customEvents);
}

function updateEvent(eventId, updatedFields) {
  const customEvents = getCustomEvents().map((ev) =>
    ev.id === eventId ? { ...ev, ...updatedFields } : ev
  );
  _write(CUSTOM_EVENTS_KEY, customEvents);
}

function deleteEvent(eventId) {
  const customEvents = getCustomEvents().filter((ev) => ev.id !== eventId);
  _write(CUSTOM_EVENTS_KEY, customEvents);
}

function getAnnouncements(clubId) {
  const all = _read(ANNOUNCEMENTS_KEY, {});
  return all[clubId] || [];
}

function saveAnnouncement(clubId, text) {
  const all = _read(ANNOUNCEMENTS_KEY, {});
  if (!all[clubId]) all[clubId] = [];
  all[clubId].unshift({ text, date: new Date().toISOString() });
  _write(ANNOUNCEMENTS_KEY, all);
}
