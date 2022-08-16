const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const accelerometer = require("./main.js");

setInterval(() => {
  console.log(
    `X: ${accelerometer.imuX} Y: ${accelerometer.imuY} Z: ${accelerometer.imuZ}`
  );
}, 1);

app.get("/", function (req, res) {
  res.sendfile("index.html");
});
io.sockets.on("connection", (socket) => {
  socket.emit("hello", "world");
});

http.listen(3000, function () {
  console.log("listening on *:3000");
});
