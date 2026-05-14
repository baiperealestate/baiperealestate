
// ========================================
// BAI PE REAL ESTATE — FX / CURRENCY SYSTEM
// ========================================

// Exchange rates
const exchangeRates = {
  XCG: 1,
  USD: 0.56,
  EUR: 0.52
};

// Current currency
let currentCurrency =
  localStorage.getItem("currency") || "XCG";

// ========================================
// FORMAT PRICE
// ========================================

function formatPrice(priceXCG) {

  if (!priceXCG || isNaN(priceXCG)) {
    return "Price on request";
  }

  const converted =
    Number(priceXCG) *
    exchangeRates[currentCurrency];

  let symbol = "XCG";

  if (currentCurrency === "USD") {
    symbol = "$";
  }

  if (currentCurrency === "EUR") {
    symbol = "€";
  }

  return `${symbol} ${converted.toLocaleString("en-US", {
    maximumFractionDigits: 0
  })}`;
}

// ========================================
// UPDATE ALL PRICES
// ========================================

function updatePrices() {

  document.querySelectorAll(".price").forEach(el => {

    const rawPrice =
      Number(el.dataset.price);

    if (!rawPrice || isNaN(rawPrice)) return;

    el.textContent =
      formatPrice(rawPrice);

  });
}

// ========================================
// CURRENCY SWITCHER
// ========================================

document.addEventListener("DOMContentLoaded", () => {

  const currencySwitcher =
    document.getElementById("currencySwitcher");

  if (!currencySwitcher) return;

  currencySwitcher.value =
    currentCurrency;

  currencySwitcher.addEventListener("change", function () {

    currentCurrency = this.value;

    localStorage.setItem(
      "currency",
      currentCurrency
    );

    updatePrices();

  });

  updatePrices();

});
