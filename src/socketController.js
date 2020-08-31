import events from "./events";

const socketController = (socket) => {
  socket.on(events.setNickname, ({ nickname }) => {
    socket.nickname = nickname;
    socket.broadcast.emit(events.newUser, { nickname });
  });
  socket.on(events.disconnect, () => {
    socket.broadcast.emit(events.disconnected, { nickname: socket.nickname });
  });
  socket.on(events.sendMsg, ({ message }) => {
    socket.broadcast.emit(events.newMsg, {
      message,
      nickname: socket.nickname,
    });
  });
  socket.on(events.beginPath, ({ x, y }) =>
    socket.broadcast.emit(events.beganPath, { x, y })
  );
  socket.on(events.beginStroke, ({ x, y }) =>
    socket.broadcast.emit(events.beganStroke, { x, y })
  );
};

export default socketController;
