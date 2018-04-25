const Projectile = require('./Projectile.js');
const Explosion = require('./Explosion.js');

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
