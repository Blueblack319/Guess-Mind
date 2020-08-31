import { handleNewUser, handleDisconnected } from "./notificatoins";
import { handleNewMsg } from "./chat";
import { handleBeganPath, handleBeganStroke } from "./paint";

let socket = null;

export const getSocket = () => socket;

export const updateSocket = (aSocket) => (socket = aSocket);

export const initSocket = (aSocket) => {
  const { events } = window;
  updateSocket(aSocket);
  socket.on(events.newUser, handleNewUser);
  socket.on(events.disconnected, handleDisconnected);
  socket.on(events.newMsg, handleNewMsg);
  socket.on(events.beganPath, handleBeganPath);
  socket.on(events.beganStroke, handleBeganStroke);
};
