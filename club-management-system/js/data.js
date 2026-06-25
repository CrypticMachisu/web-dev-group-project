// ============================================
// DATA FILE - Club and Event Information
// Person 1 - Foundation
// ============================================

/**
 * Array of club objects
 * Each club has: id, name, category, description, seedMembers (array)
 */
const clubs = [
    {
        id: 1,
        name: "Tech Innovators Club",
        category: "Technology",
        description: "A community for tech enthusiasts to learn, build, and share innovative projects. We cover AI, Web Development, and Emerging Technologies.",
        seedMembers: ["Alice Johnson", "Bob Smith", "Carol White", "David Brown"]
    },
    {
        id: 2,
        name: "Book Worms Society",
        category: "Literature",
        description: "Monthly book readings and discussions. We explore both classic and contemporary literature from around the world.",
        seedMembers: ["Emma Davis", "Frank Wilson", "Grace Lee", "Henry Adams"]
    },
    {
        id: 3,
        name: "Green Earth Initiative",
        category: "Environment",
        description: "Promoting environmental awareness and sustainable living through community projects, clean-ups, and educational workshops.",
        seedMembers: ["Ivy Green", "Jack Forest", "Kate River", "Leo Mountain"]
    },
    {
        id: 4,
        name: "Chess Masters",
        category: "Gaming",
        description: "Weekly chess tournaments and strategy sessions. All skill levels welcome - from beginners to grandmasters.",
        seedMembers: ["Mike Knight", "Nina Rook", "Oscar Bishop", "Paula Queen"]
    },
    {
        id: 5,
        name: "Fitness Warriors",
        category: "Sports",
        description: "Group workouts, fitness challenges, and health seminars. Let's build a healthier community together!",
        seedMembers: ["Ryan Strong", "Sarah Fit", "Tom Muscle", "Uma Yoga"]
    },
    {
        id: 6,
        name: "Startup Hub",
        category: "Business",
        description: "Connecting entrepreneurs, investors, and mentors. Pitch your ideas, get feedback, and build your startup.",
        seedMembers: ["Victor Venture", "Wendy Capital", "Xavier Founder", "Yvonne Angel"]
    }
];

/**
 * Array of event objects
 * Each event has: id, clubId, title, date, location, description
 */
const events = [
    {
        id: 1,
        clubId: 1,
        title: "AI Workshop: Introduction to Machine Learning",
        date: "2026-07-15 10:00",
        location: "Tech Hub, Room 301",
        description: "A hands-on workshop covering the fundamentals of machine learning. We'll build a simple model using Python and scikit-learn."
    },
    {
        id: 2,
        clubId: 1,
        title: "Web Development Hackathon",
        date: "2026-08-01 09:00",
        location: "Innovation Center",
        description: "24-hour hackathon to build the next big web app. Teams of 3-4 will compete for prizes and mentorship."
    },
    {
        id: 3,
        clubId: 2,
        title: "Book Discussion: 'The Alchemist'",
        date: "2026-07-20 18:30",
        location: "City Library, Meeting Room A",
        description: "Join us for a deep dive into Paulo Coelho's classic. Bring your thoughts and perspectives."
    },
    {
        id: 4,
        clubId: 2,
        title: "Poetry Night",
        date: "2026-08-05 19:00",
        location: "The Literary Cafe",
        description: "Open mic poetry night. Share your own poems or recite your favorites. All are welcome!"
    },
    {
        id: 5,
        clubId: 3,
        title: "Community Clean-Up Drive",
        date: "2026-07-25 08:00",
        location: "Central Park",
        description: "Join us for a morning of cleaning up the park. We'll provide gloves and bags. Help us make our community beautiful!"
    },
    {
        id: 6,
        clubId: 3,
        title: "Sustainable Living Workshop",
        date: "2026-08-10 14:00",
        location: "Green Community Center",
        description: "Learn practical tips for reducing waste, conserving energy, and living more sustainably."
    },
    {
        id: 7,
        clubId: 4,
        title: "Monthly Chess Tournament",
        date: "2026-07-30 10:00",
        location: "Game Board Cafe",
        description: "Monthly tournament open to all skill levels. Prizes for top three finishers. Register by July 28."
    },
    {
        id: 8,
        clubId: 4,
        title: "Chess Strategy Masterclass",
        date: "2026-08-15 18:00",
        location: "Chess Academy",
        description: "A masterclass on advanced chess strategies taught by our club champion. Limited spots available."
    },
    {
        id: 9,
        clubId: 5,
        title: "Morning Fitness Bootcamp",
        date: "2026-07-28 06:30",
        location: "Community Fitness Park",
        description: "High-intensity morning workout. Bring your water bottle and energy! All fitness levels welcome."
    },
    {
        id: 10,
        clubId: 5,
        title: "Health & Wellness Seminar",
        date: "2026-08-20 15:00",
        location: "Health Center Auditorium",
        description: "Learn about nutrition, mental health, and overall wellness from certified health professionals."
    },
    {
        id: 11,
        clubId: 6,
        title: "Startup Pitch Night",
        date: "2026-08-01 19:00",
        location: "Innovation Hub",
        description: "Pitch your startup idea to investors and get real-time feedback. Winners receive mentorship and resources."
    },
    {
        id: 12,
        clubId: 6,
        title: "Networking & Mentorship Mixer",
        date: "2026-08-25 18:00",
        location: "Business Center Lounge",
        description: "Connect with successful entrepreneurs and industry experts. Build your network and find mentors."
    }
];

// Export for use in other files
// For browser, these are globally available
// For Node.js, uncomment:
// module.exports = { clubs, events };