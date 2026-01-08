document.addEventListener("DOMContentLoaded", () => {

  /* =============================
     MOBILE HAMBURGER MENU
  ============================== */
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if if (!hamburger || !nav) return; {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      hamburger.classList.toggle("open");
    });

    // Close menu when clicking a link (mobile UX)
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        hamburger.classList.remove("open");
      });
    });
  }

 
