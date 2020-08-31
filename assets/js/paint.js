import { getSocket } from "./sockets";

const canvas = document.getElementById("js-canvas");
const ctx = canvas.getContext("2d");
const range = document.getElementById("js-thickness");
const colors = document.querySelectorAll("#js-color");
const modeBtn = document.getElementById("js-changeMode");
const saveBtn = document.getElementById("js-save");

let paint = false;
let thickness = 1;
let color = "black";
let mode = "PAINT";

canvas.width = 750;
canvas.height = 550;

const startPainting = () => {
  paint = true;
};

const stopPainting = () => {
  paint = false;
};

const beganPath = (x, y) => {
  ctx.beginPath();
  ctx.moveTo(x, y);
};

const beganStroke = (x, y) => {
  ctx.lineTo(x, y);
  ctx.stroke();
};

const painting = (event) => {
  const x = event.offsetX;
  const y = event.offsetY;
  ctx.strokeStyle = color;
  if (paint !== true) {
    beganPath(x, y);
    getSocket().emit(window.events.beginPath, { x, y });
  } else {
    beganStroke(x, y);
    getSocket().emit(window.events.beginStroke, { x, y });
  }
};

const changeThickness = (event) => {
  thickness = event.target.value;
  ctx.lineWidth = thickness;
};

const changeColor = (event) => {
  const colorBtn = event.target;
  color = window.getComputedStyle(colorBtn).backgroundColor;
};

const changeBoardColor = () => {
  if (mode === "FILL") {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
};

const changeMode = (event) => {
  mode = event.target.innerText;
  if (mode == "PAINT") {
    event.target.innerText = "FILL";
  } else {
    event.target.innerText = "PAINT";
  }
};

const saveFile = () => {
  const downloadLink = document.createElement("a");
  downloadLink.download = "Paint✅.png";
  downloadLink.href = canvas.toDataURL();
  downloadLink.click();
};

if (canvas) {
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("mousemove", painting);
  canvas.addEventListener("click", changeBoardColor);
  range.addEventListener("input", changeThickness);
  colors.forEach((color) => {
    color.addEventListener("click", changeColor);
  });
  modeBtn.addEventListener("click", changeMode);
  saveBtn.addEventListener("click", saveFile);
}

export const handleBeganPath = ({ x, y }) => beganPath(x, y);
export const handleBeganStroke = ({ x, y }) => beganStroke(x, y);
