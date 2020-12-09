Calculator App

1. To construct a valid arithmetic expression, we need the following 4 expressions:

const calculator = {
displayvalue: '0',
firstOperand: null,
waitingForSecondOperand: false,
operator: null
};

2.  The calculator object above consists of everything that we need to construct a valid expression:

a. displayValue holds a string value that represents the input of the user or the result of an operation. It’s how we keep track of what should be displayed on the screen.
b. firstOperand will store the first operand for any expression. It’s set to null for now.
c. The operator key will store the operator for an expression. Its initial value is also null.
d. waitingForSecondOperand essentially serves as a way to check if both the first operand and the operator have been inputted. If it’s true, the next numbers that the user enters will constitute the second operand.

At the moment, the calculator screen is blank. We need the contents of the displayValue property to be shown on the screen at all times. We will create a function for this purpose so that anytime an operation is performed in the app, we can always invoke it to update the screen with the contents of displayValue.

3. Update the display
   At the moment, the calculator screen is blank. We need the contents of the displayValue property to be shown on the screen at all times. We will create a function for this purpose so that anytime an operation is performed in the app, we can always invoke it to update the screen with the contents of displayValue.

4. Event Listeneers (i.e. handle key presses)

listen for clicks on the calculator keys and determine what type of key was clicked.

Use of destructuring ~ makes it easy to unpack object properties into distinct variables.

const { target } = event;
// is equivalent to
const target = event.target;

5. Input the digits
   Whenever the digit buttons are clicked, the corresponding value is displayed on the screen.

6. Input a decimal point
   When the decimal point key is clicked, we need to append a decimal point to whatever is displayed on the screen except if it already contains a decimal point.

7. Handling operators
   The next step is to get the operators (+, −, ⨉, ÷, =) on the calculator working. There are three scenarios to account for:

A. When a user hits an operator after entering the first operand
At this point, the contents of displayValue should be stored under the firstOperand property and the operator property should be updated with whatever operator was clicked.

B. When the user hits an operator after entering the second operand
The second scenario we need to handle occurs when the user has entered the second operand and an operator key is clicked.

C. When two or more operators are entered consecutively ~ when you change your mind about what oiperator you beed to use

8. Reset calculator ~ In most calculators, the AC button is used to reset the calculator to its default state

9. Fix decimal bug ~ If you enter a decimal point after clicking on an operator, it gets appended to the first operand instead of being a part of the second.

10. Refactor the event listener
    All the if blocks have been replaced with a single switch block, and updateDisplay() is called only once at the end of the function.

11. Floating-point precision ~ The toFixed() method accepts a value between 0 and 20, and ensures that the number of digits after the decimal point is restricted to that value.
