const { Accelerometer, Board } = require("johnny-five");

const ArduinoBoard = require("./Board.js");

const accelerometer = new ArduinoBoard(Board, Accelerometer);

module.exports = accelerometer;
