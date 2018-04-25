// Requires
const Game = require('./Game.js');
const GameOver = require('./GameOver.js');

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
canvas.addEventListener('click', function(event) {
  mouse.x = event.offsetX;
  mouse.y = event.offsetY;
  game.clicked(mouse.x, mouse.y);
});

startButton.addEventListener('click', function() {
  game.startGame();
  this.setAttribute('disabled', true);
});

pauseButton.addEventListener('click', function() {
  if (game.paused === false) {
    game.paused = true;
  } else {
    game.animate();
    game.paused = false;
  }
});

resetButton.addEventListener('click', function() {
  window.location.reload();
});

function drawStartScreen() {
  game.drawToScreen(
    '50px Black Ops One, Monospace',
    '#51A5CB',
    'Meteor Defense',
    100,
    240
  );
  game.drawToScreen('30px Monospace', '#51A5CB', 'Press Start Button', 160, 300);
}

drawStartScreen();
