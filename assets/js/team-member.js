document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (!id) return;

  fetch("assets/data/team.json")
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
      document.getElementById("memberSocial").href = member.beacons;
    })
    .catch(() => console.error("Team member load error"));
});

