const lang = window.location.pathname.startsWith("/nl/") ? "nl" : "en";

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (!id) return;

  fetch("/assets/data/team.json")
    .then(res => res.json())
    .then(team => {
      const member = team.find(m => m.id === id);
      if (!member) return;

      document.title = `${member.name} | Bai Pe Real Estate`;

      document.getElementById("memberImage").src = member.image;
      document.getElementById("memberName").textContent = member.name;
    document.getElementById("memberRole").textContent = member.role[lang];
      document.getElementById("memberPhone").textContent = member.phone;
      document.getElementById("memberEmail").textContent = member.email;
  document.getElementById("memberStory").textContent = member.story || member.about || member.description || "";;
      document.getElementById("memberSocial").textContent =
  lang === "nl" ? "Bekijk Social Media" : "Visit Social Media";
    })
    .catch(() => console.error("Team member load error"));
});

