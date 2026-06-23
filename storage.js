// ===== STORAGE KEYS =====
const STORAGE_KEYS = {
    SIGNUPS: 'club_signups',
    MEMBERSHIPS: 'club_memberships'
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
  
  // ===== UTILITY FUNCTIONS =====
  function getClubById(clubId) {
    return clubs.find(club => club.id === clubId);
  }
  
  function getEventsForClub(clubId) {
    return events.filter(event => event.clubId === clubId);
  }
  
  function getAllEventsWithClubInfo() {
    return events.map(event => {
      const club = getClubById(event.clubId);
      return {
        ...event,
        clubName: club ? club.name : 'Unknown Club'
      };
    });
  }
  
  function getClubsWithMembershipStatus() {
    return clubs.map(club => ({
      ...club,
      isMember: isMember(club.id)
    }));
  }
  
  function getEventsWithSignupStatus() {
    return getAllEventsWithClubInfo().map(event => ({
      ...event,
      isSignedUp: isSignedUp(event.id)
    }));
  }