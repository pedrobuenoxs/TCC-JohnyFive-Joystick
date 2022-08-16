var http = require("http"),
  fs = require("fs"),
  //   accelerometer = require("./main.js");
  // NEVER use a Sync function except at start-up!
  index = fs.readFileSync(__dirname + "/index.html");

// Send index.html to all requests
var app = http.createServer(function (req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(index);
});

// Socket.io server listens to our app
var io_ = require("socket.io");
var io = io_(app);

const five = require("johnny-five");
const arduino = new five.Board();
arduino.on("ready", () => {
  const accelerometer = new five.Accelerometer({
    controller: "MPU6050",
    sensitivity: 16384, // optional
  });
  accelerometer.on("change", () => {
    const { x, y, z } = accelerometer;
    // console.log(`X: ${x} Y: ${y} Z: ${z}`);
    io.emit("imu", {
      imuX: x,
      imuY: y,
      imuZ: z,
    });
  });
});
// Emit welcome message on connection
// io.on("connection", function (socket) {
//   // Use socket to communicate with this particular client only, sending it it's own id
//   socket.emit("welcome", {
//     imuX: accelerometer.imuX,
//     imuY: accelerometer.imuY,
//     imuZ: accelerometer.imuZ,
//   });
// });

app.listen(3000, () => {
  console.log("listening on *:3000");
});
