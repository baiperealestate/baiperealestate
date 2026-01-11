function calculate() {
  const price = Number(document.getElementById("price").value);
  const residency = document.getElementById("residency").value;
  const age = Number(document.getElementById("age").value);
  const interest = Number(document.getElementById("interest").value) / 100;
  let years = Number(document.getElementById("years").value);

  if (!price || !age || !years) return;

  const maxEndAge = 70;
  const maxYearsByAge = maxEndAge - age;

  const bankMaxYears = residency === "resident" ? 30 : 20;
  years = Math.min(years, bankMaxYears, maxYearsByAge);

  const ltv = residency === "resident" ? 0.9 : 0.7;
  const mortgage = price * ltv;

  const transferTax = price * 0.04;
  const notary = price * 0.0175;
  const cadastre = price * 0.0075;

  const purchaseCosts = transferTax + notary + cadastre;
  const ownFunds = price - mortgage + purchaseCosts;

  const monthlyRate = interest / 12;
  const months = years * 12;
  const monthly =
    mortgage *
    (monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);

  document.getElementById("transferTax").innerText = `ANG ${transferTax.toLocaleString()}`;
  document.getElementById("notary").innerText = `ANG ${notary.toLocaleString()}`;
  document.getElementById("cadastre").innerText = `ANG ${cadastre.toLocaleString()}`;
  document.getElementById("purchaseCosts").innerText = `ANG ${purchaseCosts.toLocaleString()}`;
  document.getElementById("mortgage").innerText = `ANG ${mortgage.toLocaleString()}`;
  document.getElementById("ownFunds").innerText = `ANG ${ownFunds.toLocaleString()}`;
  document.getElementById("monthly").innerText = `ANG ${monthly.toFixed(0).toLocaleString()}`;
}
