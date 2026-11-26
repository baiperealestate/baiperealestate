function getCurrentLang() {
  return window.location.pathname.startsWith("/nl/")
    ? "nl"
    : "en";
}

/* =====================================================
   BAI PE REAL ESTATE – MAIN JS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     MOBILE NAVIGATION
  ===================================================== */

  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".nav-links");

  if (hamburger && nav) {

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

  const listingsContainer = document.getElementById("listings");
  const categoryFilter = document.getElementById("categoryFilter");
  const priceMinInput = document.getElementById("priceMin");
  const priceMaxInput = document.getElementById("priceMax");
  const locationSearch = document.getElementById("locationSearch");
  const keywordSearch = document.getElementById("keywordSearch");
  const searchBtn = document.getElementById("searchBtn");

  if (listingsContainer) {

    let allListings = [];

    const lang = getCurrentLang();

    const dataFile =
      lang === "nl"
        ? "/assets/data/listings-nl.json"
        : "/assets/data/listings.json";

    fetch(dataFile)
      .then(res => res.json())
      .then(data => {

        allListings = data;
        renderListings(allListings);

      })
      .catch(err => {

        console.error("Listings error:", err);

        listingsContainer.innerHTML =
          lang === "nl"
            ? "<p>Advertenties volgen binnenkort.</p>"
            : "<p>Listings coming soon.</p>";
      });

    /* =====================================================
       RENDER LISTINGS
    ===================================================== */

    function renderListings(listings) {

      listingsContainer.innerHTML = "";

      if (!listings || listings.length === 0) {

        listingsContainer.innerHTML =
          lang === "nl"
            ? "<p>Er zijn geen resultaten gevonden die overeenkomen met uw selectie.</p>"
            : "<p>No listings match your selection.</p>";

        return;
      }

      listings.forEach(item => {

        const card = document.createElement("article");

        card.className = "listing-card hide";

        const imgSrc =
          item.images && item.images.length
            ? item.images[0]
            : "/assets/images/placeholder.jpg";

        card.innerHTML = `
          <div class="listing-image">

            <img
              src="${imgSrc}"
              alt="${item.title}"
              loading="lazy"
            >

            ${
              item.featured
                ? `<span class="badge">Featured</span>`
                : ""
            }

          </div>

          <div class="listing-content">

            <h3>${item.title}</h3>

            <p class="price" data-price="${Number(item.price)}">
              ${formatPrice(Number(item.price))}
            </p>

            <p class="location">${item.location}</p>

            <div class="cta">

              <a
                href="/${getCurrentLang() === "nl" ? "nl/" : ""}property.html?id=${item.id}"
                class="btn"
              >
                ${
                  getCurrentLang() === "nl"
                    ? "Bekijk details"
                    : "View Details"
                }
              </a>

            </div>

          </div>
        `;

        listingsContainer.appendChild(card);

        setTimeout(() => {
          card.classList.remove("hide");
        }, 20);

      });
    }

   // ========================================
// FILTER LISTINGS
// ========================================

window.filterListings = function () {

  const selectedCategory =
    categoryFilter?.value?.toLowerCase() || "all";

  let minPrice =
    Number(priceMinInput?.value);

  let maxPrice =
    Number(priceMaxInput?.value);

  if (isNaN(minPrice)) {
    minPrice = 0;
  }

  if (isNaN(maxPrice) || maxPrice === 0) {
    maxPrice = 999999999;
  }

  const locationValue =
    locationSearch?.value?.toLowerCase().trim() || "";

  const keywordValue =
    keywordSearch?.value?.toLowerCase().trim() || "";

  const filtered = allListings.filter(item => {

    const type =
      item.propertyType?.toLowerCase() || "";

    const status =
      item.status?.toLowerCase() || "";

    const price =
      Number(item.price) || 0;

    const title =
      item.title?.toLowerCase() || "";

    const location =
      item.location?.toLowerCase() || "";

    const description =
      item.description?.toLowerCase() || "";

    const reference =
      item.reference?.toLowerCase() || "";

    // CATEGORY

    let categoryMatch = true;

    if (selectedCategory !== "all") {

      if (selectedCategory === "lots") {

        categoryMatch =
          type === "lots" ||
          type === "land";

      } else {

        categoryMatch =
          status === selectedCategory ||
          type === selectedCategory;

      }
    }

    // PRICE

    const priceMatch =
      price >= minPrice &&
      price <= maxPrice;

    // LOCATION

    const cleanLocation =
      location.replace(/[\s,-]+/g, "");

    const cleanSearch =
      locationValue.replace(/[\s,-]+/g, "");

    const locationMatch =
      !locationValue ||
      cleanLocation.includes(cleanSearch);

    // KEYWORDS

    const keywordMatch =
      !keywordValue ||
      title.includes(keywordValue) ||
      description.includes(keywordValue) ||
      location.includes(keywordValue) ||
      reference.includes(keywordValue);

    return (
      categoryMatch &&
      priceMatch &&
      locationMatch &&
      keywordMatch
    );

  });

  renderListings(filtered);

};

  /* CATEGORY FILTER */

if (categoryFilter) {

  categoryFilter.addEventListener(
    "change",
    window.filterListings
  );
}
 

  /* CATEGORY FILTER */

if (categoryFilter) {

  categoryFilter.addEventListener(
    "change",
    window.filterListings
  );
}

/* SEARCH BUTTON */

if (searchBtn) {

  searchBtn.addEventListener(
    "click",
    window.filterListings
  );
}

/* LIVE FILTERING */

[
  priceMinInput,
  priceMaxInput,
  locationSearch,
  keywordSearch
].forEach(input => {

  if (!input) return;

  input.addEventListener(
    "input",
    window.filterListings
  );

});

/* ENTER KEY */

document.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    e.preventDefault();
    window.filterListings();
  }
});

} 
  /* =====================================================
     PROPERTY PAGE
  ===================================================== */

  const imageEl =
    document.getElementById("propertyImage");

  const featuresEl =
    document.getElementById("features");

  if (imageEl && featuresEl) {
    loadProperty();
  }

  async function loadProperty() {

    const params =
      new URLSearchParams(window.location.search);

    const propertyId = params.get("id");

    if (!propertyId) return;

    try {

      const lang = getCurrentLang();

      const dataFile =
        lang === "nl"
          ? "/assets/data/listings-nl.json"
          : "/assets/data/listings.json";

      const res = await fetch(dataFile);

      const listings = await res.json();

      const property = listings.find(
        p => p.id === propertyId
      );

      if (!property) return;

      /* BASIC INFO */

      document.getElementById("title").textContent =
        property.title;

      const priceEl =
        document.getElementById("price");

      priceEl.dataset.price =
        Number(property.price);

      priceEl.textContent =
        formatPrice(Number(property.price));
      updatePrices();

      document.getElementById("location").textContent =
        property.location;

      document.getElementById("bedrooms").textContent =
        property.bedrooms;

      document.getElementById("bathrooms").textContent =
        property.bathrooms;

      document.getElementById("size").textContent =
        property.size;

      document.getElementById("description").textContent =
        property.description;

      /* FORM TRACKING */

      const propertyField =
        document.getElementById("propertyField");

      const propertyUrl =
        document.getElementById("propertyUrl");

      if (propertyField) {

        propertyField.value =
          `${property.title} | ${property.price} | ${property.location}`;
      }

      if (propertyUrl) {
        propertyUrl.value = window.location.href;
      }

      /* FEATURES */

/* FEATURES */

featuresEl.innerHTML = "";

if (property.features && property.features.length) {

  property.features.forEach(feature => {

    const li = document.createElement("li");

    li.textContent = feature;

    featuresEl.appendChild(li);

  });

}

/* INIT GALLERY */

initGallery(property.images);

} catch (err) {

  console.error("Property page error:", err);

}

} 
  /* =====================================================
     PROPERTY GALLERY + LIGHTBOX
  ===================================================== */

  function initGallery(images) {

    if (!images || images.length === 0) return;

    const imageEl =
      document.getElementById("propertyImage");

    const lightbox =
      document.getElementById("lightbox");

    const lightboxImg =
      document.getElementById("lightboxImage");

    const nextBtn =
      document.querySelector(".slider-btn.next");

    const prevBtn =
      document.querySelector(".slider-btn.prev");

    const lightNext =
      document.querySelector(".lightbox-arrow.next");

    const lightPrev =
      document.querySelector(".lightbox-arrow.prev");

    const closeBtn =
      document.querySelector(".lightbox-close");

    const zoomIn =
      document.getElementById("zoomIn");

    const zoomOut =
      document.getElementById("zoomOut");

    let currentIndex = 0;
    let scale = 1;

    function showImage(index) {

      currentIndex = index;

      const src =
        images[currentIndex] ||
        "/assets/images/placeholder.jpg";

      imageEl.src = src;

      if (lightboxImg) {
        lightboxImg.src = src;
      }
    }

    showImage(0);

    /* NEXT IMAGE */

    if (nextBtn) {

      nextBtn.addEventListener("click", () => {

        showImage(
          (currentIndex + 1) % images.length
        );

      });
    }

    /* PREVIOUS IMAGE */

    if (prevBtn) {

      prevBtn.addEventListener("click", () => {

        showImage(
          (currentIndex - 1 + images.length) %
          images.length
        );

      });
    }

    /* OPEN LIGHTBOX */

    if (imageEl && lightbox) {

      imageEl.addEventListener("click", () => {

        lightbox.classList.add("active");

        lightboxImg.src = images[currentIndex];

        scale = 1;

        lightboxImg.style.transform = "scale(1)";
      });
    }

    /* CLOSE LIGHTBOX */

    if (closeBtn && lightbox) {

      closeBtn.addEventListener("click", () => {

        lightbox.classList.remove("active");

      });
    }

    /* LIGHTBOX NEXT */

    if (lightNext) {

      lightNext.addEventListener("click", () => {

        showImage(
          (currentIndex + 1) % images.length
        );

      });
    }

    /* LIGHTBOX PREVIOUS */

    if (lightPrev) {

      lightPrev.addEventListener("click", () => {

        showImage(
          (currentIndex - 1 + images.length) %
          images.length
        );

      });
    }

    /* ZOOM IN */

    if (zoomIn) {

      zoomIn.addEventListener("click", () => {

        scale += 0.2;

        lightboxImg.style.transform =
          `scale(${scale})`;

      });
    }

    /* ZOOM OUT */

    if (zoomOut) {

      zoomOut.addEventListener("click", () => {

        scale = Math.max(1, scale - 0.2);

        lightboxImg.style.transform =
          `scale(${scale})`;

      });
    }

    /* MOBILE SWIPE */

    if (lightbox) {

      let startX = 0;

      lightbox.addEventListener("touchstart", e => {

        startX =
          e.changedTouches[0].screenX;

      });

      lightbox.addEventListener("touchend", e => {

        const endX =
          e.changedTouches[0].screenX;

        if (startX - endX > 50) {

          showImage(
            (currentIndex + 1) % images.length
          );
        }

        if (endX - startX > 50) {

          showImage(
            (currentIndex - 1 + images.length) %
            images.length
          );
        }
      });

      /* SCROLL WHEEL ZOOM */

      lightboxImg.addEventListener("wheel", e => {

        e.preventDefault();

        if (e.deltaY < 0) {
          scale += 0.15;
        } else {
          scale -= 0.15;
        }

        scale = Math.min(
          Math.max(1, scale),
          4
        );

        lightboxImg.style.transform =
          `scale(${scale})`;

      });

      /* RESET ZOOM */

      lightboxImg.addEventListener("click", () => {

        scale = 1;

        lightboxImg.style.transform =
          "scale(1)";

      });

      /* PINCH ZOOM */

      let startDistance = 0;

      lightboxImg.addEventListener("touchstart", e => {

        if (e.touches.length === 2) {

          startDistance = Math.hypot(
            e.touches[0].pageX - e.touches[1].pageX,
            e.touches[0].pageY - e.touches[1].pageY
          );
        }
      });

      lightboxImg.addEventListener("touchmove", e => {

        if (e.touches.length === 2) {

          const newDistance = Math.hypot(
            e.touches[0].pageX - e.touches[1].pageX,
            e.touches[0].pageY - e.touches[1].pageY
          );

          const zoom = newDistance / startDistance;

          scale = Math.min(
            Math.max(1, zoom),
            4
          );

          lightboxImg.style.transform =
            `scale(${scale})`;
        }
      });
    }
  }

  /* =====================================================
     CONTACT FORM TRACKING
  ===================================================== */

  const contactForm =
    document.querySelector(".contact-form");

  if (contactForm) {

    contactForm.addEventListener("submit", () => {

      const propertyField =
        document.getElementById("propertyField");

      const propertyUrl =
        document.getElementById("propertyUrl");

      const title =
        document.getElementById("title")?.innerText || "";

      const price =
        document.getElementById("price")?.innerText || "";

      const location =
        document.getElementById("location")?.innerText || "";

      if (propertyField && !propertyField.value) {

        propertyField.value =
          `${title} | ${price} | ${location}`;
      }

      if (propertyUrl && !propertyUrl.value) {

        propertyUrl.value = window.location.href;
      }
    });
  }

  /* =====================================================
     NEWSLETTER
  ===================================================== */

  const newsletterForm =
    document.getElementById("newsletterForm");

  const openNewsletter =
    document.getElementById("openNewsletter");

  const openNewsletterBlog =
    document.getElementById("openNewsletterBlog");

  function openNewsletterForm() {

    if (!newsletterForm) return;

    newsletterForm.style.display = "block";

    newsletterForm.scrollIntoView({
      behavior: "smooth"
    });
  }

  if (openNewsletter) {

    openNewsletter.addEventListener(
      "click",
      openNewsletterForm
    );
  }

  if (openNewsletterBlog) {

    openNewsletterBlog.addEventListener(
      "click",
      openNewsletterForm
    );
  }
});

/* =====================================================
   JOURNEY SECTION
===================================================== */

function openJourney(type) {

  let content = "";

  if (type === "buy") {

    content = `
      <h2>Buying Property in Curaçao</h2>

      <p>
        Buying property is an important decision.
        At Bai Pe Real Estate we guide buyers
        through the process with professional advice,
        market insights, and a structured approach.
      </p>

      <h3>How We Guide You</h3>

      <ul>
        <li>Understanding your needs and investment goals</li>
        <li>Identifying suitable properties</li>
        <li>Property viewings and evaluation</li>
        <li>Market advice and negotiation strategy</li>
        <li>Guidance through the purchase process</li>
      </ul>

      <a href="contact.html" class="btn">
        Contact Us
      </a>

      <br><br>

      <button
        class="btn close-btn"
        onclick="closeJourney()"
      >
        Close
      </button>
    `;

  } else if (type === "sell") {

    content = `
      <h2>Selling Your Property</h2>

      <p>
        Selling a property requires more than just
        listing it online.
      </p>

      <h3>Our Selling Strategy</h3>

      <ul>
        <li>Professional property evaluation</li>
        <li>Strategic pricing based on market data</li>
        <li>Professional property presentation</li>
        <li>Targeted marketing</li>
        <li>Negotiation and transaction guidance</li>
      </ul>

      <a href="contact.html" class="btn">
        Contact Us
      </a>

      <br><br>

      <button
        class="btn close-btn"
        onclick="closeJourney()"
      >
        Close
      </button>
    `;

  } else if (type === "rent") {

    content = `
      <h2>Rental Services</h2>

      <p>
        We provide professional rental assistance
        for owners and tenants.
      </p>

      <h3>How We Assist</h3>

      <ul>
        <li>Marketing rental properties</li>
        <li>Tenant screening</li>
        <li>Viewing coordination</li>
        <li>Rental agreements</li>
        <li>Guidance throughout the rental process</li>
      </ul>

      <a href="contact.html" class="btn">
        Contact Us
      </a>

      <br><br>

      <button
        class="btn close-btn"
        onclick="closeJourney()"
      >
        Close
      </button>
    `;
  }

  const details =
    document.getElementById("journeyDetails");

  const contentBox =
    document.getElementById("journeyContent");

  contentBox.innerHTML = content;

  details.style.display = "block";

  details.scrollIntoView({
    behavior: "smooth"
  });
}

function closeJourney() {

  const details =
    document.getElementById("journeyDetails");

  details.style.display = "none";
}

/* =====================================================
   SCROLL ANIMATION
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }

    });

  }, {
    threshold: 0.15
  });

  document.querySelectorAll(".fade-up").forEach(el => {
    observer.observe(el);
  });
});

/* =====================================================
   LANGUAGE SYSTEM
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  const langSwitcher =
    document.getElementById("languageSwitcher");

  const path =
    window.location.pathname;

  const isNL =
    path.startsWith("/nl/");

  /* SET DROPDOWN STATE */

  if (langSwitcher) {

    langSwitcher.value =
      isNL ? "nl" : "en";

    const savedLang =
      localStorage.getItem("lang");

    if (
      savedLang &&
      savedLang !== langSwitcher.value
    ) {
      switchLanguage(savedLang);
    }

    langSwitcher.addEventListener("change", function () {

      const selectedLang = this.value;

      localStorage.setItem(
        "lang",
        selectedLang
      );

      switchLanguage(selectedLang);

    });
  }

  /* SWITCH LANGUAGE */

  function switchLanguage(lang) {

    let currentPath =
      window.location.pathname;

    const query =
      window.location.search;

    currentPath =
      currentPath.replace(/^\/+/, "");

    currentPath =
      currentPath.replace(/^nl\//, "");

    if (currentPath === "") {
      currentPath = "index.html";
    }

    const newUrl =
      lang === "nl"
        ? "/nl/" + currentPath + query
        : "/" + currentPath + query;

    window.location.href = newUrl;
  }

  /* LOCALIZE INTERNAL LINKS */

  const links =
    document.querySelectorAll("a[href$='.html']");

  links.forEach(link => {

    let href =
      link.getAttribute("href");

    if (!href || href.startsWith("http")) return;

    href =
      href.replace(/^\/?nl\//, "");

    link.href = isNL
      ? "/nl/" + href
      : "/" + href;

  });
});


/* =====================================================
   HOMEPAGE FEATURED PROPERTY CAROUSEL
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  const track = document.getElementById("featuredListings");

  if (!track) return;

  const previousButton = document.querySelector(".featured-prev");
  const nextButton = document.querySelector(".featured-next");
  const countLabel = document.getElementById("featuredCount");

  const isDutch = window.location.pathname.startsWith("/nl/");

  const dataFile = isDutch
    ? "/assets/data/listings-nl.json"
    : "/assets/data/listings.json";

  const text = isDutch
    ? {
        loading: "Uitgelichte woningen worden geladen...",
        empty: "Er zijn momenteel geen uitgelichte woningen beschikbaar.",
        error: "De woningen konden momenteel niet worden geladen.",
        sale: "Te koop",
        details: "Bekijk details",
        bedrooms: "Slaapkamers",
        bathrooms: "Badkamers",
        featured: "Uitgelicht",
        count: "Uitgelichte woningen"
      }
    : {
        loading: "Loading featured properties...",
        empty: "There are currently no featured properties available.",
        error: "Properties could not be loaded at this time.",
        sale: "For Sale",
        details: "View Details",
        bedrooms: "Bedrooms",
        bathrooms: "Bathrooms",
        featured: "Featured",
        count: "Featured properties"
      };

  track.innerHTML = `<p class="featured-loading">${text.loading}</p>`;

  function formatListingPrice(price) {
    const amount = Number(price);

    if (!Number.isFinite(amount)) return "";

    return "XCG " + new Intl.NumberFormat(
      isDutch ? "nl-NL" : "en-US",
      { maximumFractionDigits: 0 }
    ).format(amount);
  }

  function createPropertyCard(property) {

    const card = document.createElement("article");
    card.className = "featured-card";

    const image = document.createElement("img");

    image.src =
      property.images && property.images.length
        ? property.images[0]
        : "/assets/images/placeholder.jpg";

    image.alt = property.title || "Property in Curaçao";
    image.loading = "lazy";

    image.onerror = () => {
      image.onerror = null;
      image.src = "/assets/images/placeholder.jpg";
    };

    const imageWrapper = document.createElement("div");
    imageWrapper.className = "featured-card-image";
    imageWrapper.appendChild(image);

    const status = document.createElement("span");
    status.className = "featured-status";
    status.textContent = text.sale;

    imageWrapper.appendChild(status);

    const content = document.createElement("div");
    content.className = "featured-card-content";

    const title = document.createElement("h3");
    title.textContent = property.title || "Property in Curaçao";

    const location = document.createElement("p");
    location.className = "featured-location";
    location.textContent = property.location || "Curaçao";

    const price = document.createElement("p");
    price.className = "featured-price";
    price.textContent = formatListingPrice(property.price);

    const details = document.createElement("div");
    details.className = "featured-details";

    if (property.bedrooms) {
      const bedrooms = document.createElement("span");
      bedrooms.textContent =
        ` ${property.bedrooms} ${text.bedrooms}`;

      details.appendChild(bedrooms);
    }

    if (property.bathrooms) {
      const bathrooms = document.createElement("span");
      bathrooms.textContent =
        ` ${property.bathrooms} ${text.bathrooms}`;

      details.appendChild(bathrooms);
    }

    if (property.size) {
      const size = document.createElement("span");
      size.textContent = property.size;

      details.appendChild(size);
    }

    const link = document.createElement("a");
    link.className = "btn";

    link.href =
      `/${isDutch ? "nl/" : ""}property.html?id=${encodeURIComponent(property.id)}`;

    link.textContent = text.details;

    content.appendChild(title);
    content.appendChild(location);
    content.appendChild(price);
    content.appendChild(details);
    content.appendChild(link);

    card.appendChild(imageWrapper);
    card.appendChild(content);

    return card;
  }

  function updateCarouselButtons() {

    if (!previousButton || !nextButton) return;

    const maxScroll =
      track.scrollWidth - track.clientWidth;

    previousButton.disabled = track.scrollLeft <= 5;
    nextButton.disabled =
      track.scrollLeft >= maxScroll - 5;
  }

  function scrollCarousel(direction) {

    const card = track.querySelector(".featured-card");

    if (!card) return;

    const gap = 24;
    const amount = card.getBoundingClientRect().width + gap;

    track.scrollBy({
      left: direction * amount,
      behavior: window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches ? "auto" : "smooth"
    });
  }

  if (previousButton) {
    previousButton.addEventListener("click", () => {
      scrollCarousel(-1);
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      scrollCarousel(1);
    });
  }

  track.addEventListener("scroll", updateCarouselButtons);

  window.addEventListener("resize", updateCarouselButtons);

  fetch(dataFile)
    .then(response => {
      if (!response.ok) {
        throw new Error("Unable to load listing data.");
      }

      return response.json();
    })
    .then(listings => {

      track.innerHTML = "";

      const featuredProperties = listings.filter(property => {
        return (
          property.featured === true &&
          property.status?.toLowerCase() === "for sale"
        );
      });

      if (!featuredProperties.length) {
        track.innerHTML =
          `<p class="featured-empty">${text.empty}</p>`;

        if (countLabel) {
          countLabel.textContent = text.count;
        }

        if (previousButton) previousButton.hidden = true;
        if (nextButton) nextButton.hidden = true;

        return;
      }

      featuredProperties.forEach(property => {
        track.appendChild(createPropertyCard(property));
      });

      if (countLabel) {
        countLabel.textContent =
          `${featuredProperties.length} ${text.count}`;
      }

      updateCarouselButtons();

      if (featuredProperties.length <= 1) {
        if (previousButton) previousButton.hidden = true;
        if (nextButton) nextButton.hidden = true;
      }
    })
    .catch(error => {

      console.error("Featured properties error:", error);

      track.innerHTML =
        `<p class="featured-empty">${text.error}</p>`;

      if (previousButton) previousButton.hidden = true;
      if (nextButton) nextButton.hidden = true;
    });

});
