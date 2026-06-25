document.addEventListener("DOMContentLoaded", function () {

    const container = document.getElementById("clubs-container");

    let html = "";

    window.clubs.forEach(function(club) {

        html += `
            <div class="card">
                <h2>${club.name}</h2>

                <p><strong>Category:</strong> ${club.category}</p>

                <p>${club.description}</p>

                <p><strong>Members:</strong> ${club.seedMembers}</p>

                <button onclick="joinClubNow(${club.id})">
                    Join Club
                </button>
            </div>
        `;
    });

    container.innerHTML = html;
});

function joinClubNow(clubId) {

    let joinedClubs =
        JSON.parse(localStorage.getItem("joinedClubs")) || [];

    if (!joinedClubs.includes(clubId)) {

        joinedClubs.push(clubId);

        localStorage.setItem(
            "joinedClubs",
            JSON.stringify(joinedClubs)
        );

        alert("Club joined successfully!");
    }
}