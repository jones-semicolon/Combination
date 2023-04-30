const input = document.querySelector('.content > input[type="tel"]');
const content = document.querySelector(".content > .grid");
const retry = document.querySelector('ion-icon[name="reload"]');
const menu = document.querySelector(".menu");
const settings = document.querySelector(".settings");
const help = document.querySelector(".help");
let gameOver = false;
let value = [];
let grid = [];
var row = 4;
let col = 10;
let index = 0;
let posIndex = 0;
let numIndex = 0;
let hardMode = false;

let numbers = generateNumbers(row);

let cells = null;
let rows = null;
reset();

content.addEventListener("click", () => {
  input?.focus();
});

input?.addEventListener("keyup", () => (input.value = ""));

retry?.addEventListener("click", () => {
  reset();
});

settings
  ?.querySelector('button:has(ion-icon[name="close-circle-outline"])')
  .addEventListener("click", () => {
    settings.setAttribute("aria-hidden", true);
  });

document
  .querySelector('nav button:has([name="settings"])')
  .addEventListener("click", () => {
    settings.setAttribute("aria-hidden", false);
  });
document
  .querySelector('nav button:has([name="help-circle-outline"])')
  .addEventListener("click", () => {
    help.setAttribute("aria-hidden", false);
  });

help?.querySelector(".top > button").addEventListener("click", () => {
  help.setAttribute("aria-hidden", true);
});

menu
  ?.querySelector('button:has(ion-icon[name="reload"])')
  .addEventListener("click", () => {
    menu.setAttribute("aria-hidden", true);
    reset();
  });

menu?.querySelector(".top > button").addEventListener("click", () => {
  menu.setAttribute("aria-hidden", true);
});

window.addEventListener("keyup", (e) => {
  switch (true) {
    case /[0-9]/.test(e.key):
      if (value.includes(e.key) || gameOver) return;
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
        menu.setAttribute("aria-hidden", false);
        menu.querySelector(".ans").innerText = numbers.join("");
        menu.querySelector(".top>h2").innerText = "You Won";
        gameOver = true;
        input.disabled = true;
      } else if (grid.length === col - 1) {
        menu.setAttribute("aria-hidden", false);
        menu.querySelector(".ans").innerText = numbers.join("");
        menu.querySelector(".top>h2").innerText = "You Lose";
        gameOver = true;
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
  content.innerHTML = "";
  for (let i = 0; i < col; i++) {
    const rowsEl = document.createElement("div");
    rowsEl.classList.toggle("row");
    rowsEl.id = i;
    content.appendChild(rowsEl);
    for (let x = 0; x < row; x++) {
      const colsEl = document.createElement("div");
      const div = document.createElement("div");
      colsEl.classList.toggle("cell");
      colsEl.appendChild(div);
      rowsEl.appendChild(colsEl);
      rowsEl.appendChild(colsEl);
    }
    cells = document.querySelectorAll(".cell");
    rows = document.querySelectorAll(".row");
    numbers = generateNumbers(row);
    index = 0;
    value = [];
    grid = [];
    gameOver = false;
    input.removeAttribute("disabled");
    cells.forEach((cell) => {
      cell.removeAttribute("aria-label");
      cell.childNodes[0].innerText = "";
    });
    rows.forEach((row) => {
      row.style.removeProperty("--unpositioned");
      row.style.removeProperty("--positioned");
    });
  }
}

//settingssssss
const length = document.querySelector(".settings > .length");
const tries = document.querySelector(".settings > .tries");
const modeBtn = document.querySelector(".settings > .mode input");

modeBtn.checked = hardMode;

rows.forEach((row) => {
  hardMode
    ? row.style.setProperty("--dis", "none")
    : row.style.setProperty("--dis", "grid");
});

modeBtn.addEventListener("click", () => {
  hardMode = !hardMode;
  rows.forEach((row) => {
    hardMode
      ? row.style.setProperty("--dis", "none")
      : row.style.setProperty("--dis", "grid");
  });
});

if (col <= 6) {
  tries.querySelector(
    'button:has([name="remove-circle-outline"])'
  ).disabled = true;
} else if (col >= 10) {
  tries.querySelector(
    'button:has([name="add-circle-outline"])'
  ).disabled = true;
}

if (row <= 4) {
  length.querySelector(
    'button:has([name="remove-circle-outline"])'
  ).disabled = true;
} else if (row >= 9) {
  length.querySelector(
    'button:has([name="add-circle-outline"])'
  ).disabled = true;
}

length
  .querySelector('button:has([name="remove-circle-outline"])')
  .addEventListener("click", () => {
    row -= 1;
    length.querySelector(".value").innerText = row;
    if (row <= 4) {
      length.querySelector(
        'button:has([name="remove-circle-outline"])'
      ).disabled = true;
    }
    length.querySelector(
      'button:has([name="add-circle-outline"])'
    ).disabled = false;
    reset();
  });
length
  .querySelector('button:has([name="add-circle-outline"])')
  .addEventListener("click", () => {
    row += 1;
    length.querySelector(".value").innerText = row;
    if (row >= 6) {
      length.querySelector(
        'button:has([name="add-circle-outline"])'
      ).disabled = true;
    }
    length.querySelector(
      'button:has([name="remove-circle-outline"])'
    ).disabled = false;
    reset();
  });

tries
  .querySelector('button:has([name="remove-circle-outline"])')
  .addEventListener("click", () => {
    col -= 1;
    tries.querySelector(".value").innerText = col;
    if (col <= 6) {
      tries.querySelector(
        'button:has([name="remove-circle-outline"])'
      ).disabled = true;
    }
    tries.querySelector(
      'button:has([name="add-circle-outline"])'
    ).disabled = false;
    reset();
  });
tries
  .querySelector('button:has([name="add-circle-outline"])')
  .addEventListener("click", () => {
    col += 1;
    tries.querySelector(".value").innerText = col;
    if (col >= 12) {
      tries.querySelector(
        'button:has([name="add-circle-outline"])'
      ).disabled = true;
    }
    tries.querySelector(
      'button:has([name="remove-circle-outline"])'
    ).disabled = false;
    reset();
  });
