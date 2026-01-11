function calculatePurchaseCosts() {
  const price = Number(document.getElementById("price").value);
  if (!price || price <= 0) return;

  // Fixed Curaçao assumptions
  const transferTax = price * 0.04;

  const notaryMin = price * 0.015;
  const notaryMax = price * 0.02;

  const cadastreMin = price * 0.005;
  const cadastreMax = price * 0.01;

  const appraisal = 2000; // typical Curaçao estimate

  const totalMin =
    transferTax + notaryMin + cadastreMin + appraisal;

  const totalMax =
    transferTax + notaryMax + cadastreMax + appraisal;

  document.getElementById("transferTax").innerText =
    `XCG ${transferTax.toLocaleString()}`;

  document.getElementById("notaryFees").innerText =
    `XCG ${notaryMin.toLocaleString()} – ${notaryMax.toLocaleString()}`;

  document.getElementById("cadastreFees").innerText =
    `XCG ${cadastreMin.toLocaleString()} – ${cadastreMax.toLocaleString()}`;

  document.getElementById("appraisalFee").innerText =
    `XCG ${appraisal.toLocaleString()}`;

  document.getElementById("totalCosts").innerText =
    `XCG ${totalMin.toLocaleString()} – ${totalMax.toLocaleString()}`;

  document.getElementById("results").style.display = "block";
}

