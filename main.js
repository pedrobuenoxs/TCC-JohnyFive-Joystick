const fs = require("fs");
const http = require("http").createServer(Server);
const io = require("socket.io")(http);
require("dotenv/config");

const port = process.env.PORT;

const five = require("johnny-five");
const arduino = new five.Board();

function action(x, y) {
  if (y < 0) {
    if (y < -0.3) return "Forward";
  } else {
    if (y > 0.3) return "Backward";
  }
  if (x < 0) {
    if (x < -0.3) return "To Right";
  } else {
    if (x > 0.3) return "To Left";
  }
}
arduino.on("ready", function () {
  console.log("Arduino Pronto");

  // //continuamos daqui!
  const accelerometer = new five.Accelerometer({
    controller: "MPU6050",
    sensitivity: 16384, // optional
  });

  accelerometer.on("change", function () {
    io.emit("eixoX", action(this.x, this.y));
    io.emit("eixoY", this.y);
    console.log(`eixoX:: ${this.x}`, `eixoY::${this.y}`);
  });
});

function Server(req, res) {
  res.writeHead(200);
  res.end(fs.readFileSync("./index.html")); //calma que ainda vamos criar esse html
}

http.listen(port, function () {
  console.log(`Server running on port ${port}`);
});
