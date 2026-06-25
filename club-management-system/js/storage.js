// ============================================
// STORAGE FILE - Local Storage Management
// Person 1 - Foundation
// ============================================

/**
 * Get all sign-ups from localStorage
 * @returns {Array} Array of sign-up objects { eventId, userId }
 */
function getSignups() {
    const signups = localStorage.getItem('signups');
    return signups ? JSON.parse(signups) : [];
}

/**
 * Save a new sign-up
 * @param {number} eventId - The event ID to sign up for
 */
function saveSignup(eventId) {
    const signups = getSignups();
    // Check if already signed up
    if (signups.some(s => s.eventId === eventId)) {
        return false;
    }
    const userId = 'current-user';
    signups.push({ eventId, userId });
    localStorage.setItem('signups', JSON.stringify(signups));
    return true;
}

/**
 * Check if user is signed up for an event
 * @param {number} eventId - The event ID to check
 * @returns {boolean} True if signed up
 */
function isSignedUp(eventId) {
    const signups = getSignups();
    return signups.some(s => s.eventId === eventId);
}

/**
 * Get all clubs the user has joined
 * @returns {Array} Array of club IDs
 */
function getMyClubs() {
    const myClubs = localStorage.getItem('myClubs');
    return myClubs ? JSON.parse(myClubs) : [];
}

/**
 * Join a club
 * @param {number} clubId - The club ID to join
 * @returns {boolean} True if successfully joined
 */
function joinClub(clubId) {
    const myClubs = getMyClubs();
    if (myClubs.includes(clubId)) {
        return false;
    }
    myClubs.push(clubId);
    localStorage.setItem('myClubs', JSON.stringify(myClubs));
    return true;
}

/**
 * Leave a club
 * @param {number} clubId - The club ID to leave
 * @returns {boolean} True if successfully left
 */
function leaveClub(clubId) {
    let myClubs = getMyClubs();
    const index = myClubs.indexOf(clubId);
    if (index === -1) {
        return false;
    }
    myClubs.splice(index, 1);
    localStorage.setItem('myClubs', JSON.stringify(myClubs));
    return true;
}

/**
 * Check if user is a member of a club
 * @param {number} clubId - The club ID to check
 * @returns {boolean} True if member
 */
function isMember(clubId) {
    const myClubs = getMyClubs();
    return myClubs.includes(clubId);
}

/**
 * Get event details by ID
 * @param {number} eventId - The event ID
 * @returns {object|null} Event object or null if not found
 */
function getEventById(eventId) {
    return events.find(e => e.id === eventId) || null;
}

/**
 * Get club details by ID
 * @param {number} clubId - The club ID
 * @returns {object|null} Club object or null if not found
 */
function getClubById(clubId) {
    return clubs.find(c => c.id === clubId) || null;
}

/**
 * Get events for a specific club
 * @param {number} clubId - The club ID
 * @returns {Array} Array of events for the club
 */
function getEventsForClub(clubId) {
    return events.filter(e => e.clubId === clubId);
}

/**
 * Get all upcoming events (sorted by date)
 * @returns {Array} Array of events sorted by date
 */
function getUpcomingEvents() {
    return [...events].sort((a, b) => new Date(a.date) - new Date(b.date));
}

/**
 * Get clubs by category
 * @param {string} category - The category to filter by
 * @returns {Array} Array of clubs in the category
 */
function getClubsByCategory(category) {
    if (!category) return clubs;
    return clubs.filter(c => c.category === category);
}

/**
 * Search clubs by name or description
 * @param {string} query - The search query
 * @returns {Array} Array of matching clubs
 */
function searchClubs(query) {
    if (!query) return clubs;
    const lowerQuery = query.toLowerCase();
    return clubs.filter(c => 
        c.name.toLowerCase().includes(lowerQuery) ||
        c.description.toLowerCase().includes(lowerQuery) ||
        c.category.toLowerCase().includes(lowerQuery)
    );
}