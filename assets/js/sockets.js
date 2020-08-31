import { handleNewUser, handleDisconnected } from "./notificatoins";
import { handleNewMsg } from "./chat";
import { handleBeganPath, handleBeganStroke, handleFilled } from "./paint";
import {
  handlePlayerUpdate,
  handleLeaderNotif,
  handleGameStarted,
  handleGameEnded,
  handleGameStarting,
} from "./players";

let socket = null;

export const getSocket = () => socket;

export const initSocket = (aSocket) => {
  const { events } = window;
  socket = aSocket;
  socket.on(events.newUser, handleNewUser);
  socket.on(events.disconnected, handleDisconnected);
  socket.on(events.newMsg, handleNewMsg);
  socket.on(events.beganPath, handleBeganPath);
  socket.on(events.beganStroke, handleBeganStroke);
  socket.on(events.filled, handleFilled);
  socket.on(events.playerUpdate, handlePlayerUpdate);
  socket.on(events.gameStarted, handleGameStarted);
  socket.on(events.leaderNotif, handleLeaderNotif);
  socket.on(events.gameEnded, handleGameEnded);
  socket.on(events.gameStarting, handleGameStarting);
};
