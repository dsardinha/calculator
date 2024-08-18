const display = document.querySelector('.display');
const equalsBtn = document.querySelector('.equals');
const clearBtn = document.querySelector('.clear');
const eraseToTheLeftBtn = document.querySelector('.erase-to-the-left');
const operandButtons = document.querySelectorAll('.operand');
const operatorButtons = document.querySelectorAll('.operator');

let operator, num1, num2;
let displayValue = 0;
let operandsArray = [];
let isResult, isOperator, isError = false;

const operate = (operator, num1, num2) => {
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '×':
            return multiply(num1, num2);
        case '÷':
            return divide(num1, num2);
    }
}

const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => num1 / num2;

const roundNumber = num => Math.round(num.toFixed(10) * 10e10) / 10e10;

const clearDisplay = () => {
    display.textContent = 0;
    displayValue = 0;
    operandsArray = [];
}

const updateDisplay = btn => {
    if (isResult || displayValue === 0) {
        displayValue = btn.textContent;
    } else {
        displayValue += btn.textContent;
    }
    display.textContent = roundNumber(Number(displayValue));
}

const addOperand = (operand) => {
    operandsArray.push(Number(operand));
    if (operandsArray.length !== 0) {
        displayValue = 0;
    }
}

const showResult = (operator) => {
    displayValue = operate(operator, operandsArray[0], operandsArray[1]);
    if (displayValue === Infinity) {
        display.textContent = '∞';
        operandsArray = [];
        displayValue = 0;
        return;
    }
    display.textContent = roundNumber(Number(displayValue));
    operandsArray = [];
    isResult = true;
}

operandButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        if (isResult && isOperator) {
            addOperand(displayValue);
        }
        updateDisplay(btn);
        isResult = false;
        isOperator = false;
    });
})

operatorButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        if (displayValue && operandsArray.length === 0) {
            addOperand(displayValue);
            isResult = false;
        } else if (displayValue && operandsArray.length !== 0) {
            addOperand(displayValue);
            showResult(operator);
            isOperator = true;
        }
        operator = btn.textContent;
        isOperator = true;
    });
})

equalsBtn.addEventListener('click', () => {
    if (typeof displayValue === 'number' 
        || operandsArray.length === 0 
        || isOperator 
        || isResult
    ) return;
    addOperand(displayValue);
    showResult(operator);
    isOperator = false;
})

clearBtn.addEventListener('click', clearDisplay);

eraseToTheLeftBtn.addEventListener('click', () => {
    if (displayValue === 0 || isResult) return;
    displayValue = displayValue.slice(0, -1);
    if (displayValue.length === 0) {
        displayValue = 0;
    }
    display.textContent = displayValue;
})