const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const equalBtn = document.getElementById('equal');
const clearBtn = document.getElementById('clear');
const clearEntryBtn = document.getElementById('clear-entry');
const sqrtBtn = document.getElementById('sqrt');
const historyList = document.getElementById('history-list');
const themeToggle = document.getElementById('theme-toggle');

let currentInput = "";
let history = [];

// Add to history
function addToHistory(expression, result) {
    history.unshift(`${expression} = ${result}`);
    if (history.length > 5) history.pop();
    renderHistory();
}

function renderHistory() {
    historyList.innerHTML = history.map(item => `<li>${item}</li>`).join('');
}

// Button clicks
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        if (value) {
            currentInput += value;
            display.value = currentInput;
        }
    });
});

// "=" button
equalBtn.addEventListener('click', () => {
    try {
        if (currentInput.trim() === "") {
            display.value = "Error";
            return;
        }
        const result = eval(currentInput);
        addToHistory(currentInput, result);
        display.value = result;
        currentInput = result.toString();
    } catch {
        display.value = "Error";
        currentInput = "";
    }
});

// "C" button
clearBtn.addEventListener('click', () => {
    currentInput = "";
    display.value = "";
});

// "CE" button
clearEntryBtn.addEventListener('click', () => {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
});

// "√" button
sqrtBtn.addEventListener('click', () => {
    try {
        const num = parseFloat(display.value);
        if (isNaN(num)) {
            display.value = "Error";
        } else {
            const result = Math.sqrt(num);
            addToHistory(`√(${num})`, result);
            display.value = result;
            currentInput = result.toString();
        }
    }
    catch {
        display.value = "Error";
    }
});

// Keyboard input
document.addEventListener('keydown', (event) => {
    const allowedKeys = "0123456789+-*/.%";
    
    if (allowedKeys.includes(event.key)) {
        currentInput += event.key;
        display.value = currentInput;
    } 
    else if (event.key === "Enter") {
        equalBtn.click();
    }
    else if (event.key === "Backspace") {
        currentInput = currentInput.slice(0, -1);
        display.value = currentInput;
    }
});

// Dark / Light mode toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    themeToggle.textContent = 
        document.body.classList.contains('light-mode') ? "🌞" : "🌙";
});