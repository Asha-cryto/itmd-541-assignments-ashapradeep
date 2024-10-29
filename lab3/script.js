document.getElementById('currency').addEventListener('change', updateCurrencySymbols);
document.getElementById('billAmount').addEventListener('input', validateAndCalculateTip);
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

function validateAndCalculateTip() {
    const billAmountInput = document.getElementById('billAmount').value;
    const billAmount = parseFloat(billAmountInput);
    const errorMessage = document.getElementById('errorMessage');
    
    // Check if the input is a non-empty, non-negative number
    if (billAmountInput !== '' && (isNaN(billAmount) || billAmount < 0)) {
        errorMessage.textContent = "Please enter a valid non-negative number for Bill Total.";
        errorMessage.style.display = "block";
        // Clear the Tip Amount and Total Bill with Tip fields
        document.getElementById('tipAmount').value = '';
        document.getElementById('totalWithTip').value = '';
    } else {
        errorMessage.style.display = "none";
        if (billAmountInput) {
            calculateTip();
        } else {
            // Clear fields if no input
            document.getElementById('tipAmount').value = '';
            document.getElementById('totalWithTip').value = '';
        }
    }
}

function calculateTip() {
    const billAmount = parseFloat(document.getElementById('billAmount').value);
    const tipPercentage = parseFloat(document.getElementById('tipPercentage').value);
    
    // Calculate tip amount and total only if billAmount is valid
    if (!isNaN(billAmount) && billAmount >= 0) {
        const tipAmount = billAmount * (tipPercentage / 100);
        const totalWithTip = billAmount + tipAmount;

        document.getElementById('tipPercentageDisplay').textContent = `${tipPercentage}%`;
        document.getElementById('tipAmount').value = tipAmount.toFixed(2);
        document.getElementById('totalWithTip').value = totalWithTip.toFixed(2);
    }
}

updateCurrencySymbols();
