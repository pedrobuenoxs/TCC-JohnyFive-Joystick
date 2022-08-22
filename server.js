const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const accelerometer = require("./app/arduino/index.js");
const path = require("path");

io.on(
  "connection",
  (socket) => {
    setInterval(() => {
      console.log(
        `X:${accelerometer.imuX} Y:${accelerometer.imuY} Z:${accelerometer.imuZ}`
      );
      socket.emit("imu", {
        imuX: accelerometer.imuX * 1.5,
        imuY: accelerometer.imuY * 1.5,
        imuZ: accelerometer.imuZ * 1.5,
      });
    });
  },
  20
);

app.use(express.static(path.join(__dirname, "/app/")));

server.listen(8000, function () {
  console.log("listening on *:3000");
});
