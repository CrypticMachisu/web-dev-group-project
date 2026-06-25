// ===== STORAGE KEYS =====
const STORAGE_KEYS = {
  SIGNUPS: 'club_signups',
  MEMBERSHIPS: 'club_memberships',
  CUSTOM_EVENTS: 'club_custom_events',
  ANNOUNCEMENTS: 'club_announcements'
};

// ===== HELPER FUNCTIONS =====
function getStorageData(key) {
  try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
  } catch (error) {
      console.error(`Error reading ${key} from localStorage:`, error);
      return [];
  }
}

function setStorageData(key, data) {
  try {
      localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
      console.error(`Error writing ${key} to localStorage:`, error);
  }
}

// ===== SIGNUP FUNCTIONS =====
function getSignups() {
  return getStorageData(STORAGE_KEYS.SIGNUPS);
}

function saveSignup(eventId) {
  const signups = getSignups();
  if (!signups.includes(eventId)) {
      signups.push(eventId);
      setStorageData(STORAGE_KEYS.SIGNUPS, signups);
      return true;
  }
  return false;
}

function isSignedUp(eventId) {
  const signups = getSignups();
  return signups.includes(eventId);
}

// ===== MEMBERSHIP FUNCTIONS =====
function getMyClubs() {
  return getStorageData(STORAGE_KEYS.MEMBERSHIPS);
}

function joinClub(clubId) {
  const memberships = getMyClubs();
  if (!memberships.includes(clubId)) {
      memberships.push(clubId);
      setStorageData(STORAGE_KEYS.MEMBERSHIPS, memberships);
      return true;
  }
  return false;
}

function leaveClub(clubId) {
  const memberships = getMyClubs();
  const index = memberships.indexOf(clubId);
  if (index !== -1) {
      memberships.splice(index, 1);
      setStorageData(STORAGE_KEYS.MEMBERSHIPS, memberships);
      return true;
  }
  return false;
}

function isMember(clubId) {
  const memberships = getMyClubs();
  return memberships.includes(clubId);
}

// ===== INTERFACE LINKING UTILITIES =====
function getClubById(clubId) {
  return (window.clubs || []).find(club => club.id === clubId);
}

function getClubsWithMembershipStatus() {
  const memberships = getMyClubs();
  return (window.clubs || []).map(club => ({
      ...club,
      isMember: memberships.includes(club.id)
  }));
}

function getAllEventsWithClubInfo() {
  const seedEvents = window.events || [];
  const customEvents = getCustomEvents();
  const allEvents = [...seedEvents, ...customEvents];
  
  return allEvents.map(event => {
      const club = getClubById(event.clubId);
      return {
          ...event,
          clubName: club ? club.name : 'Unknown Club'
      };
  });
}

// ===== DASHBOARD INTEGRATION FUNCTIONS =====
function getCustomEvents() {
  return getStorageData(STORAGE_KEYS.CUSTOM_EVENTS);
}

function addEvent(newEvent) {
  const customEvents = getCustomEvents();
  customEvents.push(newEvent);
  setStorageData(STORAGE_KEYS.CUSTOM_EVENTS, customEvents);
  return true;
}

function updateEvent(eventId, updatedData) {
  const customEvents = getCustomEvents();
  const index = customEvents.findIndex(e => e.id === eventId);
  if (index !== -1) {
      customEvents[index] = { ...customEvents[index], ...updatedData };
      setStorageData(STORAGE_KEYS.CUSTOM_EVENTS, customEvents);
      return true;
  }
  return false;
}

function saveAnnouncement(clubId, text) {
  const announcements = getStorageData(STORAGE_KEYS.ANNOUNCEMENTS);
  const newAnnouncement = {
      id: Date.now(),
      clubId: clubId,
      text: text,
      date: new Date().toISOString()
  };
  announcements.unshift(newAnnouncement); // Newest announcements first
  setStorageData(STORAGE_KEYS.ANNOUNCEMENTS, announcements);
  return true;
}

function getAnnouncements(clubId) {
  const announcements = getStorageData(STORAGE_KEYS.ANNOUNCEMENTS);
  return announcements.filter(a => a.clubId === clubId);
}