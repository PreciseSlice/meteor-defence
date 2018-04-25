const Projectile = require('./Projectile.js');
const Explosion = require('./Explosion.js');

module.exports = class Meteors extends Projectile {
  constructor(x, y, radius) {
    super(...arguments);
    this.radius = radius;
    this.hasCollided = false;
    this.colorArray = ['#000', '#FFF', '#f4b042' ]; 
  }

  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, (Math.PI * 2), false);
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
    const angle = Math.atan(oppositeLine/adjacentLine);
		
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