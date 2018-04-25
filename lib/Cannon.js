const GameEntity = require('./GameEntity.js');
const Missile = require('./Missile.js');

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
