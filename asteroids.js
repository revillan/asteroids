const Util = require("./util.js");
const MovingObject = require("./moving_object.js");
const GameView = require("./game_view.js");

document.addEventListener("DOMContentLoaded", function () {
  console.log("hello");
  let canvas = document.getElementById("game-canvas");
  let ctx = canvas.getContext("2d");
  let game = new GameView(ctx);
  return game.start();
});
