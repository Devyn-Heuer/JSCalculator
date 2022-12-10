let numberInputs = document.querySelectorAll(".input:not(.c)");
let operatorInputs = document.querySelectorAll(".operator");
let previousView = document.querySelector(".previous");
let displayScreen = document.querySelector(".current");
let equalsButton = document.querySelector("#Equals");
let resetButton = document.querySelector("#reset");
let deleteButton = document.querySelector("#Backspace");
let isCalculated = false;
let currentNumber = "";
let previousInput = "";
let totalValue = undefined;
let currentOperator;
let decimalClicked = false;

// initialize number buttons
numberInputs.forEach(function (number) {
  number.addEventListener("click", function (evt) {
    if (isCalculated) {
      isCalculated = false;
      resetClicked();
    }
    if (number.getAttribute("id") == ".") {
      if (!decimalClicked) {
        decimalClicked = true;
        let value = number.getAttribute("id");
        currentNumber += value;
        displayScreen.textContent = currentNumber;
      }
    } else {
      let value = number.getAttribute("id");
      currentNumber += value;
      displayScreen.textContent = currentNumber;
    }
  });
});

// initialize operators
operatorInputs.forEach(function (operator) {
  operator.addEventListener("click", function (evt) {
    if (totalValue == undefined) {
      totalValue = currentNumber;
    } else {
      operate(totalValue, currentNumber);
    }
    currentOperator = operator.getAttribute("id");
    previousInput = currentNumber;
    currentNumber = "";
    displayScreen.textContent = currentNumber;
    if (!isCalculated) {
      previousView.textContent = totalValue + currentOperator;
    } 
    isCalculated = false;
    decimalClicked = false;
  });
});

// reset
resetButton.addEventListener("click", function (evt) {
  resetClicked();
});

// equals
equalsButton.addEventListener("click", function (evt) {
  isCalculated = true;
  operate(totalValue, currentNumber);
  if (isCalculated) {
    previousView.textContent = previousView.textContent + currentNumber;
  }
});

// delete button
deleteButton.addEventListener('click', function (evt){
    displayScreen.textContent = currentNumber.slice(0,-1);
    currentNumber = displayScreen.textContent;
})

function operate(num1 = 0, num2 = 0) {
  if ((num1 != NaN || num2 != "") && currentOperator != undefined) {
    if (num2 == 0 && currentOperator == "/") {
      displayScreen.textContent = "We don't do that here!";
    } else {
      displayScreen.textContent = Math.round(eval(num1 + currentOperator + num2) * 100) / 100;
      totalValue = parseFloat(displayScreen.textContent);
    }
  }
}

function resetClicked() {
  totalValue = undefined;
  currentNumber = "";
  previousInput = "";
  displayScreen.textContent = currentNumber;
  previousView.textContent = previousInput;
}
// allow keyboard functionality
document.getElementsByTagName('html')[0].focus()
document.getElementsByTagName('html')[0].addEventListener('keydown', function (e){
  if(e.key >= '0' || e.key <= '9' || e.key == 'Backspace' || e.key == '=' || e.key == 'Enter'){
    if(e.key == '=' || e.key == 'Enter'){
      equalsButton.click();
    } else if(e.key == 'c' || e.key == 'Escape'){
      resetButton.click();
    } else {
      document.getElementById(e.key).click();
    }
  }
})