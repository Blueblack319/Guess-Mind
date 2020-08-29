import express from "express";
import path from "path";
import socketIO from "socket.io";

const PORT = 4000;

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use("/static", express.static(path.join(__dirname, "static")));

const handleHome = (req, res) => {
  res.render("home");
};

app.get("/", handleHome);

const handleListening = () => {
  console.log(`✅ Listening on: http://localhost:${PORT}`);
};

const server = app.listen(PORT, handleListening);

const io = socketIO(server);

let sockets = [];

io.on("connection", (socket) => {
  sockets.push(socket.id);
  console.log("Somebody connect!");
});
