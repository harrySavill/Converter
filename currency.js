const apiKey = key.env; 
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/GBP`; // API URL

const selectFrom = document.getElementById('select-from');
const selectTo = document.getElementById('select-to');
const inputFrom = document.getElementById('input-from');
const inputTo = document.getElementById('input-to');

// Function to convert currencies
function convertCurrency(value, fromCurrency, toCurrency, rates) {
    if (fromCurrency === toCurrency) return value;

    const rate = rates[toCurrency] / rates[fromCurrency];
    const result = (value * rate).toFixed(2);
    return result;
}

// Update conversion when input or select changes
function updateConversion() {
    const fromCurrency = selectFrom.value;
    const toCurrency = selectTo.value;
    const inputValue = parseFloat(inputFrom.value);

    if (isNaN(inputValue)) {
        inputTo.value = ''; // Clear the output if input is invalid
        return;
    }

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const rates = data.conversion_rates;
            const result = convertCurrency(inputValue, fromCurrency, toCurrency, rates);
            inputTo.value = result || '';
        })
        .catch(error => console.error('Error during conversion:', error));
}

// Initial setup
updateConversion(); 
selectFrom.addEventListener('change', updateConversion);
selectTo.addEventListener('change', updateConversion);
inputFrom.addEventListener('input', updateConversion);
