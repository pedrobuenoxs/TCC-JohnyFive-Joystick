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
    sensitivity: 96, // optional
  });
  accelerometer.on("change", () => {
    const { x, y, z } = accelerometer;
    const { acceleration, inclination, orientation, pitch, roll } =
      accelerometer;
    // console.log(`
    //   acceleration: ${acceleration}
    //     inclination: ${inclination}
    //     orientation: ${orientation}
    //   pitch: ${pitch}`);
    // console.log(
    //   `X: ${Math.floor((x * Math.PI) / 2)} Y: ${Math.floor(
    //     (y * Maths.PI) / 2
    //   )} Z: ${Math.floor((z * Math.PI) / 2)}`
    // );
    // console.log(
    //   `X: ${Math.floor(((x * Math.PI) / 360) * 100) / 100} Y: ${
    //     Math.floor(((y * Math.PI) / 180) * 100) / 100
    //   } Z: ${Math.floor(((z * Math.PI) / 180) * 100) / 100}`
    // );
    io.emit("imu", {
      imuX: Math.floor(((x * Math.PI) / 360) * 100) / 100,
      imuY: Math.floor(((y * Math.PI) / 360) * 100) / 100,
      imuZ: Math.floor(((z * Math.PI) / 360) * 100) / 100,
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
