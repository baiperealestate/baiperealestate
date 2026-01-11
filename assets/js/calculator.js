function calculate() {
  const price = Number(document.getElementById("price").value);
  const buyerType = document.getElementById("buyerType").value;
  const purchaseType = document.getElementById("purchaseType").value;
  const investment = document.getElementById("investment").checked;

  if (!price || price <= 0) return;

  // Buyer logic
  const downPercent = buyerType === "resident" ? 0.20 : 0.35;
  const interest = buyerType === "resident" ? 0.05 : 0.06;
  const years = buyerType === "resident" ? 30 : 25;

  const downPayment = price * downPercent;
  const loan = price - downPayment;

  // Mortgage calculation
  const r = interest / 12;
  const n = years * 12;
  const monthly = (loan * r) / (1 - Math.pow(1 + r, -n));

  // Costs
  const transferTax = price * 0.04;
  const notary = price * 0.02;
  const admin = 3000;
  const totalCost = price + transferTax + notary + admin;

  const cashRequired =
    purchaseType === "cash"
      ? totalCost
      : downPayment + transferTax + notary + admin;

  // Output
  document.getElementById("downPayment").innerText = `XCG ${downPayment.toFixed(0)}`;
  document.getElementById("loanAmount").innerText = `XCG ${loan.toFixed(0)}`;
  document.getElementById("monthlyMortgage").innerText =
    purchaseType === "cash" ? "N/A (Cash Buyer)" : `XCG ${monthly.toFixed(0)}`;

  document.getElementById("transferTax").innerText = `XCG ${transferTax.toFixed(0)}`;
  document.getElementById("notary").innerText = `XCG ${notary.toFixed(0)}`;
  document.getElementById("admin").innerText = `XCG ${admin}`;
  document.getElementById("totalCost").innerText = `XCG ${totalCost.toFixed(0)}`;
  document.getElementById("cashRequired").innerText = `XCG ${cashRequired.toFixed(0)}`;

  // Investment
  const investmentSection = document.getElementById("investmentSection");
  investmentSection.style.display = investment ? "block" : "none";

  if (investment) {
    const rent = Number(document.getElementById("rent").value) || 0;
    const annualRent = rent * 12;
    const costs = annualRent * 0.15;
    const net = annualRent - costs;
    const yieldPct = (net / price) * 100;

    document.getElementById("netIncome").innerText = `XCG ${net.toFixed(0)}`;
    document.getElementById("yield").innerText = `${yieldPct.toFixed(2)} %`;
  }
}
