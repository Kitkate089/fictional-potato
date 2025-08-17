function display(value) {
  document.getElementById("result").value += value;
}

function clearScreen() {
  document.getElementById("result").value = "";
}

function backspace() {
  var value = document.getElementById("result").value;
  document.getElementById("result").value = value.substr(0, value.length - 1);
}

function calculate() {
  var p = document.getElementById("result").value;
  try {
    var q = safeCalculate(p);
    document.getElementById("result").value = q;
  } catch (e) {
    document.getElementById("result").value = "Error";
  }
}

function safeCalculate(expression) {
  // This is a simple and safe alternative to eval().
  // It only handles basic arithmetic operations.
  // It does not handle operator precedence.
  // For a more robust solution, a proper parser and evaluator would be needed.

  // Replace all characters that are not numbers, operators, or a decimal point.
  expression = expression.replace(/[^0-9+\-*/.]/g, '');

  // A regular expression to validate the expression.
  // This is a simple regex and may not cover all edge cases.
  const regex = /^[0-9]+([+\-*/][0-9]+)*$/;
  if (!regex.test(expression)) {
      // If the expression is invalid, we will try to fix it.
      // This is a simple fix and may not cover all edge cases.
      expression = expression.replace(/([+\-*/]){2,}/g, '$1');
  }

  try {
      return new Function('return ' + expression)();
  } catch (e) {
      return "Error";
  }
}

window.addEventListener('keydown', function(event) {
  const key = event.key;
  if (key >= '0' && key <= '9') {
    display(key);
  } else if (key === '+' || key === '-' || key === '*' || key === '/') {
    display(key);
  } else if (key === '.') {
    display(key);
  } else if (key === 'Enter') {
    calculate();
  } else if (key === 'Backspace') {
    backspace();
  } else if (key === 'c' || key === 'C') {
    clearScreen();
  }
});
