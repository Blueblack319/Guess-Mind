import { getSocket } from "./sockets";

const canvas = document.getElementById("js-canvas");
const ctx = canvas.getContext("2d");
const range = document.getElementById("js-thickness");
const colors = document.querySelectorAll("#js-color");
const modeBtn = document.getElementById("js-changeMode");
const saveBtn = document.getElementById("js-save");
const controls = document.getElementById("js-controls");

let paint = false;
let thickness = 1;
let color = "black";
let mode = "PAINT";

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

const beganStroke = (x, y, color = null) => {
  const currentColor = ctx.strokeStyle;
  if (color !== null) {
    ctx.strokeStyle = color;
  }
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.strokeStyle = currentColor;
};

const painting = (event) => {
  const x = event.offsetX;
  const y = event.offsetY;

  if (paint !== true) {
    beganPath(x, y);
    getSocket().emit(window.events.beginPath, { x, y });
  } else {
    beganStroke(x, y);
    getSocket().emit(window.events.beginStroke, { x, y, color });
  }
};

const changeThickness = (event) => {
  thickness = event.target.value;
  ctx.lineWidth = thickness;
};

const changeColor = (event) => {
  const colorBtn = event.target;
  color = colorBtn.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
};

const filled = (broadColor = null) => {
  if (broadColor !== null) {
    ctx.fillStyle = broadColor;
  }
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

const changeBoardColor = () => {
  if (mode === "FILL") {
    getSocket().emit(window.events.fill, { color });
    filled();
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

export const enableCanvas = () => {
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("mousemove", painting);
  canvas.addEventListener("click", changeBoardColor);
};

export const disableCanvas = () => {
  canvas.removeEventListener("mousedown", startPainting);
  canvas.removeEventListener("mouseup", stopPainting);
  canvas.removeEventListener("mouseleave", stopPainting);
  canvas.removeEventListener("mousemove", painting);
  canvas.removeEventListener("click", changeBoardColor);
};

export const hideControls = () => {
  controls.style.display = "none";
};

export const showControls = () => {
  controls.style.display = "flex";
};

export const handleBeganPath = ({ x, y }) => beganPath(x, y);
export const handleBeganStroke = ({ x, y, color }) => beganStroke(x, y, color);
export const handleFilled = ({ color }) => filled(color);

if (canvas) {
  enableCanvas();
  range.addEventListener("input", changeThickness);
  colors.forEach((color) => {
    color.addEventListener("click", changeColor);
  });
  modeBtn.addEventListener("click", changeMode);
  saveBtn.addEventListener("click", saveFile);
}
