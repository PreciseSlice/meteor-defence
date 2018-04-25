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
/***/ (function(module, exports, __webpack_require__) {

	// Requires
	const Game = __webpack_require__(1);
	const GameOver = __webpack_require__(9);

	const canvas = document.getElementById('game');
	const context = canvas.getContext('2d');

	const startButton = document.getElementById('start-button');
	const pauseButton = document.getElementById('pause-button');
	const resetButton = document.getElementById('reset-button');
	const mouse = {
	  x: undefined,
	  y: undefined
	};

	// Creating game
	const game = new Game(context, canvas.width, canvas.height);

	// Event listeners
	canvas.addEventListener('click', function (event) {
	  mouse.x = event.offsetX;
	  mouse.y = event.offsetY;
	  game.clicked(mouse.x, mouse.y);
	});

	startButton.addEventListener('click', function () {
	  game.startGame();
	  this.setAttribute('disabled', true);
	});

	pauseButton.addEventListener('click', function () {
	  if (game.paused === false) {
	    game.paused = true;
	  } else {
	    game.animate();
	    game.paused = false;
	  }
	});

	resetButton.addEventListener('click', function () {
	  window.location.reload();
	});

	function drawStartScreen() {
	  game.drawToScreen('50px Black Ops One, Monospace', '#51A5CB', 'Meteor Defense', 100, 240);
	  game.drawToScreen('30px Monospace', '#51A5CB', 'Press Start', 210, 300);
	}

	drawStartScreen();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	const Cannon = __webpack_require__(2);
	const Meteors = __webpack_require__(7);
	const Base = __webpack_require__(8);
	const GameOver = __webpack_require__(9);

	//sounds
	const pew = new Audio('../sounds/pew.wav');
	pew.volume = 0.2;

	const nextLevel = new Audio('../sounds/next-level.wav');
	nextLevel.volume = 0.6;

	const chime = new Audio('../sounds/chime.wav');
	chime.volume = 0.6;

	//images
	const crossImage = new Image();
	crossImage.src = '../images/crosshairs.svg';

	module.exports = class Game {
	  constructor(context, width, height) {
	    this.context = context;
	    this.width = width;
	    this.height = height;
	    this.cannon = new Cannon(275, 545, 50, 50);
	    this.baseCount = 6;
	    this.baseXArray = [50, 125, 200, 375, 450, 525];
	    this.baseObjArray = [];
	    this.meteorArray = [];
	    this.explosionArray = [];
	    this.crosshairArray = [];
	    this.playerScore = 0;
	    this.waveCount = 1;
	    this.paused = false;
	    this.isGameOver = false;
	    this.gameOverLoop = undefined;
	  }

	  gameLoop() {
	    this.context.clearRect(0, 0, this.width, this.height);

	    //text on canvas
	    this.drawScore();
	    this.drawWave();
	    this.drawPlayerBaseCount();
	    this.drawPlayerMissileCount();

	    //cannon
	    this.manageCannon();

	    //bases
	    this.manageBases();

	    //meteors 
	    this.manageMeteors();

	    //missiles 
	    this.manageMissiles();

	    //crosshairs
	    this.triggerCrosshair();

	    //explosions
	    this.manageExplosions();

	    //generate waves
	    this.nextWave();

	    //detect gameover
	    this.gameOver();

	    if (this.paused === false && this.isGameOver === false) {
	      this.animate();
	    }
	  }

	  animate() {
	    requestAnimationFrame(this.gameLoop.bind(this));
	  }

	  startGame() {
	    this.animate();
	    this.initWave();
	  }

	  initWave() {
	    this.populateMeteors(10);
	    this.meteorsPickTarget();
	    this.populateBases();
	    this.cannon.populateMissiles(20);
	  }

	  nextWave() {
	    if (this.meteorArray.length === 0 && this.baseObjArray.length > 0 && this.cannon.w > 0 && this.waveCount === 1) {
	      this.populateMeteors(15);
	      this.meteorsPickTarget();
	      this.cannon.populateMissiles(5);
	      this.waveCount += 1;
	      nextLevel.play();
	      setTimeout(() => {
	        chime.play();
	      }, 800);
	      document.querySelector('#game').style.backgroundImage = "url('../images/background-imgs/city-of-dawn-green.jpg')";
	    } else if (this.meteorArray.length === 0 && this.baseObjArray.length > 0 && this.cannon.w > 0 && this.waveCount === 2) {
	      this.populateMeteors(25);
	      this.meteorsPickTarget();
	      this.cannon.populateMissiles(10);
	      this.waveCount += 1;
	      nextLevel.play();
	      setTimeout(() => {
	        chime.play();
	      }, 800);
	      document.querySelector('#game').style.backgroundImage = "url('../images/background-imgs/city-of-dawn-red.jpg')";
	    } else if (this.meteorArray.length === 0 && this.baseObjArray.length > 0 && this.cannon.w > 0 && this.waveCount === 3) {
	      this.populateMeteors(25);
	      this.meteorsPickTarget();
	      this.cannon.populateMissiles(10);
	      this.waveCount += 1;
	      nextLevel.play();
	      setTimeout(() => {
	        chime.play();
	      }, 800);
	      document.querySelector('#game').style.backgroundImage = "url('../images/background-imgs/city-of-dawn-purple.jpg')";
	    } else if (this.meteorArray.length === 0 && this.baseObjArray.length > 0 && this.cannon.w > 0 && this.waveCount >= 4) {
	      console.log('next-inf');
	      this.populateMeteors(50);
	      this.meteorsPickTarget();
	      this.cannon.populateMissiles(10);
	      this.waveCount += 1;
	      nextLevel.play();
	      setTimeout(() => {
	        chime.play();
	      }, 800);
	      document.querySelector('#game').style.backgroundImage = "url('../images/background-imgs/city-of-dawn-orange.jpg')";
	    }
	  }

	  keepScore() {
	    this.playerScore += 100;
	  }

	  drawToScreen(font, color, content, x, y) {
	    this.context.font = font;
	    this.context.fillStyle = color;
	    this.context.fillText(content, x, y);
	  }

	  drawScore() {
	    this.drawToScreen('20px Monospace', '#2E9DD1', 'Score: ' + this.playerScore, 8, 20);
	  }

	  drawWave() {
	    this.drawToScreen('20px Monospace', '#2E9DD1', 'Wave: ' + this.waveCount, 8, 45);
	  }

	  drawPlayerBaseCount() {
	    this.drawToScreen('20px Monospace', '#2E9DD1', 'Bases: ' + this.baseCount, 495, 20);
	  }

	  drawPlayerMissileCount() {
	    this.drawToScreen('20px Monospace', '#DB4AE2', 'Missiles: ' + this.cannon.missileArray.length, 235, 20);
	  }

	  gameOver() {
	    if (this.baseCount === 0 || this.cannon.w === 0) {
	      this.meteorArray.forEach(meteor => {
	        meteor.x += meteor.dx * 7;
	        meteor.y += meteor.dy * 7;
	      });
	      this.drawGameOver();
	      if (this.meteorArray.length <= 0 && this.explosionArray.length <= 0) {
	        this.paused = true;
	        this.isGameOver = true;
	        this.gameOverLoop = new GameOver(this.playerScore, this.baseCount, this.cannon.missileArray.length);
	        const total = this.gameOverLoop.totalScores();
	        this.gameOverLoop.total = total;
	        this.endLoop();
	      }
	    }
	  }

	  drawGameOver() {
	    this.drawToScreen('80px Monospace', '#2E9DD1', 'GAME OVER', 90, 300);
	  }

	  endLoop() {
	    this.context.clearRect(0, 0, this.width, this.height);

	    this.drawGameOver();
	    this.gameOverLoop.drawScore(this.context);
	    this.gameOverLoop.moveScore();

	    if (this.gameOverLoop.scoreObj.hasArrived) {
	      this.gameOverLoop.drawBaseCount(this.context);
	      this.gameOverLoop.moveBaseCount();
	      this.gameOverLoop.addScores();
	    }

	    if (this.gameOverLoop.baseCountObj.x < 10) {
	      this.gameOverLoop.drawMissileCount(this.context);
	      this.gameOverLoop.moveMissileCount();
	      this.gameOverLoop.addScores();
	    }

	    requestAnimationFrame(this.endLoop.bind(this));
	  }

	  clicked(mouseX, mouseY) {
	    if (mouseY < 505 && this.paused === false) {
	      this.cannon.shootMissile(mouseX, mouseY);
	      this.crosshairArray.push(crossImage);

	      //plays pew
	      pew.play();
	    }
	  }

	  triggerCrosshair() {
	    this.cannon.firedArray.forEach(missile => {
	      if (!missile.hasArrived) {
	        this.drawCrosshair(missile.targetX - 7.5, missile.targetY - 7.5);
	      }
	    });
	  }

	  drawCrosshair(x, y) {
	    this.context.drawImage(crossImage, x, y, 15, 15);
	  }

	  populateMeteors(amount) {
	    for (let i = 0; i < amount; i++) {
	      this.meteorArray.push(new Meteors(Math.floor(Math.random() * 600), Math.floor(Math.random() * -810), 3));
	    }
	  }

	  meteorsPickTarget() {
	    const targetArray = this.baseXArray.map(baseX => {
	      return baseX + 15;
	    });
	    //adds cannon to targetArray
	    targetArray.push(this.cannon.x + this.cannon.w / 2);
	    //meteors are assigned random targets
	    this.meteorArray.forEach(meteor => {
	      meteor.targetX = targetArray[Math.floor(Math.random() * targetArray.length)];
	      meteor.targetY = 550;
	    });
	  }

	  manageMeteors() {
	    this.meteorArray.forEach((meteor, i) => {
	      meteor.draw(this.context);
	      meteor.move();
	      this.meteorsColliding(meteor);
	      this.meteorsExploding(meteor, i);
	    });
	  }

	  meteorsColliding(meteor) {
	    this.explosionArray.forEach(explosion => {
	      if (meteor.y <= explosion.y + explosion.radius && meteor.y >= explosion.y - explosion.radius && meteor.x <= explosion.x + explosion.radius && meteor.x >= explosion.x - explosion.radius) {
	        meteor.hasCollided = true;
	      }
	    });
	  }

	  meteorsExploding(meteor, i) {
	    if (meteor.hasArrived === true) {
	      this.explosionArray.push(meteor.explode());
	      this.meteorArray.splice(i, 1);
	    } else if (meteor.hasCollided === true) {
	      this.explosionArray.push(meteor.explode());
	      this.meteorArray.splice(i, 1);
	      this.keepScore();
	    }
	  }

	  populateBases() {
	    this.baseXArray.forEach(baseX => {
	      this.baseObjArray.push(new Base(baseX, 550, 30, 45));
	    });
	  }

	  manageBases() {
	    this.baseObjArray.forEach((base, i) => {
	      base.draw(this.context);
	      this.basesDestroyed(base, i);
	    });
	  }

	  basesDestroyed(base, i) {
	    this.explosionArray.forEach(explosion => {
	      if (base && base.y <= explosion.y + explosion.radius && base.y >= explosion.y - explosion.radius && base.x <= explosion.x + explosion.radius && base.x >= explosion.x - explosion.radius) {
	        this.baseObjArray.splice(i, 1);
	        this.baseCount -= 1;
	      }
	    });
	  }

	  manageCannon() {
	    this.cannon.draw(this.context);
	    this.cannonDestroyed();
	  }

	  cannonDestroyed() {
	    this.explosionArray.forEach(explosion => {
	      if (this.cannon.y <= explosion.y + explosion.radius && this.cannon.y >= explosion.y - explosion.radius && this.cannon.x <= explosion.x + explosion.radius && this.cannon.x >= explosion.x - explosion.radius) {
	        this.cannon.missileArray = [];
	        this.cannon.hasAmmo = false;
	        this.cannon.w = 0;
	      }
	    });
	  }

	  manageMissiles() {
	    if (this.cannon.hasAmmo === true) {
	      this.cannon.firedArray.forEach((missile, i) => {
	        missile.draw(this.context);
	        missile.drawTrail(this.context);
	        this.missileExplode(missile, i);
	      });
	    }
	  }

	  missileExplode(missile, i) {
	    if (missile.hasArrived === true) {
	      this.explosionArray.push(missile.explode());
	      this.cannon.firedArray.splice(i, 1);
	    }
	  }

	  manageExplosions() {
	    this.explosionArray.forEach((explosion, i) => {
	      explosion.draw(this.context);
	      if (explosion.isExploded === false) {
	        explosion.explode();
	      } else {
	        explosion.implode();
	      }
	      if (explosion.isExploded === true && explosion.radius === explosion.minRadius) {
	        this.explosionArray.splice(i, 1);
	      }
	    });
	  }
	};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	const GameEntity = __webpack_require__(3);
	const Missile = __webpack_require__(4);

	const cannonImg = new Image();
	cannonImg.src = '../images/Cannon.png';

	module.exports = class Cannon extends GameEntity {
	  constructor(x, y, w, h) {
	    super(x, y, w, h);
	    this.center = this.w / 2 + this.x;
	    this.missileArray = [];
	    this.firedArray = [];
	    this.hasAmmo = false;
	  }

	  draw(context) {
	    context.drawImage(cannonImg, this.x, this.y, this.w, this.h);
	  }

	  shootMissile(mouseX, mouseY) {
	    const firedMissile = this.missileArray.shift();
	    firedMissile.targetX = mouseX;
	    firedMissile.targetY = mouseY;
	    firedMissile.setVelocity();
	    this.firedArray.push(firedMissile);
	  }

	  populateMissiles(amount) {
	    this.hasAmmo = true;
	    for (let i = 0; i < amount; i++) {
	      this.missileArray.push(new Missile(297.5, 550, 5, 5));
	    }
	  }
	};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = class GameEntity {
	  constructor(x, y, w, h) {
	    this.x = x;
	    this.y = y;
	    this.w = w;
	    this.h = h;
	  }
	};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	const Projectile = __webpack_require__(5);
	const Explosion = __webpack_require__(6);

	module.exports = class Missile extends Projectile {
	  constructor(x, y, w, h) {
	    super(...arguments);
	    this.color = '#7C0937';
	  }

	  draw(context) {
	    context.fillStyle = this.color;
	    context.fillRect(this.x, this.y, this.w, this.h);
	  }

	  drawTrail(context) {
	    context.beginPath();
	    context.strokeStyle = '#DB4AE2';
	    context.moveTo(300, 550);
	    context.lineTo(this.x + this.w / 2, this.y + this.h / 2);
	    context.stroke();
	    context.closePath();
	    this.move();
	  }

	  move() {
	    if (this.y < this.targetY) {
	      this.hasArrived = true;
	      this.dx = 0;
	      this.dy = 0;
	    }

	    //sends missile to target * missile speed
	    this.x += this.dx * 4;
	    this.y += this.dy * 4;
	  }

	  setVelocity() {
	    const oppositeLine = this.targetY - this.y;
	    const adjacentLine = this.targetX - this.x;
	    const angle = Math.atan(oppositeLine / adjacentLine);

	    this.dx = Math.cos(angle);
	    this.dy = Math.sin(angle);

	    if (this.targetX < this.x) {
	      this.dx = -this.dx;
	      this.dy = -this.dy;
	    }
	  }

	  explode() {
	    return new Explosion(this.x, this.y, 10);
	  }
	};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	const GameEntity = __webpack_require__(3);

	module.exports = class Projectile extends GameEntity {
	  constructor(x, y, w, h) {
	    super(...arguments);
	    this.dx = 0;
	    this.dy = 0;
	    this.targetX = undefined;
	    this.targetY = undefined;
	    this.hasArrived = false;
	  }
	};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	const GameEntity = __webpack_require__(3);
	const boom = new Audio('../sounds/boom.wav');
	boom.volume = 0.15;

	module.exports = class Explosion extends GameEntity {
	  constructor(x, y, radius) {
	    super(...arguments);
	    this.radius = radius;
	    this.minRadius = radius;
	    this.colorArray = ['#000', '#7C0937', '#DB4AE2', '#FFF'];
	    this.isExploded = false;
	  }

	  draw(context) {
	    context.beginPath();
	    context.arc(this.x + 2.5, this.y + 2.5, this.radius, 0, Math.PI * 2, false);
	    context.fillStyle = this.colorArray[Math.floor(Math.random() * this.colorArray.length)];
	    context.fill();
	    context.closePath();
	  }

	  explode() {
	    const maxRadius = 45;
	    if (this.radius < maxRadius) {
	      this.radius += 1;
	      boom.play();
	    }
	    if (this.radius === maxRadius) {
	      this.isExploded = true;
	    }
	  }

	  implode() {
	    if (this.radius > this.minRadius) {
	      this.radius -= 1;
	    }
	  }
	};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	const Projectile = __webpack_require__(5);
	const Explosion = __webpack_require__(6);

	module.exports = class Meteors extends Projectile {
	  constructor(x, y, radius) {
	    super(...arguments);
	    this.radius = radius;
	    this.hasCollided = false;
	    this.colorArray = ['#000', '#FFF', '#f4b042'];
	  }

	  draw(context) {
	    context.beginPath();
	    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
	    context.fillStyle = this.colorArray[Math.floor(Math.random() * this.colorArray.length)];
	    context.fill();
	    context.closePath();
	    // context.fillRect(this.x, this.y, this.w, this.h);
	  }

	  move() {
	    if (this.y > this.targetY) {
	      this.hasArrived = true;
	    }

	    const oppositeLine = this.targetY - this.y;
	    const adjacentLine = this.targetX - this.x;
	    const angle = Math.atan(oppositeLine / adjacentLine);

	    this.dx = Math.cos(angle);
	    this.dy = Math.sin(angle);

	    if (this.targetX < this.x) {
	      this.dy = -this.dy;
	      this.dx = -this.dx;
	    }

	    this.x += this.dx;
	    this.y += this.dy;
	  }

	  explode() {
	    return new Explosion(this.x, this.y, 10);
	  }
	};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	const GameEntity = __webpack_require__(3);
	const baseImg = new Image();
	baseImg.src = '../images/Base.png';

	module.exports = class Base extends GameEntity {
	  constructor(x, y, w, h) {
	    super(x, y, w, h);
	  }

	  draw(context) {
	    context.drawImage(baseImg, this.x, this.y, this.w, this.h);
	  }
	};

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	module.exports = class GameOver {
	  constructor(score, baseCount, missileCount) {
	    this.score = score;
	    this.baseCount = baseCount;
	    this.missileCount = missileCount;
	    this.total = undefined;
	    this.scoreObj = {
	      x: 8,
	      y: 40,
	      hasArrived: false
	    };
	    this.baseCountObj = {
	      x: 400,
	      y: 40,
	      hasArrived: false
	    };
	    this.missileCountObj = {
	      x: 400,
	      y: 40,
	      hasArrived: false
	    };
	  }

	  drawScore(context) {
	    context.font = '40px Monospace';
	    context.fillStyle = '#2E9DD1';
	    context.fillText('Score: ' + this.score, this.scoreObj.x, this.scoreObj.y);
	  }

	  drawBaseCount(context) {
	    context.font = '22px Monospace';
	    context.fillStyle = '#2E9DD1';
	    context.fillText('Bases: ' + this.baseCount + ' x 250pts', this.baseCountObj.x, this.baseCountObj.y);
	  }

	  drawMissileCount(context) {
	    context.font = '22px Monospace';
	    context.fillStyle = '#2E9DD1';
	    context.fillText('Missiles: ' + this.missileCount + ' x 20pts', this.missileCountObj.x, this.missileCountObj.y);
	  }

	  moveScore() {
	    if (this.scoreObj.x < 175 && this.scoreObj.y < 220) {
	      this.scoreObj.x += 1.3;
	      this.scoreObj.y += 1.3;
	    } else {
	      this.scoreObj.hasArrived = true;
	    }
	  }

	  moveBaseCount() {
	    if (this.baseCountObj.y < this.scoreObj.y - 40 && this.baseCountObj.x > this.scoreObj.x) {
	      this.baseCountObj.y++;
	      this.baseCountObj.x--;
	    } else {
	      this.baseCountObj.hasArrived = true;
	    }
	  }

	  moveMissileCount() {
	    if (this.missileCountObj.y < this.scoreObj.y - 40 && this.missileCountObj.x > this.scoreObj.x) {
	      this.missileCountObj.y++;
	      this.missileCountObj.x--;
	    } else {
	      this.missileCountObj.hasArrived = true;
	    }
	  }

	  addScores() {
	    if (this.baseCountObj.hasArrived === true) {
	      this.baseCountObj.x--;
	      this.baseCountObj.y--;
	      for (let i = 0; i < this.baseCount && this.score < this.total; i++) {
	        this.score += 5;
	      }
	    }
	    if (this.missileCountObj.hasArrived === true) {
	      this.missileCountObj.x--;
	      if (this.missileCountObj.x < this.scoreObj.x) {
	        this.missileCountObj.y--;
	      }
	      for (let i = 0; i < this.missileCount && this.score < this.total; i++) {
	        this.score++;
	      }
	    }
	  }

	  totalScores() {
	    return this.score + this.baseCount * 250 + this.missileCount * 20;
	  }
	};

/***/ })
/******/ ]);