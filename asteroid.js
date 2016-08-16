
const MovingObject = require("./moving_object.js");
const Util = require("./util.js");
let Asteroid = function (obj) {
  let COLOR = "green";
  let RADIUS = 10;
  obj.col = COLOR;
  obj.rad = RADIUS;
  obj.vel = Util.randomVec(10);
  MovingObject.call(this, obj);
};

Util.inherits(Asteroid, MovingObject);
module.exports = Asteroid;

window.Asteroid = Asteroid;
