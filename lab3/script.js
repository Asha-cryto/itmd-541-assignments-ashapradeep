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
    document.getElementById('currencySymbolTip').textContent = selectedSymbol;
    document.getElementById('currencySymbolTotal').textContent = selectedSymbol;

    calculateTip();
}

function validateAndCalculateTip() {
    const billAmountInput = document.getElementById('billAmount').value;
    const billAmount = parseFloat(billAmountInput);
    const errorMessage = document.getElementById('errorMessage');
    
    if (billAmountInput !== '' && (isNaN(billAmount) || billAmount < 0)) {
        errorMessage.textContent = "Please enter a valid non-negative number for Bill Total.";
        errorMessage.style.display = "block";
        document.getElementById('tipAmount').value = '';
        document.getEle
