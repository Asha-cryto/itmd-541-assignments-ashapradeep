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

    if (billAmountInput !== '' && (isNaN(billAmount) || billAmount < 0)) {
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
            document.getElementById('tipPercentageField').value = '';
        }
    }
}

function calculateTip() {
    const billAmount = parseFloat(document.getElementById('billAmount').value);
    const tipPercentage = parseFloat(document.getElementById('tipPercentage').value);
    const currency = document.getElementById('currency').value;

    document.getElementById('tipPercentageField').value = `${tipPercentage}%`;

    if (!isNaN(billAmount) && billAmount >= 0) {
        const tipAmount = billAmount * (tipPercentage / 100);
        const totalWithTip = billAmount + tipAmount;

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
