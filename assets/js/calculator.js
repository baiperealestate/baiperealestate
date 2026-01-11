// Wait for the DOM to load to avoid conflicts
document.addEventListener('DOMContentLoaded', () => {

  const priceInput = document.getElementById('price');
  const downPaymentInput = document.getElementById('downPayment');
  const slider = document.getElementById('downPaymentSlider');
  const percentLabel = document.getElementById('downPaymentPercent');

  // Update numeric down payment when slider moves
  slider.addEventListener('input', () => {
    const price = parseFloat(priceInput.value) || 0;
    const sliderValue = parseFloat(slider.value);
    downPaymentInput.value = ((sliderValue / 100) * price).toFixed(0);
    percentLabel.textContent = slider.value + "%";
    calculate();
  });

  // Update slider when numeric input changes
  downPaymentInput.addEventListener('input', () => {
    const price = parseFloat(priceInput.value) || 0;
    let value = parseFloat(downPaymentInput.value) || 0;
    if (value > price) value = price;
    slider.value = ((value / price) * 100).toFixed(0);
    percentLabel.textContent = ((value / price) * 100).toFixed(0) + "%";
    calculate();
  });

  // Also recalc if price changes (slider percentage still applied)
  priceInput.addEventListener('input', () => {
    const price = parseFloat(priceInput.value) || 0;
    let sliderValue = parseFloat(slider.value);
    downPaymentInput.value = ((sliderValue / 100) * price).toFixed(0);
    calculate();
  });

});

// Main calculation function
function calculate() {
  const price = parseFloat(document.getElementById('price').value) || 0;
  const downPayment = parseFloat(document.getElementById('downPayment').value) || 0;
  const interestRate = parseFloat(document.getElementById('interest').value) / 100;
  const years = parseInt(document.getElementById('years').value) || 0;

  if (downPayment > price) {
    alert("Down payment cannot exceed property price!");
    return;
  }

  // Purchase costs
  const transferTax = price * 0.04;
  const notary = price * 0.0175;
  const cadastre = price * 0.0075;
  const totalPurchaseCosts = transferTax + notary + cadastre;

  // Mortgage
  const mortgage = price - downPayment;
  const monthlyRate = interestRate / 12;
  const numberOfPayments = years * 12;
  const monthlyPayment = monthlyRate > 0 
    ? mortgage * monthlyRate / (1 - Math.pow(1 + monthlyRate, -numberOfPayments)) 
    : mortgage / numberOfPayments;

  // Update results
  document.getElementById('transferTax').textContent = 'XCG ' + transferTax.toLocaleString();
  document.getElementById('notary').textContent = 'XCG ' + notary.toLocaleString();
  document.getElementById('cadastre').textContent = 'XCG ' + cadastre.toLocaleString();
  document.getElementById('purchaseCosts').textContent = 'XCG ' + totalPurchaseCosts.toLocaleString();
  document.getElementById('mortgage').textContent = 'XCG ' + mortgage.toLocaleString();
  document.getElementById('ownFunds').textContent = 'XCG ' + downPayment.toLocaleString();
  document.getElementById('monthly').textContent = 'XCG ' + monthlyPayment.toFixed(2).toLocaleString();
}
