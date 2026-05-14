// ========================================
// BAI PE REAL ESTATE - FX SYSTEM
// ========================================

// EXCHANGE RATES
const exchangeRates = {
  XCG: 1,
  USD: 0.56,
  EUR: 0.52
};

// CURRENT CURRENCY
let currentCurrency =
  localStorage.getItem("currency") || "XCG";

// ========================================
// FORMAT PRICE
// ========================================

function formatPrice(price) {

  const converted =
    price * exchangeRates[currentCurrency];

  if (currentCurrency === "USD") {

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    }).format(converted);

  }

  if (currentCurrency === "EUR") {

    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0
    }).format(converted);

  }

  return `XCG ${converted.toLocaleString("en-US")}`;
}

// ========================================
// INIT CURRENCY SWITCHER
// ========================================

document.addEventListener("DOMContentLoaded", () => {

  const currencySwitcher =
    document.getElementById("currencySwitcher");

  if (!currencySwitcher) return;

  // SET SAVED VALUE
  currencySwitcher.value = currentCurrency;

  // CHANGE EVENT
  currencySwitcher.addEventListener("change", () => {

    currentCurrency = currencySwitcher.value;

    localStorage.setItem(
      "currency",
      currentCurrency
    );

    // RELOAD LISTINGS
    if (window.renderListings) {
      window.renderListings();
    }

  });

});
