var five = require("johnny-five");
class ArduinoBoard {
  constructor(board, accelerometer) {
    this.board = board;
    this.accelerometer = accelerometer;
    this.imuX = 0;
    this.imuY = 0;
    this.imuZ = 0;
    this.handle();
  }
  handle() {
    this.board.on("ready", () => {
      const accelerometer = new Accelerometer({
        controller: "MPU6050",
      });

      accelerometer.on("change", () => {
        const { x, y, z } = accelerometer;
        this.imuX = x;
        this.imuY = y;
        this.imuZ = z;
      });
    });
    console.log("ArduinoBoard ready");
  }
}

module.exports = ArduinoBoard;
