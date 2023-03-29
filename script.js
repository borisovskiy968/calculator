// Min abs val 0.000001, max abs val 99999999
// Init screen
const screen = document.querySelector('.screen');
// Init input
const input = document.querySelectorAll('.input');
input.forEach((inp) => inp.addEventListener('click', processInput));
// Init operate
const operate = document.querySelectorAll('.operate');
operate.forEach((op) => op.addEventListener('click', processOperate));
// Init clear
const clear = document.querySelector('.clear');
clear.addEventListener('click', processClear);
// Init handleInput, operand, result and operator
let handleInput, operand, result, operator;
processClear();
// Process clearance of the memory and the screen
function processClear() {
  clearMemory();
  emptyScreen();
}
// Clear the memory
function clearMemory(e) {
  handleInput = true;
  operand = undefined;
  result = undefined;
  operator = undefined;
}
// Empty the screen
function emptyScreen() {
  screen.textContent = '0';
}
// Process digits, decimal point, negation and deletion inputs
function processInput(e) {
  // Switch from operate to input mode
  if (handleInput === false) {
    if (operator !== 'operate calculate') {
      emptyScreen();
    }
    handleInput = true;
  }
  // Populate screen with keyboard input
  populateScreen(e.target.textContent);
}
// Process multiplication, division, addition and subtraction operations
function processOperate(e) {
  // Switch from input to operate mode
  if (handleInput === true) {
    if (result === undefined) {
      setResult();
    } else if (operand === undefined) {
      setOperand();
    }
    if (operand !== undefined && result !== undefined) {
      calculateResult();
      operand = undefined;
      screen.textContent = result;
    }
    handleInput = false;
  }
  operator = e.target.className;
}
// Populate screen with input
function populateScreen(input) {
  if ((screen.textContent.charAt(0) === '-' && screen.textContent.length <= 8) ||
    (screen.textContent.charAt(0) !== '-' && screen.textContent.length <= 7) ||
    (input === '+/-') || (input === 'DEL')) {
    if ((screen.textContent === '0' || screen.textContent === '-0') &&
      (input !== '.' && input !== '+/-')) {
      screen.textContent = screen.textContent.slice(0, -1);
    }

    if (input !== '+/-' && input !== 'DEL') {
      if (input !== '.' || screen.textContent.indexOf('.') === -1) {
        screen.textContent += input;
      }
    } else {
      if (input === '+/-') {
        if (screen.textContent.charAt(0) === '-') {
          screen.textContent = screen.textContent.slice(1);
        } else {
          screen.textContent = '-' + screen.textContent;
        }
      }
      
      if (input === 'DEL') {
        if ((screen.textContent.charAt(0) === '-' && screen.textContent.length > 2) ||
          (screen.textContent.charAt(0) !== '-' && screen.textContent.length > 1)) {
          screen.textContent = screen.textContent.slice(0, -1);
        } else {
          screen.textContent = '0';
        }
      }
    }
  }
}
// Set the first operand
function setOperand() {
  operand = +screen.textContent;
}
// Set the second operand
function setResult() {
  result = +screen.textContent;
}
// Calculate the result
function calculateResult() {
  switch (operator) {
    case 'operate multiply':
      result *= operand;
      break;
    case 'operate divide':
      result /= operand;
      break;
    case 'operate add':
      result += operand;
      break;
    case 'operate subtract':
      result -= operand;
      break;
    case 'operate calculate':
      result = operand;
      break;
  }
}
