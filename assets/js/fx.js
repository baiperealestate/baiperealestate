/* =====================================================
   FX ENGINE – CENTRAL BANK OF CURAÇAO & SINT MAARTEN
   Purpose: Property price display (XCG → USD / EUR)
   Rate type: Selling rates to the public
   Valid: January 23, 2026
   ===================================================== */

const FX = Object.freeze({
  // Selling rates to the public
  USD: 1.82,      // 1 USD = 1.82 XCG
  EUR: 2.1325,    // 1 EUR = 2.1325 XCG

  toUSD(xcg) {
    return xcg / this.USD;
  },

  toEUR(xcg) {
    return xcg / this.EUR;
  }
});

function formatAmount(value, currency) {
  return `${currency} ${Math.round(value).toLocaleString("en-US")}`;
}
