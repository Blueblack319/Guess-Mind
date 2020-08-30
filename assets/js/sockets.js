import { handleNewUser, handleDisconnected } from "./notificatoins";
import { handleNewMsg } from "./chat";

let socket = null;

export const getSocket = () => socket;

export const updateSocket = (aSocket) => (socket = aSocket);

export const initSocket = (aSocket) => {
  const { events } = window;
  updateSocket(aSocket);
  socket.on(events.newUser, handleNewUser);
  socket.on(events.disconnected, handleDisconnected);
  socket.on(events.newMsg, handleNewMsg);
};