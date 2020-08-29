import { handleMessageNotif } from "./chat";

// eslint-disable-next-line no-undef
const socket = io();

// eslint-disable-next-line no-unused-vars
const sendMessage = (message) => {
  socket.emit("newMessage", { message });
};

// eslint-disable-next-line no-unused-vars
const setNickname = (nickname) => {
  socket.emit("setNickname", { nickname });
};

socket.on("messageNotif", handleMessageNotif);
