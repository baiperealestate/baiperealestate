document.addEventListener("DOMContentLoaded", () => {
  fetch("assets/data/team.json")
    .then(res => res.json())
    .then(team => {
      const grid = document.getElementById("teamGrid");
      grid.innerHTML = "";

      team.forEach(member => {
        const card = document.createElement("div");
        card.className = "team-card";

        card.innerHTML = `
          <a href="team-member.html?id=${member.id}" class="team-link">
            <div class="team-photo">
              <img src="${member.image}" alt="${member.name}">
              <span>View Profile</span>
            </div>

            <div class="team-info">
              <h3>${member.name}</h3>
              <p class="team-role">${member.role}</p>
              <p class="team-phone">${member.phone}</p>
              <p class="team-email">${member.email}</p>
            </div>
          </a>
        `;

        grid.appendChild(card);
      });
    })
    .catch(err => console.error("Team load error:", err));
});
