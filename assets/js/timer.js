const timer = document.getElementById("js-timer");

let limit = null;
let timerout;

const countdown = (time) => {
  if (limit === null) {
    limit = time;
    timer.classList.remove("emergency");
  } else {
    limit -= 1;
    if (limit <= 2) {
      timer.classList.add("emergency");
    }
  }

  timer.innerText = limit.toString();
};

export const handleShowTimer = ({ time }) => {
  timerout = setInterval(() => {
    countdown(time);
  }, 1000);
};

export const handleClearTimer = () => {
  clearInterval(timerout);
  limit = null;
};
