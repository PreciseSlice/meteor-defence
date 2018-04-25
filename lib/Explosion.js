const GameEntity = require('./GameEntity.js');
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
    context.arc((this.x + 2.5), (this.y + 2.5), this.radius, 0, (Math.PI * 2), false);
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
      this.radius -=1;
    }
  }
};