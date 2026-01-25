/* ==============================
   FX – CBCS Currency Engine
   ============================== */

// Central Bank of Curaçao & Sint Maarten (CBCS)
// Selling rates to the public
// Valid: Jan 23, 2026
const FX = {
  USD: 1.82,
  EUR: 2.1325,

  toUSD(xcg) {
    return xcg / this.USD;
  },

  toEUR(xcg) {
    return xcg / this.EUR;
  }
};

function formatAmount(value, currency) {
  return `${currency} ${Math.round(value).toLocaleString("en-US")}`;
}
