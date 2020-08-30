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

const handleSubmit = (event) => {
  event.preventDefault();
  const input = sendMsgForm.querySelector("input");
  const { value } = input;
  input.value = "";
  appendMsg(value);
};

if (sendMsgForm) {
  sendMsgForm.addEventListener("submit", handleSubmit);
}
