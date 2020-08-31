const timer = document.getElementById("js-timer");

let limit = 1;
let timerout;
let countdown;

countdown = (time) => {
  if (limit === 1) {
    limit = time;
  } else {
    limit -= 1;
  }
  timer.innerHTML = limit;
};

export const showTimer = (time) =>
  (timerout = setInterval(() => countdown(time), 1000));

export const clearTimer = () => {
  limit = 1;
  clearInterval(timerout);
};
