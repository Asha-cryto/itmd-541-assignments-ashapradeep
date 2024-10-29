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
        errorMessage.style.display = "block"; // Show the error message
        document.getElementById('tipAmount').value = ''; // Clear tip amount
        document.getElementById('totalWithTip').value = ''; // Clear total amount
    } else {
        errorMessage.style.display = "none"; // Hide the error message
        if (billAmountInput) {
            calculateTip();
        } else {
            document.getElementById('tipAmount').value = ''; // Clear tip amount
            document.getElementById('totalWithTip').value = ''; // Clear total amount
            document.getElementById('tipPercentageField').value = ''; // Clear tip percentage
        }
    }
}

function calculateTip() {
    const billAmount = parseFloat(document.getElementById('billAmount').value);
    const tipPercentage = parseFloat(document.getElementById('tipPercentage').value);
    const currency = document.getElementById('currency').value;

    // Update the Tip Percentage Field
    document.getElementById('tipPercentageField').value = `${tipPercentage}%`;

    if (!isNaN(billAmount) && billAmount >= 0) {
        const tipAmount = billAmount * (tipPercentage / 100);
        const totalWithTip = billAmount + tipAmount;

        // Format the values based on the currency selected
        if (currency === 'usd') {
            document.getElementById('tipAmount').value = tipAmount
