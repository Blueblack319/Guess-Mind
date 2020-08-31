import events from "./events";
import { chooseWord } from "../assets/js/word";
import { showTimer, clearTimer } from "../assets/js/timer";

let sockets = [];
let inProgress = false;
let leader = null;
let word = null;
let timeout = null;

const chooseLeader = () => sockets[Math.floor(Math.random() * sockets.length)];

const socketController = (socket, io) => {
  const broadcast = (event, data) => socket.broadcast.emit(event, data);
  const superBroadcast = (event, data) => io.emit(event, data);
  const sendPlayerUpdate = () =>
    superBroadcast(events.playerUpdate, { sockets });
  const startGame = () => {
    if (inProgress === false) {
      inProgress = true;
      leader = chooseLeader();
      word = chooseWord();
      superBroadcast(events.gameStarting);
      showTimer(5);
      setTimeout(() => {
        clearTimer();
        superBroadcast(events.gameStarted);
        io.to(leader.id).emit(events.leaderNotif, { word });
        showTimer(30);
        timeout = setTimeout(endGame, 30500);
      }, 5500);
    }
  };
  const endGame = () => {
    inProgress = false;
    superBroadcast(events.gameEnded);
    clearTimer();
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    if (sockets.length > 1) {
      setTimeout(() => startGame(), 2000);
    }
  };
  const addPoint = (id) => {
    clearTimeout(timeout);
    sockets = sockets.map((socket) => {
      if (socket.id === id) {
        socket.score += 10;
      }
      return socket;
    });
    sendPlayerUpdate();
  };

  socket.on(events.setNickname, ({ nickname }) => {
    socket.nickname = nickname;
    broadcast(events.newUser, { nickname });
    sockets.push({ id: socket.id, nickname, score: 0 });
    sendPlayerUpdate();
    if (sockets.length > 1) {
      startGame();
    }
  });
  socket.on(events.disconnect, () => {
    broadcast(events.disconnected, { nickname: socket.nickname });
    sockets = sockets.filter((aSocket) => aSocket.id !== socket.id);
    if (sockets.length === 1) {
      endGame();
    } else if (leader) {
      if (socket.id === leader.id) {
        endGame();
      }
    }
    sendPlayerUpdate();
  });
  socket.on(events.sendMsg, ({ message }) => {
    if (message === word) {
      superBroadcast(events.newMsg, {
        message: `Winner is ${socket.nickname}, word was ${word}!!`,
        nickname: "Bot",
      });
      addPoint(socket.id);
      endGame();
    } else {
      broadcast(events.newMsg, {
        message,
        nickname: socket.nickname,
      });
    }
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
