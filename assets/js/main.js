/* =====================================================
   BAI PE REAL ESTATE – MAIN JS (PRO VERSION)
   Clean • Structured • Production Ready
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  initMobileNav();
  initListings();
  initPropertyPage();
  initContactForm();
  initNewsletter();
  initScrollAnimations();

});

/* =====================================================
   MOBILE NAVIGATION
===================================================== */
function initMobileNav() {

  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".nav-links");

  if (!hamburger || !nav) return;

  hamburger.addEventListener("click", () => {
    nav.classList.toggle("active");
    hamburger.classList.toggle("active");
  });

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
      hamburger.classList.remove("active");
    });
  });
}

/* =====================================================
   LISTINGS PAGE
===================================================== */
function initListings() {

  const container = document.getElementById("listings");
  const filter = document.getElementById("categoryFilter");

  if (!container) return;

  let allListings = [];

  fetch("assets/data/listings.json")
    .then(res => res.json())
    .then(data => {
      allListings = data;
      renderListings(data);
    })
    .catch(() => {
      container.innerHTML = "<p>Listings coming soon.</p>";
    });

  function renderListings(listings) {

    container.innerHTML = "";

    if (!listings.length) {
      container.innerHTML = "<p>No listings found.</p>";
      return;
    }

    listings.forEach(item => {

      const card = document.createElement("article");
      card.className = "listing-card";

      const img = item.images?.[0] || "assets/images/placeholder.jpg";

      card.innerHTML = `
        <div class="listing-image">
          <img src="${img}" alt="${item.title}">
          ${item.featured ? `<span class="badge">Featured</span>` : ""}
        </div>

        <div class="listing-content">
          <h3>${item.title}</h3>
          <p class="price">${item.price}</p>
          <p class="location">${item.location}</p>

          <a href="property.html?id=${item.id}" class="btn-details">
            View Details
          </a>
        </div>
      `;

      container.appendChild(card);

    });

  }

  if (filter) {
    filter.addEventListener("change", e => {

      const value = e.target.value.toLowerCase();

      const filtered = value === "all"
        ? allListings
        : allListings.filter(item =>
            item.propertyType?.toLowerCase() === value ||
            item.status?.toLowerCase() === value
          );

      renderListings(filtered);
    });
  }
}

/* =====================================================
   PROPERTY PAGE
===================================================== */
function initPropertyPage() {

  if (!document.getElementById("propertyImage")) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) return;

  fetch("assets/data/listings.json")
    .then(res => res.json())
    .then(listings => {

      const property = listings.find(p => p.id === id);
      if (!property) return;

      setText("title", property.title);
      setText("price", property.price);
      setText("location", property.location);
      setText("bedrooms", property.bedrooms);
      setText("bathrooms", property.bathrooms);
      setText("size", property.size);
      setText("description", property.description);

      fillFeatures(property.features);
      initGallery(property.images);
      fillFormData(property);

    });

}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value || "-";
}

function fillFeatures(features = []) {
  const container = document.getElementById("features");
  if (!container) return;

  container.innerHTML = "";

  features.forEach(f => {
    const li = document.createElement("li");
    li.textContent = f;
    container.appendChild(li);
  });
}

function fillFormData(property) {

  const field = document.getElementById("propertyField");
  const url = document.getElementById("propertyUrl");

  if (field) {
    field.value = `${property.title} | ${property.price} | ${property.location}`;
  }

  if (url) {
    url.value = window.location.href;
  }
}

/* =====================================================
   GALLERY (CLEAN VERSION)
===================================================== */
function initGallery(images = []) {

  if (!images.length) return;

  const img = document.getElementById("propertyImage");
  const lightbox = document.getElementById("lightbox");
  const lightImg = document.getElementById("lightboxImage");

  let index = 0;
  let scale = 1;

  function show(i) {
    index = i;
    const src = images[index];
    img.src = src;
    if (lightImg) lightImg.src = src;
  }

  show(0);

  /* CLICK OPEN */
  img?.addEventListener("click", () => {
    lightbox?.classList.add("active");
    scale = 1;
    updateZoom();
  });

  /* CLOSE */
  document.querySelector(".lightbox-close")?.addEventListener("click", () => {
    lightbox?.classList.remove("active");
  });

  /* NAV */
  document.querySelector(".next")?.addEventListener("click", () => {
    show((index + 1) % images.length);
  });

  document.querySelector(".prev")?.addEventListener("click", () => {
    show((index - 1 + images.length) % images.length);
  });

  /* ZOOM */
  function updateZoom() {
    if (lightImg) {
      lightImg.style.transform = `scale(${scale})`;
    }
  }

  document.getElementById("zoomIn")?.addEventListener("click", () => {
    scale = Math.min(scale + 0.2, 4);
    updateZoom();
  });

  document.getElementById("zoomOut")?.addEventListener("click", () => {
    scale = Math.max(scale - 0.2, 1);
    updateZoom();
  });
}

/* =====================================================
   CONTACT FORM
===================================================== */
function initContactForm() {

  const form = document.querySelector(".contact-form");
  if (!form) return;

  form.addEventListener("submit", () => {

    const field = document.getElementById("propertyField");
    const url = document.getElementById("propertyUrl");

    if (field && !field.value) {
      field.value = document.getElementById("title")?.innerText || "";
    }

    if (url && !url.value) {
      url.value = window.location.href;
    }

  });
}

/* =====================================================
   NEWSLETTER
===================================================== */
function initNewsletter() {

  const btns = [
    document.getElementById("openNewsletter"),
    document.getElementById("openNewsletterBlog")
  ];

  const form = document.getElementById("newsletterForm");

  btns.forEach(btn => {
    btn?.addEventListener("click", () => {
      form?.scrollIntoView({ behavior: "smooth" });
    });
  });
}

/* =====================================================
   SCROLL ANIMATION
===================================================== */
function initScrollAnimations() {

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(".fade-up").forEach(el => {
    observer.observe(el);
  });

}

/* =====================================================
   JOURNEY MODAL
===================================================== */
function openJourney(type) {

  const contentMap = {
    buy: "Buying Property in Curaçao...",
    sell: "Selling Your Property...",
    rent: "Rental Services..."
  };

  const box = document.getElementById("journeyContent");
  const wrapper = document.getElementById("journeyDetails");

  if (!box || !wrapper) return;

  box.innerHTML = `<h2>${contentMap[type]}</h2>`;
  wrapper.style.display = "block";
}

function closeJourney() {
  document.getElementById("journeyDetails").style.display = "none";
}
