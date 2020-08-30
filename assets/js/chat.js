<<<<<<< HEAD
import { getSocket } from "./sockets";

=======
>>>>>>> f961731b3258b433560ec2bf63b6ba6bf3a18961
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

<<<<<<< HEAD
export const handleNewMsg = ({ message, nickname }) =>
  appendMsg(message, nickname);

=======
>>>>>>> f961731b3258b433560ec2bf63b6ba6bf3a18961
const handleSubmit = (event) => {
  event.preventDefault();
  const input = sendMsgForm.querySelector("input");
  const { value } = input;
<<<<<<< HEAD
  getSocket().emit(window.events.sendMsg, { message: value });
=======
>>>>>>> f961731b3258b433560ec2bf63b6ba6bf3a18961
  input.value = "";
  appendMsg(value);
};

if (sendMsgForm) {
  sendMsgForm.addEventListener("submit", handleSubmit);
}
