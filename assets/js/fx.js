// ========================================
// BAI PE REAL ESTATE — CURRENCY SYSTEM
// ========================================

// Exchange rates based on USD
const exchangeRates = {
  USD: 1,
  EUR: 0.56,
  XCG: 0.52
};

// Current currency
let currentCurrency =
  localStorage.getItem("baipe_currency") || "USD";

// ========================================
// CREATE CURRENCY SWITCHER
// ========================================
document.addEventListener("DOMContentLoaded", () => {

  const languageSwitcher =
    document.getElementById("languageSwitcher");

  // Stop if language switcher not found
  if (!languageSwitcher) return;

  // Avoid duplicates
  if (document.getElementById("currencySwitcher")) return;

  // Create currency select
  const currencySwitcher =
    document.createElement("select");

  currencySwitcher.id = "currencySwitcher";
  currencySwitcher.className = "language-switcher";

  currencySwitcher.innerHTML = `
    <option value="USD">USD $</option>
    <option value="EUR">EUR €</option>
    <option value="XCG">XCG ƒ</option>
  `;

  // Saved currency
  currencySwitcher.value = currentCurrency;

  // Insert beside language switcher
  languageSwitcher.insertAdjacentElement(
    "afterend",
    currencySwitcher
  );

  // Change currency
  currencySwitcher.addEventListener("change", () => {

    currentCurrency = currencySwitcher.value;

    localStorage.setItem(
      "baipe_currency",
      currentCurrency
    );

    updatePrices();
  });

  // Initial update
  updatePrices();
});

// ========================================
// FORMAT PRICE
// ========================================
function formatPrice(priceUSD) {

  const converted =
    priceUSD * exchangeRates[currentCurrency];

  // USD
  if (currentCurrency === "USD") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    }).format(converted);
  }

  // EUR
  if (currentCurrency === "EUR") {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0
    }).format(converted);
  }

  // XCG
  return `XCG ${converted.toLocaleString("en-US", {
    maximumFractionDigits: 0
  })}`;
}

// ========================================
// UPDATE PRICES
// ========================================
function updatePrices() {

  // LISTINGS PAGE
  document.querySelectorAll("[data-price-usd]")
    .forEach(priceElement => {

      const usdPrice =
        Number(priceElement.dataset.priceUsd);

      if (!isNaN(usdPrice)) {

        priceElement.textContent =
          formatPrice(usdPrice);
      }
    });

  // PROPERTY PAGE
  const propertyPrice =
    document.getElementById("price");

  if (
    propertyPrice &&
    propertyPrice.dataset.priceUsd
  ) {

    const usdPrice =
      Number(propertyPrice.dataset.priceUsd);

    if (!isNaN(usdPrice)) {

      propertyPrice.textContent =
        formatPrice(usdPrice);
    }
  }
}
