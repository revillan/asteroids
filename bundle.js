/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(1);
	const MovingObject = __webpack_require__(2);
	const GameView = __webpack_require__(3);

	document.addEventListener("DOMContentLoaded", function () {
	  console.log("hello");
	  let canvas = document.getElementById("game-canvas");
	  let ctx = canvas.getContext("2d");
	  let game = new GameView(ctx);
	  return game.start();
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	const Util = {
	  inherits(childClass, parentClass) {
	    function Surrogate() {}
	    Surrogate.prototype = parentClass.prototype;

	    childClass.prototype = new Surrogate ;

	    childClass.prototype.constructor = childClass;
	  },

	  randomVec (length) {
	    let dx = Math.random() * 10 - 5;
	    let dy =  Math.sqrt((length * length) - (dx * dx)) * Math.random()*2 - 1;
	    return [dx, dy];
	  },

	  distance (pos1, pos2) {
	    return Math.sqrt(((pos1[0]-pos2[0])*(pos1[0]-pos2[0])) + ((pos1[1]-pos2[1])*(pos1[1]-pos2[1])))
	  }
	};



	module.exports = Util;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(1);

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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(4);

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


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const GameView = __webpack_require__(3);
	const Asteroid = __webpack_require__(5);
	const MovingObject = __webpack_require__(2);
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


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	
	const MovingObject = __webpack_require__(2);
	const Util = __webpack_require__(1);
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


/***/ }
/******/ ]);