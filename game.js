const GameView = require('./game_view.js');
const Asteroid = require('./asteroid.js');
const MovingObject = require('./moving_object.js');
const Game = function () {
  this.asteroids = [];
  this.addAsteroids();
};

Game.DIM_X = 400;
Game.DIM_Y = 400;
Game.NUM_ASTEROIDS =  10;

Game.prototype.addAsteroids = function () {
  while (this.asteroids.length < Game.NUM_ASTEROIDS) {
    let posx = Math.random() * Game.DIM_X;
    let posy = Math.random() * Game.DIM_Y;
    this.asteroids.push(new Asteroid({pos: [posx, posy], game: this}));
  }
};

Game.prototype.draw = function(ctx) {

  ctx.clearRect(0,0,Game.DIM_X, Game.DIM_Y);
  this.asteroids.forEach( (el) => (el.draw(ctx)));
};

Game.prototype.moveObjects = function() {
  this.asteroids.forEach((el) => el.move());
};

Game.prototype.wrap = function (pos) {
  pos[0]= pos[0] % Game.DIM_X;
  pos[1]= pos[1] % Game.DIM_Y;
};

Game.prototype.checkCollisions = function () {
  for (let i = 0; i < Game.NUM_ASTEROIDS - 1; i++) {
    for (let j = 1; j < Game.NUM_ASTEROIDS; j++) {
      debugger;
      if (this.asteroids[i].isCollidedWith(this.asteroids[j])) {
        alert("COLLISION");
      }
    }
  }
};

Game.prototype.step = function () {
  this.moveObjects();
  this.checkCollisions();
};

module.exports = Game;
