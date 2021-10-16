//DOM selector
const display1E = document.querySelector(".display-1");
const display2E = document.querySelector(".display-2");
const tempResultE = document.querySelector(".temp-result");
const numbersE = document.querySelectorAll(".number");
const operationE = document.querySelectorAll(".operation");
const equalE = document.querySelector(".equal");
const clearAllE = document.querySelector(".all-clear");
const clearLastE = document.querySelector(".last-entity-clear");

//variable to store temp value
let dis1Num = "";
let dis2Num = "";
let result = null;
let lastOperation = "";
let haveDot = false;

//add event for each number button
numbersE.forEach((number) => {
  number.addEventListener("click", (e) => {
    //check if e already had a dot
    if (e.target.innerText === "." && !haveDot) {
      haveDot = true;
    } else if (e.target.innerText === "." && haveDot) {
      return;
    }
    //add the event to variable display 2 and show it
    dis2Num += e.target.innerText;
    display2E.innerText = dis2Num;
  });
});

//add event click for operation
operationE.forEach((operation) => {
  operation.addEventListener("click", (e) => {
    if (!dis2Num) return; //cannot add operation when there is no number
    haveDot = false; //we can use dot again for the next number
    const operationName = e.target.innerText;
    //check condition then display the result
    if (dis1Num && dis2Num && lastOperation) {
      calculation();
    } else {
      result = parseFloat(dis2Num);
    }
    clearVar(operationName);
    lastOperation = operationName;
  });
});

//clear the display
const clearVar = (name = "") => {
  dis1Num += dis2Num + " " + name + " ";
  display1E.innerText = dis1Num;
  display2E.innerText = "";
  dis2Num = "";
  tempResultE.innerText = result;
};

//calculation function
const calculation = () => {
  if (lastOperation === "x") {
    result = parseFloat(result) * parseFloat(dis2Num);
  } else if (lastOperation === "+") {
    result = parseFloat(result) + parseFloat(dis2Num);
  } else if (lastOperation === "-") {
    result = parseFloat(result) - parseFloat(dis2Num);
  } else if (lastOperation === "/") {
    result = parseFloat(result) / parseFloat(dis2Num);
  } else if (lastOperation === "%") {
    result = parseFloat(result) % parseFloat(dis2Num);
  }
};

//add event click for equal operation
equalE.addEventListener("click", () => {
  if (!dis2Num || !dis1Num) return;
  haveDot = false;
  calculation();
  clearVar();
  display2E.innerText = result;
  tempResultE.innerText = "";
  dis2Num = result;
  dis1Num = "";
});

//add event click for button C
clearAllE.addEventListener("click", () => {
  dis1Num = "";
  dis2Num = "";
  display1E.innerText = "";
  display2E.innerText = "";
  result = "";
  tempResultE.innerText = "";
});

//add event click for button CE
clearLastE.addEventListener("click", () => {
  display2E.innerText = "";
  dis2Num = "";
});

//add event for keys on keyboard
window.addEventListener("keydown", (e) => {
  if (
    e.key === "0" ||
    e.key === "1" ||
    e.key === "2" ||
    e.key === "3" ||
    e.key === "4" ||
    e.key === "5" ||
    e.key === "6" ||
    e.key === "7" ||
    e.key === "8" ||
    e.key === "9" ||
    e.key === "."
  ) {
    clickButtonEl(e.key);
  } else if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "%") {
    clickOperation(e.key);
  } else if (e.key === "*") {
    clickOperation("x");
  } else if (e.key == "Enter" || e.key === "=") {
    clickEqual();
  }
});

//make the key works same as button click

const clickButtonEl = (key) => {
  numbersE.forEach((button) => {
    if (button.innerText === key) {
      button.click();
    }
  });
};

const clickOperation = (key) => {
  operationE.forEach((operation) => {
    if (operation.innerText === key) {
      operation.click();
    }
  });
};

const clickEqual = () => {
  equalE.click();
};
