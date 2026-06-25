// ============================================
// CLUB PAGE - Club Profile
// Person 2 - Discovery Feed & Club Profile
// ============================================

/**
 * Get the club ID from URL parameters
 * @returns {number|null} The club ID or null if not found
 */
function getClubIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    return id ? parseInt(id) : null;
}

/**
 * Render the club profile
 */
function renderClubProfile() {
    const clubId = getClubIdFromUrl();
    if (!clubId) {
        document.getElementById('club-content').innerHTML = `
            <div class="card text-center">
                <p>No club ID provided.</p>
                <a href="index.html" class="btn btn-primary">Return to Home</a>
            </div>
        `;
        return;
    }
    
    const club = getClubById(clubId);
    if (!club) {
        document.getElementById('club-content').innerHTML = `
            <div class="card text-center">
                <p>Club not found.</p>
                <a href="index.html" class="btn btn-primary">Return to Home</a>
            </div>
        `;
        return;
    }
    
    // Update page title
    document.title = `${club.name} - ClubHub`;
    
    // Get member count
    const memberCount = club.seedMembers.length + (isMember(clubId) ? 1 : 0);
    const userIsMember = isMember(clubId);
    
    // Render club header
    const clubContent = document.getElementById('club-content');
    let html = `
        <div class="club-header">
            <h1>${club.name}</h1>
            <span class="category">${club.category}</span>
            <p>${club.description}</p>
            <div class="member-count">👥 ${memberCount} members</div>
            <div class="actions">
    `;
    
    if (userIsMember) {
        html += `
                <button onclick="handleLeaveClub(${clubId})" class="btn btn-danger">
                    Leave Club
                </button>
        `;
    } else {
        html += `
                <button onclick="handleJoinClub(${clubId})" class="btn btn-success">
                    Join Club
                </button>
        `;
    }
    
    html += `
            </div>
        </div>
    `;
    
    // Render members section
    html += `
        <h2>Members</h2>
        <div class="card">
            <ul style="list-style: none; padding: 0;">
    `;
    
    club.seedMembers.forEach(member => {
        html += `<li style="padding: 0.3rem 0;">👤 ${member}</li>`;
    });
    
    if (userIsMember) {
        html += `<li style="padding: 0.3rem 0; color: #2ecc71;">✅ You (Current User)</li>`;
    }
    
    html += `
            </ul>
        </div>
    `;
    
    // Render events section
    const clubEvents = getEventsForClub(clubId);
    html += `
        <h2 class="mt-2">Upcoming Events</h2>
    `;
    
    if (clubEvents.length === 0) {
        html += `
            <div class="card text-center">
                <p>No upcoming events for this club.</p>
            </div>
        `;
    } else {
        const sortedEvents = [...clubEvents].sort((a, b) => new Date(a.date) - new Date(b.date));
        html += '<div class="grid">';
        sortedEvents.forEach(event => {
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
                    <div class="meta">📅 ${formattedDate}</div>
                    <div class="meta">📍 ${event.location}</div>
                    <p>${event.description}</p>
                    <a href="event.html?id=${event.id}" class="btn btn-success btn-sm">View Event</a>
                </div>
            `;
        });
        html += '</div>';
    }
    
    clubContent.innerHTML = html;
}

/**
 * Handle joining a club
 * @param {number} clubId - The club ID to join
 */
function handleJoinClub(clubId) {
    const success = joinClub(clubId);
    if (success) {
        showNotification('Successfully joined the club!', 'success');
        renderClubProfile();
    } else {
        showNotification('You are already a member of this club.', 'warning');
    }
}

/**
 * Handle leaving a club
 * @param {number} clubId - The club ID to leave
 */
function handleLeaveClub(clubId) {
    if (confirm('Are you sure you want to leave this club?')) {
        const success = leaveClub(clubId);
        if (success) {
            showNotification('Successfully left the club.', 'info');
            renderClubProfile();
        } else {
            showNotification('You are not a member of this club.', 'warning');
        }
    }
}

/**
 * Show a notification to the user
 * @param {string} message - The message to display
 * @param {string} type - The notification type (success, warning, info, error)
 */
function showNotification(message, type = 'info') {
    // Check if notification container exists
    let container = document.getElementById('notification-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'notification-container';
        container.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            z-index: 1000;
            max-width: 350px;
        `;
        document.body.appendChild(container);
    }
    
    const colors = {
        success: '#2ecc71',
        warning: '#f39c12',
        error: '#e74c3c',
        info: '#3498db'
    };
    
    const notification = document.createElement('div');
    notification.style.cssText = `
        background: white;
        padding: 1rem;
        margin-bottom: 0.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        border-left: 4px solid ${colors[type] || '#3498db'};
        animation: slideIn 0.3s ease;
        display: flex;
        justify-content: space-between;
        align-items: center;
    `;
    
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" style="
            background: none;
            border: none;
            font-size: 1.2rem;
            cursor: pointer;
            color: #999;
            margin-left: 10px;
        ">×</button>
    `;
    
    container.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Add CSS animation for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Make functions globally available
window.handleJoinClub = handleJoinClub;
window.handleLeaveClub = handleLeaveClub;
window.showNotification = showNotification;

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderClubProfile);
} else {
    renderClubProfile();
}