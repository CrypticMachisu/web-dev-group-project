// ============================================
// HOME PAGE - Discovery Feed
// Person 2 - Discovery Feed & Club Profile
// ============================================

/**
 * Render all clubs on the page
 * @param {Array} clubsToRender - Array of club objects to display
 */
function renderClubs(clubsToRender) {
    const clubsContainer = document.getElementById('clubs-container');
    if (!clubsContainer) return;
    
    if (!clubsToRender || clubsToRender.length === 0) {
        clubsContainer.innerHTML = `
            <div class="card text-center">
                <p>No clubs found matching your criteria.</p>
            </div>
        `;
        return;
    }
    
    let html = '<div class="grid">';
    clubsToRender.forEach(club => {
        const memberCount = club.seedMembers.length + (isMember(club.id) ? 1 : 0);
        html += `
            <div class="card">
                <h3>${club.name}</h3>
                <span class="category">${club.category}</span>
                <p>${club.description}</p>
                <div class="meta">👥 ${memberCount} members</div>
                <a href="club.html?id=${club.id}" class="btn btn-primary btn-sm">View Club</a>
            </div>
        `;
    });
    html += '</div>';
    
    clubsContainer.innerHTML = html;
}

/**
 * Render all events on the page
 * @param {Array} eventsToRender - Array of event objects to display
 */
function renderEvents(eventsToRender) {
    const eventsContainer = document.getElementById('events-container');
    if (!eventsContainer) return;
    
    if (!eventsToRender || eventsToRender.length === 0) {
        eventsContainer.innerHTML = `
            <div class="card text-center">
                <p>No upcoming events.</p>
            </div>
        `;
        return;
    }
    
    let html = '<div class="grid">';
    const sortedEvents = [...eventsToRender].sort((a, b) => new Date(a.date) - new Date(b.date));
    sortedEvents.forEach(event => {
        const club = getClubById(event.clubId);
        const eventDate = new Date(event.date);
        const formattedDate = eventDate.toLocaleString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        html += `
            <div class="card">
                <h3>${event.title}</h3>
                <div class="meta">
                    <span class="badge badge-primary">${club ? club.name : 'Unknown Club'}</span>
                </div>
                <div class="meta">📅 ${formattedDate}</div>
                <div class="meta">📍 ${event.location}</div>
                <p>${event.description}</p>
                <a href="event.html?id=${event.id}" class="btn btn-success btn-sm">View Event</a>
            </div>
        `;
    });
    html += '</div>';
    
    eventsContainer.innerHTML = html;
}

/**
 * Initialize the home page
 */
function initHome() {
    // Get filter elements
    const categoryFilter = document.getElementById('category-filter');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    
    // Populate category filter
    if (categoryFilter) {
        const categories = [...new Set(clubs.map(c => c.category))];
        categoryFilter.innerHTML = '<option value="">All Categories</option>';
        categories.forEach(cat => {
            categoryFilter.innerHTML += `<option value="${cat}">${cat}</option>`;
        });
    }
    
    // Function to filter and render
    function filterAndRender() {
        const category = categoryFilter ? categoryFilter.value : '';
        const query = searchInput ? searchInput.value.trim() : '';
        
        let filteredClubs = clubs;
        if (category) {
            filteredClubs = getClubsByCategory(category);
        }
        if (query) {
            filteredClubs = searchClubs(query);
        }
        
        renderClubs(filteredClubs);
        renderEvents(getUpcomingEvents());
    }
    
    // Event listeners
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterAndRender);
    }
    if (searchBtn) {
        searchBtn.addEventListener('click', filterAndRender);
    }
    if (searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                filterAndRender();
            }
        });
    }
    
    // Initial render
    filterAndRender();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHome);
} else {
    initHome();
}