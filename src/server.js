import express from "express";
import logger from "morgan";
import path from "path";
import socketIO from "socket.io";

const PORT = 4000;

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use("/static", express.static(path.join(__dirname, "static")));
app.use(logger("dev"));

const handleHome = (req, res) => {
  res.render("home");
};

app.get("/", handleHome);

const handleListening = () => {
  console.log(`✅ Listening on: http://localhost:${PORT}`);
};

const server = app.listen(PORT, handleListening);

const io = socketIO(server);

io.on("connection", (socket) => {
  console.log(socket);
  socket.on("newMessage", ({ message }) => {
    socket.broadcast.emit("messageNotif", {
      message,
      nickname: socket.nickname || "Anon",
    });
  });
  socket.on("setNickname", ({ nickname }) => {
    socket.nickname = nickname;
  });
});
