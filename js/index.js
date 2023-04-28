const input = document.querySelector("input");
const content = document.querySelector(".content");
const retry = document.querySelector('ion-icon[name="reload"]');
let gameFreeze = false;
let value = [];
let grid = [];
let row = 4;
let col = 8;
let index = 0;
let posIndex = 0;
let numIndex = 0;

let numbers = generateNumbers(row);

for (let i = 0; i < col; i++) {
  const rows = document.createElement("div");
  rows.classList.toggle("row");
  rows.id = i;
  content.appendChild(rows);
  for (let x = 0; x < row; x++) {
    const cols = document.createElement("div");
    const div = document.createElement("div");
    cols.classList.toggle("cell");
    cols.appendChild(div);
    rows.appendChild(cols);
  }
}
const cells = document.querySelectorAll(".cell");
const rows = document.querySelectorAll(".row");

content.addEventListener("click", () => {
  input?.focus();
});

input?.addEventListener("keyup", () => (input.value = ""));

retry?.addEventListener("click", () => {
  reset();
});

window.addEventListener("keyup", (e) => {
  switch (true) {
    case /[0-9]/.test(e.key):
      if (value.includes(e.key) || gameFreeze) return;
      value.length < row && value.push(e.key);
      break;
    case e.key === "Backspace":
      value.length && value.pop();
      break;
    case e.key === "Enter":
      if (value.length !== row) return;
      if (
        value.map((val) => val).join("") === numbers.map((num) => num).join("")
      ) {
        console.log("You won");
        gameFreeze = true;
        input.disabled = true;
      } else if (grid.length === col - 1) {
        console.log("You Lose");
        gameFreeze = true;
        input.disabled = true;
      }
      checkNumbers();
      rows[index].style.setProperty("--unpositioned", `"${numIndex}"`);
      rows[index].style.setProperty("--positioned", `"${posIndex}"`);
      index += 1;
      value = [];
      break;
    default:
      return;
  }
  rows[index]?.childNodes.forEach((cell, key) => {
    cell.childNodes[0].innerText = value[key] === undefined ? "" : value[key];
  });
});

function generateNumbers(length) {
  let result = [];

  while (result.length < length) {
    const digit = Math.floor(Math.random() * 10);
    if (!result.includes(digit)) {
      result.push(digit);
    }
  }

  return result;
}

function checkNumbers() {
  numIndex = 0;
  posIndex = 0;
  grid.push(value);
  grid[index]?.forEach((val, i) => {
    rows[index].childNodes[i].setAttribute("aria-label", "none");
    if (numbers.includes(parseInt(val))) {
      numIndex += 1;
      if (i === numbers.indexOf(parseInt(val))) {
        posIndex += 1;
      }
    }
    rows[index].childNodes[i].childNodes[0].innerText = val;
  });
}

function reset() {
  numbers = generateNumbers(row);
  index = 0;
  value = [];
  grid = [];
  gameFreeze = false;
  input.removeAttribute("disabled");
  cells.forEach((cell) => {
    cell.removeAttribute("aria-label");
    cell.childNodes[0].innerText = "";
  });
  rows.forEach((row) => {
  	row.style.removeProperty("--unpositioned")
  	row.style.removeProperty("--positioned")
  })
}
