document.getElementById('currency').addEventListener('change', updateCurrencySymbols);
document.getElementById('billAmount').addEventListener('input', validateAndCalculateTip);
document.getElementById('tipPercentage').addEventListener('input', calculateTip);

// Function to update currency symbols based on selection
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

    calculateTip(); // Recalculate the tip when the currency changes
}

// Validate input and calculate tip
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

// Calculate tip amount and total with tip
function calculateTip() {
    const billAmount = parseFloat(document.getElementById('billAmount').value);
    const tipPercentage = parseFloat(document.getElementById('tipPercentage').value);
    const currency = document.getElementById('currency').value;

    document.getElementById('tipDisplay').textContent = `${tipPercentage}%`; // Update displayed tip percentage

    if (!isNaN(billAmount) && billAmount >= 0) {
        const tipAmount = billAmount * (tipPercentage / 100);
        const totalWithTip = billAmount + tipAmount;

        if (currency === 'usd') {
            document.getElementById('tipAmount').value = tipAmount.toFixed(2);
            document.getElementById('totalWithTip').value = totalWithTip.toFixed(2);
        } else {
            const conversionRates = {
                inr: 84.07
