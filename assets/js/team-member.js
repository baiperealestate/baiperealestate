function getCurrentLang() {
  return window.location.pathname.startsWith("/nl/") ? "nl" : "en";
}

document.addEventListener("DOMContentLoaded", () => {

  const lang = getCurrentLang();

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) return;

  const dataFile = lang === "nl"
    ? "/assets/data/team-nl.json"
    : "/assets/data/team.json";

  fetch(dataFile)
    .then(res => res.json())
    .then(team => {

      const member = team.find(m => m.id === id);
      if (!member) return;

      document.title = `${member.name} | Bai Pe Real Estate`;

      document.getElementById("memberImage").src = member.image;
      document.getElementById("memberName").textContent = member.name;
      document.getElementById("memberRole").textContent = member.role;
      document.getElementById("memberPhone").textContent = member.phone;
      document.getElementById("memberEmail").textContent = member.email;
      document.getElementById("memberStory").textContent = member.story;
      document.getElementById("aboutTitle").textContent = lang === "nl" ? "Over" : "About";

      const socialBtn = document.getElementById("memberSocial");

      socialBtn.textContent = lang === "nl"
        ? "Bekijk Social Media"
        : "Visit Social Media";

      socialBtn.href = member.beacons || "#";

    })
    .catch(() => console.error("Team member load error"));
});
