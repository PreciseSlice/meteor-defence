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
    context.fillText(
      'Bases: ' + this.baseCount + ' x 250pts',
      this.baseCountObj.x,
      this.baseCountObj.y
    );
  }

  drawMissileCount(context) {
    context.font = '22px Monospace';
    context.fillStyle = '#2E9DD1';
    context.fillText(
      'Missiles: ' + this.missileCount + ' x 20pts',
      this.missileCountObj.x,
      this.missileCountObj.y
    );
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
    if (
      this.baseCountObj.y < this.scoreObj.y - 40 &&
      this.baseCountObj.x > this.scoreObj.x
    ) {
      this.baseCountObj.y++;
      this.baseCountObj.x--;
    } else {
      this.baseCountObj.hasArrived = true;
    }
  }

  moveMissileCount() {
    if (
      this.missileCountObj.y < this.scoreObj.y - 40 &&
      this.missileCountObj.x > this.scoreObj.x
    ) {
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
