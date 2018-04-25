const { assert } = require('chai');

const boom = new Audio('../sounds/boom.wav');

global.Audio = class {
  constructor() {
    this.blah = blah;
  }
};

const Base = require('../lib/Base.js');
const Cannon = require('../lib/Cannon.js');
const Game = require('../lib/Game.js');
const GameEntity = require('../lib/GameEntity.js');
const Missile = require('../lib/Missile.js');
const Meteors = require('../lib/Meteors.js');
const Explosion = require('../lib/Explosion.js');

describe('explosions unit testing', () => {
  it('should instantiate our good friend, Explosion', () => {
    const explosion = new Explosion();

    assert.isFunction(Explosion);
    assert.isObject(explosion);
  });

  it('should take parameters for x and y', () => {
    const explosion = new Explosion(300, 300);

    assert.equal(explosion.x, 300);
    assert.equal(explosion.y, 300);
  });

  it('should take parameters for radius and minRadius', () => {
    const explosion = new Explosion(300, 300, 45);

    assert.equal(explosion.radius, 45);
    assert.equal(explosion.minRadius, 45);
  });

  it('should have a colorArray', () => {
    const explosion = new Explosion();

    assert.deepEqual(explosion.colorArray, [
      '#000',
      '#7C0937',
      '#DB4AE2',
      '#FFF'
    ]);
  });

  it('should have a property of isExploded with a default of false', () => {
    const explosion = new Explosion();

    assert.equal(explosion.isExploded, false);
  });

  it('should be able to explode', () => {
    const explosion = new Explosion(300, 300, 10);
    explosion.radius = 45;
    explosion.explode();

    assert.equal(explosion.isExploded, true);
  });

  it('should be able to implode', () => {
    const explosion = new Explosion(300, 300, 10);
    explosion.radius = 45;
    explosion.implode();

    assert.equal(explosion.radius, 44);
  });
});
