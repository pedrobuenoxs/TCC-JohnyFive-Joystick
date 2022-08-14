const { Accelerometer, Board } = require("johnny-five");

const ArduinoBoard = require("./Board.js");

const arduinoBoard = new ArduinoBoard(Board, Accelerometer);

setInterval(() => {
  if (arduinoBoard.imuX > 0.3) {
    console.log("To Right");
  } else if (arduinoBoard.imuX < -0.3) {
    console.log("To Left");
  } else if (arduinoBoard.imuY > 0.3) {
    console.log("Forward");
  } else if (arduinoBoard.imuY < -0.3) {
    console.log("Backward");
  }
}, 1);
