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


 
const listingsContainer = document.getElementById("listings");

if (listingsContainer) {
  fetch("assets/data/listings.json")
    .then(res => res.json())
    .then(data => {
      listingsContainer.innerHTML = "";

data.forEach(item => {
  const card = document.createElement("article");
  card.className = "listing-card";

  const imageSrc = item.images && item.images.length
    ? item.images[0]
    : "assets/images/placeholder.jpg";

  card.innerHTML = `
    <div class="listing-image">
      <img src="${imageSrc}" alt="${item.title}" loading="lazy">
      ${item.featured ? `<span class="badge">Featured</span>` : ``}
    </div>

    <div class="listing-content">
      <h3>${item.title}</h3>
      <p class="price">${item.price}</p>
      <p class="location">${item.location}</p>

      <a href="property.html?id=${item.id}" class="btn">
        View Details
      </a>
    </div>
  `;

  listingsContainer.appendChild(card);
});

    })
    .catch(err => {
      console.error("Listings error:", err);
      listingsContainer.innerHTML = "<p>Listings coming soon.</p>";
    });
}

document.addEventListener("DOMContentLoaded", async () => {
  const imageEl = document.getElementById("propertyImage");
  const featuresEl = document.getElementById("features");

  if (!imageEl || !featuresEl) return; // not on property page

  const params = new URLSearchParams(window.location.search);
  const propertyId = params.get("id");

  if (!propertyId) return;

  try {
    const res = await fetch("assets/data/listings.json");
    const listings = await res.json();
    const property = listings.find(p => p.id === propertyId);

    if (!property) return;

    /* BASIC INFO */
    document.getElementById("title").textContent = property.title;
    document.getElementById("price").textContent = property.price;
    document.getElementById("location").textContent = property.location;
    document.getElementById("bedrooms").textContent = property.bedrooms;
    document.getElementById("bathrooms").textContent = property.bathrooms;
    document.getElementById("size").textContent = property.size;
    document.getElementById("description").textContent = property.description;

    /* FORM – PROPERTY TRACKING */
const propertyField = document.getElementById("propertyField");
const propertyUrl = document.getElementById("propertyUrl");

if (propertyField) {
  propertyField.value = `${property.title} | ${property.price} | ${property.location}`;
}

if (propertyUrl) {
  propertyUrl.value = window.location.href;
}


    /* FEATURES */
    featuresEl.innerHTML = "";
    property.features.forEach(feature => {
      const li = document.createElement("li");
      li.textContent = feature;
      featuresEl.appendChild(li);
    });

/* ==========================
   LIGHTBOX GALLERY
========================== */
let currentIndex = 0;
let zoomLevel = 1;

const imageEl = document.getElementById("propertyImage");
const prevBtn = document.querySelector(".slider-btn.prev");
const nextBtn = document.querySelector(".slider-btn.next");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImage");
const closeBtn = document.querySelector(".lightbox-close");
const zoomInBtn = document.getElementById("zoomIn");
const zoomOutBtn = document.getElementById("zoomOut");
const openLightboxBtn = document.getElementById("openLightbox");

// Initialize gallery
if (property.images && property.images.length) {
  currentIndex = 0;
  imageEl.src = property.images[currentIndex];
}

// ---------- Slider arrows (main gallery) ----------
prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + property.images.length) % property.images.length;
  imageEl.src = property.images[currentIndex];
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % property.images.length;
  imageEl.src = property.images[currentIndex];
});

// ---------- Open Lightbox ----------
openLightboxBtn.addEventListener("click", () => {
  lightbox.classList.add("active");
  lightboxImg.src = property.images[currentIndex];
  zoomLevel = 1;
  lightboxImg.style.transform = "scale(1)";
});

// ---------- Close Lightbox ----------
closeBtn.addEventListener("click", () => {
  lightbox.classList.remove("active");
});

// ---------- Lightbox arrows ----------
document.querySelector(".lightbox-arrow.next").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % property.images.length;
  lightboxImg.src = property.images[currentIndex];
  zoomLevel = 1;
  lightboxImg.style.transform = "scale(1)";
});

document.querySelector(".lightbox-arrow.prev").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + property.images.length) % property.images.length;
  lightboxImg.src = property.images[currentIndex];
  zoomLevel = 1;
  lightboxImg.style.transform = "scale(1)";
});

// ---------- Lightbox zoom ----------
zoomInBtn.addEventListener("click", () => {
  zoomLevel += 0.25;
  lightboxImg.style.transform = `scale(${zoomLevel})`;
});

zoomOutBtn.addEventListener("click", () => {
  zoomLevel = Math.max(1, zoomLevel - 0.25);
  lightboxImg.style.transform = `scale(${zoomLevel})`;
});

// ---------- Swipe support on lightbox ----------
let startX = 0;
let endX = 0;

lightbox.addEventListener("touchstart", e => startX = e.changedTouches[0].screenX);
lightbox.addEventListener("touchend", e => {
  endX = e.changedTouches[0].screenX;
  if (startX - endX > 50) showNext();
  if (endX - startX > 50) showPrev();
});

function showNext() {
  currentIndex = (currentIndex + 1) % property.images.length;
  lightboxImg.src = property.images[currentIndex];
  zoomLevel = 1;
  lightboxImg.style.transform = "scale(1)";
}

function showPrev() {
  currentIndex = (currentIndex - 1 + property.images.length) % property.images.length;
  lightboxImg.src = property.images[currentIndex];
  zoomLevel = 1;
  lightboxImg.style.transform = "scale(1)";
}

  } catch (err) {
    console.error("Property page error:", err);
  }
})
    
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("openNewsletter");
  const form = document.getElementById("newsletterForm");

  if (!btn || !form) return;

  btn.addEventListener("click", () => {
    form.classList.toggle("active");
    form.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const listingsContainer = document.getElementById("listings");
  const categoryFilter = document.getElementById("categoryFilter");
  let allListings = [];

  if (!listingsContainer) return;

  // Load listings
  fetch("assets/data/listings.json")
    .then(res => res.json())
    .then(data => {
      allListings = data;
      renderListings(allListings);
    })
    .catch(err => {
      console.error("Error loading listings:", err);
      listingsContainer.innerHTML = "<p>Listings will be available soon.</p>";
    });

  // Render function (keeps premium card design)
  function renderListings(listings) {
    listingsContainer.innerHTML = "";

    if (!listings || listings.length === 0) {
      listingsContainer.innerHTML = "<p>No listings match your selection.</p>";
      return;
    }

    listings.forEach(item => {
      const card = document.createElement("article");
      card.className = "listing-card hide";

      const imgSrc = item.images && item.images.length ? item.images[0] : "assets/images/placeholder.jpg";

      card.innerHTML = `
        <div class="listing-image">
          <img src="${imgSrc}" alt="${item.title}" loading="lazy">
          ${item.featured ? `<span class="badge">Featured</span>` : ""}
        </div>
        <div class="listing-content">
          <h3>${item.title}</h3>
          <p class="price">${item.price}</p>
          <p class="location">${item.location}</p>
          <div class="cta">
            <a href="property.html?id=${item.id}" class="btn-details"> View Details</a>
          </div>
        </div>
      `;
      listingsContainer.appendChild(card);

      // Smooth fade-in for premium feel
      setTimeout(() => card.classList.remove("hide"), 20);
    });
  }

  // Category filter event with Lots / Land support
if (categoryFilter) {
  categoryFilter.addEventListener("change", e => {
    const selected = e.target.value.toLowerCase();

    const filtered = selected === "all"
      ? allListings
      : allListings.filter(item => {
          const type = item.propertyType?.toLowerCase();
          const status = item.status?.toLowerCase();

          if (selected === "lots") {
            // Include both "lots" and "land"
            return type === "lots" || type === "land";
          }

          return status === selected || type === selected;
        });

    renderListings(filtered);
  });
}
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");

  if (!form) return;

  form.addEventListener("submit", () => {
    const propertyField = document.getElementById("propertyField");
    const propertyUrl = document.getElementById("propertyUrl");

    const title = document.getElementById("title")?.innerText || "";
    const price = document.getElementById("price")?.innerText || "";
    const location = document.getElementById("location")?.innerText || "";

    if (propertyField && !propertyField.value) {
      propertyField.value = `${title} | ${price} | ${location}`;
    }

    if (propertyUrl && !propertyUrl.value) {
      propertyUrl.value = window.location.href;
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const newsletterForm = document.getElementById("newsletterForm");
  const openNewsletter = document.getElementById("openNewsletter");
  const openNewsletterBlog = document.getElementById("openNewsletterBlog");

  function openForm() {
    if (newsletterForm) {
      newsletterForm.style.display = "block";
      newsletterForm.scrollIntoView({ behavior: "smooth" });
    }
  }

  if (openNewsletter) {
    openNewsletter.addEventListener("click", openForm);
  }

  if (openNewsletterBlog) {
    openNewsletterBlog.addEventListener("click", openForm);
  }
});


