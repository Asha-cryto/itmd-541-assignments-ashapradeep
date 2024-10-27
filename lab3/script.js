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
    jpy: 149.34,
    rub: 98.61
};

function calculateTip() {
    errorMessage.textContent = "";

    let billValue = parseFloat(billAmount.value);
    let tipPercent = parseFloat(tipPercentage.value);
    
    if (isNaN(billValue) || billValue < 0) {
        errorMessage.textContent = "Please enter a valid non-negative number for Bill Total.";
        return;
    }

    tipPercentageDisplay.textContent = tipPercent + "%";
    let tipValue = billValue * (tipPercent / 100);
    let totalValue = billValue + tipValue;

    let currencyValue = conversionRates[currency.value];
    tipAmount.value = (tipValue * currencyValue).toFixed(2);
    totalWithTip.value = (totalValue * currencyValue).toFixed(2);
}

billAmount.addEventListener("input", calculateTip);
tipPercentage.addEventListener("input", calculateTip);
currency.addEventListener("change", calculateTip);
