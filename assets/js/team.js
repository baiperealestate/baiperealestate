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
          <div class="team-photo">
            <a href="team-member.html?id=${member.id}">
              <img src="${member.image}" alt="${member.name}">
              <span>View Profile</span>
            </a>
          </div>

          <div class="team-info">
            <h3>${member.name}</h3>
            <p class="team-role">${member.role}</p>
          </div>
        `;

        grid.appendChild(card);
      });
    })
    .catch(err => console.error("Team load error:", err));
});
