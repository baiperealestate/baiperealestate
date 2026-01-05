<script>
const id = new URLSearchParams(window.location.search).get("id");

fetch("assets/data/listings.json")
  .then(res => res.json())
  .then(data => {
    const p = data.find(item => item.id === id);
    if (!p) return;

    let index = 0;
    const img = document.getElementById("mainImage");

    img.src = p.images[0];

    document.getElementById("prevBtn").onclick = () => {
      index = (index - 1 + p.images.length) % p.images.length;
      img.src = p.images[index];
    };

    document.getElementById("nextBtn").onclick = () => {
      index = (index + 1) % p.images.length;
      img.src = p.images[index];
    };

    document.getElementById("propertyTitle").textContent = p.title;
    document.getElementById("propertyDescription").textContent = p.description;

    document.getElementById("featuresList").innerHTML =
      p.features.map(f => `<li>${f}</li>`).join("");
  });
</script>

