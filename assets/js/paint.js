const canvas = document.getElementById("js-canvas");
const ctx = canvas.getContext("2d");

let paint = false;

const startPainting = () => {
  paint = true;
};

const stopPainting = () => {
  paint = false;
};

const painting = (event) => {
  const x = event.offsetX;
  const y = event.offsetY;
  if (paint !== true) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
};

if (canvas) {
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("mousemove", painting);
}
