const express = require("express");
const socket = require("socket.io");
//App setup
const app = express();

//Static File
app.use(express.static("public"));

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(`server running on port ${PORT}`)
);

//Socket setup
const io = socket(server);

io.on("connection", socket => {
  console.log("made socket connection");
  socket.on("chat", data => {
    io.sockets.emit("chat", data);
  });
  socket.on("typing", data => socket.broadcast.emit("typing", data));
});
