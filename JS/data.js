// js/data.js
// TEMPORARY STUB — replace with Person 1's real data.js once it lands on main.
// Keep the same variable names (clubs, events) and field names so dashboard.js
// doesn't need to change when you swap this file out.

const clubs = [
  {
    id: 1,
    name: "Photography Club",
    category: "Arts",
    description: "Weekly photo walks, gear talks, and exhibitions around campus.",
    seedMembers: ["Amara K.", "Brian O.", "Wanjiru M.", "Tom L.", "Faith N."],
  },
  {
    id: 2,
    name: "Coding Society",
    category: "Tech",
    description: "Hackathons, workshops, and project showcases.",
    seedMembers: ["Dennis K.", "Sarah M.", "Victor O."],
  },
];

const events = [
  {
    id: 1,
    clubId: 1,
    title: "Campus Photowalk",
    date: "2026-07-02",
    location: "Main Quad",
    description: "Bring your camera (phone cameras welcome) for a guided photowalk.",
    seedSignups: 14,
  },
  {
    id: 2,
    clubId: 1,
    title: "Lightroom Editing Workshop",
    date: "2026-07-10",
    location: "ICS Lab 2",
    description: "Hands-on editing session — bring a laptop if you have one.",
    seedSignups: 9,
  },
  {
    id: 3,
    clubId: 2,
    title: "Intro to Git Workshop",
    date: "2026-07-05",
    location: "ICS Lab 1",
    description: "Branching, merging, and pull requests from scratch.",
    seedSignups: 22,
  },
];
