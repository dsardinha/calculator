const display = document.querySelector('.display');
const equalsBtn = document.querySelector('.equals');
const operandButtons = document.querySelectorAll('.operand');
const operatorButtons = document.querySelectorAll('.operator');

let operator, num1, num2;
let displayValue = '';
let operandsArray = [];
let isResult, isOperator = false;

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

const updateDisplay = btn => {
    if (isResult) {
        displayValue = btn.textContent;
    } else {
        displayValue += btn.textContent;
    }
    display.textContent = displayValue;
}

const addOperand = (operand) => {
    operandsArray.push(Number(operand));
    if (operandsArray.length !== 0) {
        displayValue = '';
    }
}

const showResult = (operator) => {
    displayValue = operate(operator, operandsArray[0], operandsArray[1]);
    display.textContent = displayValue;
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
    if (typeof displayValue === 'number' || isOperator || isResult) return;
    addOperand(displayValue);
    showResult(operator);
    isOperator = false;
})
