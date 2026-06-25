function getJoinedClubs() {
return JSON.parse(localStorage.getItem("joinedClubs")) || [];
}

function joinClub(clubId) {
let clubs = getJoinedClubs();

```
if (!clubs.includes(clubId)) {
    clubs.push(clubId);
    localStorage.setItem("joinedClubs", JSON.stringify(clubs));
}
```

}

function leaveClub(clubId) {
let clubs = getJoinedClubs();

```
clubs = clubs.filter(id => id !== clubId);

localStorage.setItem("joinedClubs", JSON.stringify(clubs));
```

}

function getRegisteredEvents() {
return JSON.parse(localStorage.getItem("registeredEvents")) || [];
}

function registerEvent(eventId) {
let events = getRegisteredEvents();

```
if (!events.includes(eventId)) {
    events.push(eventId);
    localStorage.setItem("registeredEvents", JSON.stringify(events));
}
```

}

function unregisterEvent(eventId) {
let events = getRegisteredEvents();

```
events = events.filter(id => id !== eventId);

localStorage.setItem("registeredEvents", JSON.stringify(events));
```

}
