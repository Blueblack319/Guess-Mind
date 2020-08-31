import {
  disableCanvas,
  hideControls,
  enableCanvas,
  showControls,
} from "./paint";

const players = document.getElementById("js-players");
const notifs = document.getElementById("js-notifs");

export const handlePlayerUpdate = ({ sockets }) => {
  players.innerHTML = "";
  sockets.forEach((socket) => {
    const playerElement = document.createElement("div");
    playerElement.innerText = `${socket.nickname} : ${socket.score}`;
    players.appendChild(playerElement);
  });
};

const setNotif = (text = "") => {
  notifs.innerText = text;
};

export const handleGameStarted = () => {
  setNotif();
  disableCanvas();
  hideControls();
};

export const handleLeaderNotif = ({ word }) => {
  setNotif(word);
  enableCanvas();
  showControls();
};
