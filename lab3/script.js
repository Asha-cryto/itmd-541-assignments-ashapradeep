document.getElementById('currency').addEventListener('change', updateCurrencySymbols);
document.getElementById('billAmount').addEventListener('input', validateAndCalculateTip);
document.getElementById('tip').addEventListener('input', calculateTip);

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

    // Update labels based on currency selection
    if (currency === 'usd') {
        document.getElementById('tipAmountLabel').textContent = "Tip Amount:";
        document.getElementById('totalWithTipLabel').textContent = "Total Bill with Tip:";
    } else {
        document.getElementById('tipAmountLabel').textContent = "Converted Tip Amount:";
        document.getElementById('totalWithTipLabel').textContent = "Converted Total Bill with Tip:";
    }

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
        document.getElementById('tipAmount').value = '';
        document.getElementById('totalWithTip').value = '';
    } else {
        errorMessage.style.display = "none";
        if (billAmountInput) {
            calculateTip();
        } else {
            document.getElementById('tipAmount').value = '';
            document.getElementById('totalWithTip').value = '';
        }
    }
}

function calculateTip() {
    const billAmount = parseFloat(document.getElementById('billAmount').value);
    const tipPercentage = parseFloat(document.getElementById('tip').value);
    const currency = document.getElementById('currency').value;

    if (!isNaN(billAmount) && billAmount >= 0) {
        const tipAmount = billAmount * (tipPercentage / 100);
        const totalWithTip = billAmount + tipAmount;

        document.getElementById('tipDisplay').textContent = `${tipPercentage}%`;

        if (currency === 'usd') {
            document.getElementById('tipAmount').value = tipAmount.toFixed(2);
            document.getElementById('totalWithTip').value = totalWithTip.toFixed(2);
        } else {
            const conversionRates = {
                inr: 84.07,
                jpy: 149.34
            };
            const convertedTipAmount = tipAmount * conversionRates[currency];
            const convertedTotalWithTip = totalWithTip * conversionRates[currency];

            document.getElementById('tipAmount').value = convertedTipAmount.toFixed(2);
            document.getElementById('totalWithTip').value = convertedTotalWithTip.toFixed(2);
        }
    }
}

updateCurrencySymbols();
