function getCurrentLang() {
  return window.location.pathname.startsWith("/nl/") ? "nl" : "en";
}

document.addEventListener("DOMContentLoaded", () => {

  const lang = getCurrentLang();

  const dataFile = lang === "nl"
    ? "/assets/data/team-nl.json"
    : "/assets/data/team.json";

  fetch(dataFile)
    .then(res => res.json())
    .then(team => {

      const grid = document.getElementById("teamGrid");
      if (!grid) return;

      grid.innerHTML = "";

      team.forEach(member => {

        const isNL = lang === "nl";

        const url = isNL
          ? `/nl/team-member.html?id=${member.id}`
          : `/team-member.html?id=${member.id}`;

        const card = document.createElement("div");
        card.className = "team-card";

        card.innerHTML = `
          <a href="${url}">
            <div class="team-photo">
              <img src="${member.image}" alt="${member.name}">
              <span>${isNL ? "Bekijk profiel" : "View Profile"}</span>
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
