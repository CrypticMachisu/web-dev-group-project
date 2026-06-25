// ===== CLUB DATA =====
const clubs = [
    {
      id: 1,
      name: "Chess Club",
      category: "Games",
      description: "Learn and play chess with fellow enthusiasts. All skill levels welcome!",
      seedMembers: 15
    },
    {
      id: 2,
      name: "Book Club",
      category: "Literature",
      description: "Monthly book discussions, reading challenges, and literary events.",
      seedMembers: 22
    },
    {
      id: 3,
      name: "Photography Club",
      category: "Arts",
      description: "Explore photography techniques, share work, and go on photo walks.",
      seedMembers: 10
    },
    {
      id: 4,
      name: "Coding Club",
      category: "Technology",
      description: "Collaborate on coding projects, learn new technologies, and compete in hackathons.",
      seedMembers: 30
    },
    {
      id: 5,
      name: "Yoga Club",
      category: "Wellness",
      description: "Weekly yoga sessions, meditation, and wellness workshops.",
      seedMembers: 18
    },
    {
      id: 6,
      name: "Music Club",
      category: "Arts",
      description: "Jam sessions, music theory, and performance opportunities.",
      seedMembers: 25
    }
  ];
  
  // ===== EVENT DATA =====
  const events = [
    {
      id: 1,
      clubId: 1,
      title: "Chess Tournament",
      date: "2026-07-15",
      location: "Room 101",
      description: "Annual chess tournament open to all club members. Prizes for top 3!"
    },
    {
      id: 2,
      clubId: 1,
      title: "Chess Workshop: Opening Strategies",
      date: "2026-07-22",
      location: "Room 101",
      description: "Learn powerful opening strategies from our expert members."
    },
    {
      id: 3,
      clubId: 2,
      title: "Book Discussion: '1984'",
      date: "2026-07-20",
      location: "Library Meeting Room",
      description: "Join us for a deep discussion of Orwell's classic dystopian novel."
    },
    {
      id: 4,
      clubId: 3,
      title: "Photography Walk: Downtown",
      date: "2026-07-18",
      location: "City Park Entrance",
      description: "Urban photography walk exploring downtown architecture and street life."
    },
    {
      id: 5,
      clubId: 4,
      title: "Hackathon Kickoff",
      date: "2026-07-25",
      location: "Tech Lab",
      description: "48-hour coding challenge. Form teams and build something amazing!"
    },
    {
      id: 6,
      clubId: 5,
      title: "Sunrise Yoga Session",
      date: "2026-07-17",
      location: "Wellness Center",
      description: "Start your day with an energizing sunrise yoga session."
    },
    {
      id: 7,
      clubId: 6,
      title: "Open Mic Night",
      date: "2026-07-30",
      location: "Auditorium",
      description: "Showcase your musical talent at our open mic night. All genres welcome!"
    }
  ];