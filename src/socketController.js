import events from "./events";

const socketController = (socket) => {
  const broadcast = (event, data) => socket.broadcast.emit(event, data);

  socket.on(events.setNickname, ({ nickname }) => {
    socket.nickname = nickname;
    broadcast(events.newUser, { nickname });
  });
  socket.on(events.disconnect, () => {
    broadcast.emit(events.disconnected, { nickname: socket.nickname });
  });
  socket.on(events.sendMsg, ({ message }) => {
    broadcast.emit(events.newMsg, {
      message,
      nickname: socket.nickname,
    });
  });
  socket.on(events.beginPath, ({ x, y }) =>
    broadcast.emit(events.beganPath, { x, y })
  );
  socket.on(events.beginStroke, ({ x, y, color }) =>
    broadcast.emit(events.beganStroke, { x, y, color })
  );
  socket.on(events.fill, ({ color }) =>
    broadcast.emit(events.filled, { color })
  );
};

export default socketController;
