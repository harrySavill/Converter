const topButtons = Array.from(document.querySelectorAll('.button-div button'));
const selectFrom = document.getElementById('select-from');
const selectTo = document.getElementById('select-to');
const inputFrom = document.getElementById('input-from');
const inputTo = document.getElementById('input-to');

// Define options for each button category
const options = {
    length: ['Meter', 'Kilometer', 'Centimeter', 'Millimeter', 'Mile', 'Yard', 'Foot', 'Inch'],
    temperature: ['Celsius', 'Fahrenheit', 'Kelvin'],
    area: ['Square Meter', 'Hectare', 'Acre', 'Square Kilometer', 'Square Mile'],
    volume: ['Liter', 'Milliliter', 'Cubic Meter', 'Gallon', 'Pint'],
    weight: ['Gram', 'Kilogram', 'Pound', 'Ounce', 'Metric Ton'],
    time: ['Second', 'Minute', 'Hour', 'Day', 'Week']
};

// Conversion rates and functions
const conversionRates = {
    length: {
        Meter: 1,
        Kilometer: 1000,
        Centimeter: 0.01,
        Millimeter: 0.001,
        Mile: 1609.34,
        Yard: 0.9144,
        Foot: 0.3048,
        Inch: 0.0254
    },
    weight: {
        Gram: 1,
        Kilogram: 1000,
        Pound: 453.592,
        Ounce: 28.3495,
        'Metric Ton': 1000000
    },
    time: {
        Second: 1,
        Minute: 60,
        Hour: 3600,
        Day: 86400,
        Week: 604800
    },
    temperature: {
        Celsius: {
            toFahrenheit: (c) => (c * 9/5) + 32,
            toKelvin: (c) => c + 273.15
        },
        Fahrenheit: {
            toCelsius: (f) => (f - 32) * 5/9,
            toKelvin: (f) => (f - 32) * 5/9 + 273.15
        },
        Kelvin: {
            toCelsius: (k) => k - 273.15,
            toFahrenheit: (k) => (k - 273.15) * 9/5 + 32
        }
    },
    area: {
        'Square Meter': 1,
        Hectare: 10000,
        Acre: 4046.86,
        'Square Kilometer': 1000000,
        'Square Mile': 2589988.11
    },
    volume: {
        Liter: 1,
        Milliliter: 0.001,
        'Cubic Meter': 1000,
        Gallon: 3.78541,
        Pint: 0.473176
    }
};

function setActive(button) {
    topButtons.forEach(btn => btn.classList.remove('button-active'));
    button.classList.add('button-active');
    const category = button.classList[0];
    populateSelects(category);
}

function populateSelects(category) {
    selectFrom.innerHTML = '';
    selectTo.innerHTML = '';

    options[category].forEach(option => {
        const opt = document.createElement('option');
        opt.value = option;
        opt.textContent = option;
        selectFrom.appendChild(opt.cloneNode(true));
        selectTo.appendChild(opt);
    });

    // Set default options
    selectFrom.value = options[category][0];
    selectTo.value = options[category][1];

    updateConversion();
}

function convertLength(value, fromUnit, toUnit) {
    if (fromUnit === toUnit) return value;

    const valueInMeters = value * conversionRates.length[fromUnit];
    const result = (valueInMeters / conversionRates.length[toUnit]).toFixed(2);
    return result;
}

function convertWeight(value, fromUnit, toUnit) {
    if (fromUnit === toUnit) return value;

    const valueInGrams = value * conversionRates.weight[fromUnit];
    const result = (valueInGrams / conversionRates.weight[toUnit]).toFixed(2);
    return result;
}

function convertTime(value, fromUnit, toUnit) {
    if (fromUnit === toUnit) return value;

    const valueInSeconds = value * conversionRates.time[fromUnit];
    const result = (valueInSeconds / conversionRates.time[toUnit]).toFixed(2);
    return result;
}

function convertTemperature(value, fromUnit, toUnit) {
    if (fromUnit === toUnit) return value;

    let toReturn;

    if (fromUnit === 'Celsius') {
        if (toUnit === 'Fahrenheit') {
            toReturn = conversionRates.temperature.Celsius.toFahrenheit(value);
        } else if (toUnit === 'Kelvin') {
            toReturn = conversionRates.temperature.Celsius.toKelvin(value);
        }
    } else if (fromUnit === 'Fahrenheit') {
        if (toUnit === 'Celsius') {
            toReturn = conversionRates.temperature.Fahrenheit.toCelsius(value);
        } else if (toUnit === 'Kelvin') {
            toReturn = conversionRates.temperature.Fahrenheit.toKelvin(value);
        }
    } else if (fromUnit === 'Kelvin') {
        if (toUnit === 'Celsius') {
            toReturn = conversionRates.temperature.Kelvin.toCelsius(value);
        } else if (toUnit === 'Fahrenheit') {
            toReturn = conversionRates.temperature.Kelvin.toFahrenheit(value);
        }
    }

    return toReturn.toFixed(2);
}

function convertArea(value, fromUnit, toUnit) {
    if (fromUnit === toUnit) return value;

    const valueInSquareMeters = value * conversionRates.area[fromUnit];
    const result = (valueInSquareMeters / conversionRates.area[toUnit]).toFixed(2);
    return result;
}

function convertVolume(value, fromUnit, toUnit) {
    if (fromUnit === toUnit) return value;

    const valueInLiters = value * conversionRates.volume[fromUnit];
    const result = (valueInLiters / conversionRates.volume[toUnit]).toFixed(2);
    return result;
}

function updateConversion() {
    const fromUnit = selectFrom.value;
    const toUnit = selectTo.value;
    const inputValue = parseFloat(inputFrom.value);

    if (isNaN(inputValue)) {
        inputTo.value = ''; // Clear the output if input is invalid
        return;
    }

    let result;
    const category = topButtons.find(button => button.classList.contains('button-active'))?.classList[0];

    switch (category) {
        case 'length':
            result = convertLength(inputValue, fromUnit, toUnit);
            break;
        case 'temperature':
            result = convertTemperature(inputValue, fromUnit, toUnit);
            break;
        case 'weight':
            result = convertWeight(inputValue, fromUnit, toUnit);
            break;
        case 'time':
            result = convertTime(inputValue, fromUnit, toUnit);
            break;
        case 'area':
            result = convertArea(inputValue, fromUnit, toUnit);
            break;
        case 'volume':
            result = convertVolume(inputValue, fromUnit, toUnit);
            break;
        default:
            result = '';
    }

    inputTo.value = result || '';
}

document.addEventListener('DOMContentLoaded', () => {
    const defaultButton = topButtons.find(button => button.classList.contains('length'));
    if (defaultButton) {
        setActive(defaultButton);
    }
});

topButtons.forEach(button => {
    button.addEventListener('click', function() {
        setActive(button);
    });
});

selectFrom.addEventListener('change', updateConversion);
selectTo.addEventListener('change', updateConversion);
inputFrom.addEventListener('input', updateConversion);
