document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("teamGrid");
  if (!grid) return;

  fetch("assets/data/team.json")
    .then(res => res.json())
    .then(team => {
      if (!Array.isArray(team)) return;

      grid.innerHTML = "";

      team.forEach(member => {
        if (!member.id || !member.name) return;

        const card = document.createElement("article");
        card.className = "team-card";

        card.innerHTML = `
          <div class="team-photo">
            <a href="team-member.html?id=${member.id}">
              <img src="${member.image}" alt="${member.name}">
              <span>View Profile</span>
            </a>
          </div>

          <div class="team-info">
            <h3>${member.name}</h3>
            <p class="team-role">${member.role}</p>

            <div class="team-contact">
              <p>${member.phone}</p>
              <p>${member.email}</p>
            </div>

            <div class="team-social">
              <a href="${member.beacons}" target="_blank" rel="noopener">
                Social Media
              </a>
            </div>
          </div>
        `;

        grid.appendChild(card);
      });
    })
    .catch(() => {
      grid.innerHTML = "<p>Team information coming soon.</p>";
    });
});

