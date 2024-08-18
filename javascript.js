let operator, num1, num2;

const operate = (operator, num1, num2) => {
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
    }
}

const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => num1 / num2;

console.log(add(10, 5));
console.log(operate('+', 10, 5));
console.log(subtract(10, 5));
console.log(operate('-', 10, 5));
console.log(multiply(10, 5));
console.log(operate('*', 10, 5));
console.log(divide(10, 5));
console.log(operate('/', 10, 5));