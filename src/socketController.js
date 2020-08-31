import events from "./events";
import { chooseWord } from "../assets/js/word";

let sockets = [];
let inProgress = false;
let leader = null;
let word = null;

const chooseLeader = () => sockets[Math.floor(Math.random() * sockets.length)];

const socketController = (socket, io) => {
  const broadcast = (event, data) => socket.broadcast.emit(event, data);
  const superBroadcast = (event, data) => io.emit(event, data);
  const sendPlayerUpdate = () =>
    superBroadcast(events.playerUpdate, { sockets });
  const startGame = () => {
    if (sockets.length >= 2) {
      inProgress = true;
      leader = chooseLeader();
      word = chooseWord();
      setTimeout(() => {
        superBroadcast(events.gameStarted);
        io.to(leader.id).emit(events.leaderNotif, { word });
      }, 2000);
    }
  };
  const endGame = () => {
    if ((sockets.lenght = 1 || inProgress == false)) {
    }
  };

  socket.on(events.setNickname, ({ nickname }) => {
    socket.nickname = nickname;
    broadcast(events.newUser, { nickname });
    sockets.push({ id: socket.id, nickname, score: 0 });
    sendPlayerUpdate();
    startGame();
  });
  socket.on(events.disconnect, () => {
    endGame();
    broadcast(events.disconnected, { nickname: socket.nickname });
    sockets = sockets.filter((aSocket) => aSocket.id !== socket.id);
    sendPlayerUpdate();
  });
  socket.on(events.sendMsg, ({ message }) => {
    broadcast(events.newMsg, {
      message,
      nickname: socket.nickname,
    });
  });
  socket.on(events.beginPath, ({ x, y }) =>
    broadcast(events.beganPath, { x, y })
  );
  socket.on(events.beginStroke, ({ x, y, color }) =>
    broadcast(events.beganStroke, { x, y, color })
  );
  socket.on(events.fill, ({ color }) => broadcast(events.filled, { color }));
};

export default socketController;
