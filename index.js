// Calculator

// To construct a valid arithmetic expression, we need the following 4 expressions:

const calculator = {
  displayValue: '0',
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null
};

// Input the digits
/*
In this step, we’ll make the digit buttons work so that when any of them is clicked, the corresponding value is displayed on the screen.

Since the displayValue property of the calculator object represents the input of the user, we need to modify it when any of the digits is clicked. Create a new function called inputDigit below the calculator object:
*/

function inputDigit (digit){
  const { displayValue, waitingForSecondOperand } = calculator;
  if (waitingForSecondOperand === true){
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    // overwrite 'displayValue if the current value is '0', otherwise append to it
  calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
  }
  console.log(calculator);
}

function updateDisplay(){
  // select the element with class of 'calculator-screen'
  const display = document.querySelector('.calculator-screen');
  // update the value of the element with the contents of 'displayValue'
  display.value = calculator.displayValue;
}

updateDisplay();

// Input a decimal point

/*
When the decimal point key is clicked, we need to append a decimal point to whatever is displayed on the screen except if it already contains a decimal point.
*/

// Fix decimal bug 
/*
If you enter a decimal point after clicking on an operator, it gets appended to the first operand instead of being a part of the second.
*/

function inputDecimal (dot){
  if(calculator.waitingForSecondOperand === true){
    calculator.displayValue = '0.'
    calculator.waitingForSecondOperand = false;
    return;
  }
  // if the 'displayValue' property does not contain a decimal point
  if (!calculator.displayValue.includes(dot)){
    // append the decimal point
    calculator.displayValue += dot;
  }
}

// Operators

/*
1. When a user hits an operator after entering the first operand
At this point, the contents of displayValue should be stored under the firstOperand property and the operator property should be updated with whatever operator was clicked.

Create a new function called handleOperator below inputDecimal.

3. When two or more operators are entered consecutively
It’s quite common to change one’s mind about the type of operation one wants to perform so the calculator must handle this properly.
*/

function handleOperator(nextOperator){
  // destructure the properties of the calculator object
  const { firstOperand, displayValue, operator} = calculator;
  // parseFloat coverts the string contents of 'displayValue' to a floating-point number
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForSecondOperand){
    calculator.operator = nextOperator;
    console.log(calculator);
    return;
  }
  // verify if 'firstOperand' is null and that the inputValue is NOT a NaN value
  if (firstOperand === null && !isNaN(inputValue)){
    // update the firstOperand property
    calculator.firstOperand = inputValue;
  } else if (operator){
    const result = calculate (firstOperand, inputValue, operator);
    // calculator.displayValue = String(result);
    calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
  console.log(calculator);
}

// 2. When the user hits an operator after entering the second operand
/* 
The second scenario we need to handle occurs when the user has entered the second operand and an operator key is clicked. At that point, all the ingredients to evaluate the expression is present so we need to do so and display the result on the screen. The firstOperand also needs to be updated so that the result can be reused in the next calculation.

Create a new function called calculate below handleOperator as shown below:
*/

function calculate(firstOperand, secondOperand, operator){
  if (operator === '+'){
    return firstOperand + secondOperand;
  } else if (operator === '-'){
    return firstOperand - secondOperand;
  } else if (operator === '*'){
    return firstOperand * secondOperand;
  } else if (operator === '/'){
    return firstOperand / secondOperand;
  }
  return secondOperand;
}

// Reset the calculator

function resetCalculator(){
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  console.log(calculator);
}

// Event listeners

const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', e => {
  // access the clicked element
  const target = e.target; // or: const { target } = event; (using destructuring which makes it easy to unpack object properties into distinct variables)

  if (!target.matches('button')){
    return;
  };

  if(target.classList.contains('operator')){
    handleOperator(target.value);
    updateDisplay();
    console.log('operator', target.value);
    return;
  }

  if(target.classList.contains('decimal')){
    inputDecimal(target.value);
    updateDisplay();
    console.log('decimal', target.value);
    return;
  }

  if(target.classList.contains('all-clear')){
    resetCalculator();
    updateDisplay();
    console.log('clear', target.value);
    return;
  }

  inputDigit (target.value);
  updateDisplay();

  console.log('digit', target.value);

});

// // Refactor the event listener

// keys.addEventListener('click', e => {
//   const {target} = e;
//   const {value} = target;
//   if(!target.matches('button')){
//     return;
//   }

//   switch (value) {
//     case '+':
//     case '-':
//     case '*':
//     case '/':
//       handleOperator(value);
//       break;
//     case '.':
//       inputDecimal(value);
//       break;
//     case 'all-clear':
//       resetCalculator();
//       break;
//     default:
//       // check if the key is an integer
//       if(Number.isInteger(parseFloat(value))){
//         inputDigit(value);
//       }
//   }
//   updateDisplay();
// });




