document
  .getElementById("buttons-holder")
  .addEventListener("click", handleClick);

let flag;

setTimeout(() => {
  document.getElementById("result").value = "Hello user :)";
  document.getElementById("result").style.fontSize = "35px";
  flag = true;
}, 1000);

setTimeout(() => {
  document.getElementById("result").value = "Ready to operate!";
  document.getElementById("result").style.fontSize = "35px";
}, 3000);

setTimeout(() => {
  flag = false;
  document.getElementById("result").value.length = 0;
  document.getElementById("result").value = "";
  document.getElementById("result").style.fontSize = "40px";
}, 5000);

let pattern = /[0-9]+/g;
let finalArr = [];
let oldValue;

function handleClick(e) {
  if (e.target.tagName !== "A") {
    return;
  }

  if (e.target.textContent === "=") {
    let operationsArr = document
      .getElementById("result")
      .value.split(pattern)
      .filter((x) => x !== "");

    let numbers = document
      .getElementById("result")
      .value.split("")
      .map(Number)
      .join("")
      .split("NaN");

    for (let i = 0; i < operationsArr.length; i++) {
      finalArr.push(numbers[i]);
      finalArr.push(operationsArr[i]);
    }

    finalArr.push(numbers[numbers.length - 1]);
    finalArr = finalArr.filter((x) => x !== "");

    while (finalArr.includes(".")) {
      let index = finalArr.indexOf(".");
      let leftSide = finalArr[index - 1];
      let rightSide = finalArr[index + 1];

      let float = [leftSide, rightSide];
      let floatingNumber = float.join(".");

      finalArr.splice(index - 1, 3, floatingNumber);
    }

    if (finalArr[0] === "-") {
      let slice = finalArr.slice(0, 2);
      slice = slice.join("");
      finalArr.splice(0, 2, slice);
    }

    for (let i = 0; i < operationsArr.length; i++) {
      evaluate(finalArr);
    }

    if (finalArr.join("").length > 5) {
      let temp = Number(finalArr.join("")).toFixed(5);
      document.getElementById("result").value = temp;
    } else {
      document.getElementById("result").value = finalArr.join("");
    }

    finalArr = [];

    setTimeout(() => {
      document.getElementById("result").style.fontSize = "40px";
    }, 100);

    return;
  }

  if (e.target.textContent === "C") {
    document.getElementById("result").value = "";
    return;
  }

  let temp = document.getElementById("result").value;
  let helper = temp.split("");
  helper.pop();
  temp = helper.join("");

  if (!flag) {
    if (document.getElementById("result").value.length < 11) {
      setTimeout(() => {
        document.getElementById("result").style.fontSize = "40px";
        return;
      }, 1000);
    } else if (document.getElementById("result").value.length < 15) {
      setTimeout(() => {
        document.getElementById("result").style.fontSize = "35px";
      }, 1000);
    } else if (document.getElementById("result").value.length < 18) {
      setTimeout(() => {
        document.getElementById("result").style.fontSize = "30px";
      }, 1000);
    } else {
      setTimeout(() => {
        document.getElementById("result").value = "Thats the limit";
      }, 500);
      setTimeout(() => {
        document.getElementById("result").value = temp;
      }, 3000);
    }
  }

  if (
    e.target.textContent === "+" ||
    e.target.textContent === "-" ||
    e.target.textContent === "%" ||
    e.target.textContent === "/" ||
    e.target.textContent === "x" ||
    e.target.textContent === "."
  ) {
    const el = document.getElementById("result").value.split("").pop();

    let temp = document.getElementById("result").value;
    if (
      el === "+" ||
      el === "/" ||
      el === "-" ||
      el === "x" ||
      el === "%" ||
      e.target.textContent === "="
    ) {
      setTimeout(() => {
        document.getElementById("result").style.fontSize = "23px";
        document.getElementById("result").value = "Please insert a number!";
      }, 1000);
      setTimeout(() => {
        document.getElementById("result").value = temp;
        document.getElementById("result").style.fontSize = "40px";
      }, 2000);
      return;
    }
  }

  if (!flag) {
    document.getElementById("result").value += e.target.textContent;
  }
}

function evaluate(arr) {
  if (arr.includes("x")) {
    operations("x", arr);
  }

  if (arr.includes("/")) {
    operations("/", arr);
  }

  if (arr.includes("%")) {
    operations("%", arr);
  }

  if (arr.includes("+")) {
    operations("+", arr);
  }

  if (arr.includes("-")) {
    operations("-", arr);
  }

  return arr;
}

function operations(operator, arr) {
  let index = arr.indexOf(operator);
  let firstVal = Number(arr[index - 1]);
  let secondVal = Number(arr[index + 1]);

  const formulas = {
    x: firstVal * secondVal,
    "/": firstVal / secondVal,
    "%": (firstVal / 100) * secondVal,
    "+": firstVal + secondVal,
    "-": firstVal - secondVal,
  };

  let temp = formulas[operator];

  arr.splice(index - 1, 3, temp);
}
