const Util = require("./util.js");

let MovingObject = function (optionsObject) {
  this.pos = optionsObject.pos;
  this.vel = optionsObject.vel;
  this.rad = optionsObject.rad;
  this.col = optionsObject.col;
  this.game = optionsObject.game;


};

MovingObject.prototype.draw = function (ctx) {
  ctx.fillStyle = this.col;
  ctx.beginPath();

  ctx.arc(
    this.pos[0],
    this.pos[1],
    this.rad,
    0,
    2 * Math.PI,
    false
  );

  ctx.fill();
};

MovingObject.prototype.move = function () {
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
  this.game.wrap(this.pos);
};

module.exports = MovingObject;

MovingObject.prototype.isCollidedWith = function (otherObject) {
  return (Util.distance(this.pos, otherObject.pos) < this.rad + otherObject);
};
