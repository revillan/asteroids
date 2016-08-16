const Game = require('./game.js');

const GameView = function (ctx) {
  this.game = new Game();
  this.drawing = ctx;
};

GameView.prototype.start = function () {
  console.log("there");
  let that = this;
  setInterval(function () {
    console.log("still here");
    that.game.step();
    that.game.draw(that.drawing);
  }, 20);
};

module.exports = GameView;
