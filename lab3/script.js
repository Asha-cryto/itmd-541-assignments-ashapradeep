const form = document.getElementById("tip-form");
const billAmount = document.getElementById("billAmount");
const tipPercentage = document.getElementById("tipPercentage");
const tipPercentageDisplay = document.getElementById("tipPercentageDisplay");
const tipAmount = document.getElementById("tipAmount");
const totalWithTip = document.getElementById("totalWithTip");
const currency = document.getElementById("currency");
const errorMessage = document.getElementById("errorMessage");

const conversionRates = {
    usd: 1,
    inr: 84.07,
    jpy: 149.34
};

function calculateTip() {
    errorMessage.style.display = "none"; // Hide error message initially

    let billValue = parseFloat(billAmount.value);
    let tipPercent = parseFloat(tipPercentage.value);
    
    // Check for invalid input and display error if needed
    if (isNaN(billValue) || billValue < 0) {
        errorMessage.textContent = "Please enter a valid non-negative number for Bill Total.";
        errorMessage.style.display = "block"; // Show error message
        return;
    }

    // Clear error if input is valid
    errorMessage.textContent = "";

    // Update tip percentage display
    tipPercentageDisplay.textContent = tipPercent + "%";
    let tipValue = billValue * (tipPercent / 100);
    let totalValue = billValue + tipValue;

    // Convert based on selected currency
    let currencyValue = conversionRates[currency.value];
    tipAmount.value = (tipValue * currencyValue).toFixed(2);
    totalWithTip.value = (totalValue * currencyValue).toFixed(2);
}

// Event listeners for real-time calculations
billAmount.addEventListener("input", calculateTip);
tipPercentage.addEventListener("input", calculateTip);
currency.addEventListener("change", calculateTip);
