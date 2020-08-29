// eslint-disable-next-line no-undef
const socket = io("/");

// eslint-disable-next-line no-unused-vars
const sendMessage = (message) => {
  socket.emit("newMessage", { message });
};

// eslint-disable-next-line no-unused-vars
const setNickname = (nickname) => {
  socket.emit("setNickname", { nickname });
};

const handleMessageNotif = (data) => {
  const { message, nickname } = data;
  console.log(`${nickname}: ${message}`);
};

socket.on("messageNotif", handleMessageNotif);
