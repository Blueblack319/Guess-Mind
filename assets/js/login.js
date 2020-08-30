const { initSocket } = require("./sockets");

const loginForm = document.getElementById("js-loginForm");
const body = document.querySelector("body");

const NICKNAME = "nickname";
const LOGGED_IN = "loggedIn";
const LOGGED_OUT = "loggedOut";

const nickname = localStorage.getItem(NICKNAME);

const login = (nickname) => {
  // eslint-disable-next-line no-undef
  const socket = io();
  socket.emit(window.events.setNickname, { nickname });
  initSocket(socket);
};

if (nickname === null) {
  body.className = LOGGED_OUT;
} else {
  body.className = LOGGED_IN;
  login(nickname);
}

const handleFormSubmit = (event) => {
  event.preventDefault();
  const input = loginForm.querySelector("input");
  const { value } = input;
  input.value = "";
  localStorage.setItem(NICKNAME, value);
  body.className = LOGGED_IN;
  login(value);
};

loginForm.addEventListener("submit", handleFormSubmit);
