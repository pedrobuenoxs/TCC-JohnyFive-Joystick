const { Accelerometer, Board } = require("johnny-five");
const board = new Board();
const accelerometer = new Accelerometer({ controller: "MPU6050" });

const ArduinoBoard = require("./Board.js");

const arduinoBoard = new ArduinoBoard(board, accelerometer);
