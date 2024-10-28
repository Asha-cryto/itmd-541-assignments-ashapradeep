document.getElementById('currency').addEventListener('change', updateCurrencySymbols);
document.getElementById('billAmount').addEventListener('input', calculateTip);
document.getElementById('tipPercentage').addEventListener('input', calculateTip);

function updateCurrencySymbols() {
    const currency = document.getElementById('currency').value;
    const currencySymbols = {
        usd: '$',
        inr: '₹',
        jpy: '¥'
    };
    
    const selectedSymbol = currencySymbols[currency];
    document.getElementById('currencySymbolBill').textContent = selectedSymbol;
    document.getElementById('currencySymbolTip').textContent = selectedSymbol;
    document.getElementById('currencySymbolTotal').textContent = selectedSymbol;
    calculateTip();
}

function calculateTip() {
    const billAmount = parseFloat(document.getElementById('billAmount').value);
    const tipPercentage = parseFloat(document.getElementById('tipPercentage').value);
    const errorMessage = document.getElementById('errorMessage');
    
    if (isNaN(billAmount) || billAmount < 0) {
        errorMessage.textContent = "Please enter a valid non-negative number for Bill Total.";
        errorMessage.style.display = "block";
        document.getElementById('tipAmount').value = '';
        document.getElementById('totalWithTip').value = '';
        return;
    } else {
        errorMessage.style.display = "none";
    }
    
    const tipAmount = billAmount * (tipPercentage / 100);
    const totalWithTip = billAmount + tipAmount;

    document.getElementById('tipPercentageDisplay').textContent = `${tipPercentage}%`;
    document.getElementById('tipAmount').value = tipAmount.toFixed(2);
    document.getElementById('totalWithTip').value = totalWithTip.toFixed(2);
}

updateCurrencySymbols();
