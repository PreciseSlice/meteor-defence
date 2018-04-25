const { assert } = require('chai');

global.Audio = class {};

const Base = require('../lib/Base.js');
const Cannon = require('../lib/Cannon.js');
const Game = require('../lib/Game.js');
const GameEntity = require('../lib/GameEntity.js');
const Missile = require('../lib/Missile.js');
const Meteors = require('../lib/Meteors.js');
const Explosion = require('../lib/Explosion.js');

describe('cannon unit testing', () => {
  it('should instantiate our good friend, Cannon', () => {
    const cannon = new Cannon();

    assert.isFunction(Cannon);
    assert.isObject(cannon);
  });

  it('should have an x of 275', () => {
    const cannon = new Cannon(275, 545, 50, 50);

    assert.equal(cannon.x, 275);
  });

  it('should have a y of 545', () => {
    const cannon = new Cannon(275, 545, 50, 50);

    assert.equal(cannon.y, 545);
  });

  it('should have a w of 50', () => {
    const cannon = new Cannon(275, 545, 50, 50);

    assert.equal(cannon.w, 50);
  });

  it('should have an h of 50', () => {
    const cannon = new Cannon(275, 545, 50, 50);

    assert.equal(cannon.h, 50);
  });

  it('should have a center of width divided by two plus x', () => {
    const cannon = new Cannon(275, 545, 50, 50);

    assert.equal(cannon.center, cannon.w / 2 + cannon.x);
  });

  it('should have a missileArray = []', () => {
    const cannon = new Cannon();

    assert.deepEqual(cannon.missileArray, []);
  });

  it('should have a firedArray = []', () => {
    const cannon = new Cannon();

    assert.deepEqual(cannon.firedArray, []);
  });

  it('should have a property of hasAmmo with a default of false', () => {
    const cannon = new Cannon();

    assert.equal(cannon.hasAmmo, false);
  });

  it.skip('be able to should shoot missiles', () => {
    const cannon = new Cannon();
    const missile = new Missile(297.5, 550, 5, 5);
    const firedMissile = missile;
    cannon.missileArray.length = 30;
    firedMissile.isMoving = false;

    cannon.shootMissile(300, 300);

    assert.equal(cannon.missileArray.length, 29);
  });

  it.skip('should populateMissiles', () => {
    const cannon = new Cannon(275, 545, 50, 50);

    cannon.populateMissiles();

    assert.equal(cannon.hasAmmo, true);
    assert.equal(cannon.missileArray.length, 30);
  });
});
