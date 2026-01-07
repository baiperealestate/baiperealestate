document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".nav-links");

  if (!hamburger || !nav) return;

  hamburger.addEventListener("click", function () {
    nav.classList.toggle("active");
    hamburger.classList.toggle("active");
  });

  // Close menu when clicking a link (mobile UX)
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
      hamburger.classList.remove("active");
    });
  });
});


let currentIndex = 0;
const images = property.images; // array from your data

function showImage(index) {
  document.getElementById("mainImage").src = images[index];
}

document.querySelector(".next").onclick = () => {
  currentIndex = (currentIndex + 1) % images.length;
  showImage(currentIndex);
};

document.querySelector(".prev").onclick = () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(currentIndex);
};
