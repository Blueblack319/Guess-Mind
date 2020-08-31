import { getSocket } from "./sockets";

const sendMsgForm = document.getElementById("js-sendMsgForm");
const messages = document.getElementById("js-messages");

const appendMsg = (text, nickname) => {
  const li = document.createElement("li");
  li.innerHTML = `
    <span class="author ${nickname ? "others" : "self"}">
    ${nickname ? nickname : "You"}:
    </span>${text}
    `;
  messages.appendChild(li);
};

export const handleNewMsg = ({ message, nickname }) =>
  appendMsg(message, nickname);

const handleSubmit = (event) => {
  event.preventDefault();
  const input = sendMsgForm.querySelector("input");
  const { value } = input;

  getSocket().emit(window.events.sendMsg, { message: value });

  input.value = "";
  appendMsg(value);
};

if (sendMsgForm) {
  sendMsgForm.addEventListener("submit", handleSubmit);
}
