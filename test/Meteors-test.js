const { assert } = require('chai');

global.Audio = class {};

const Base = require('../lib/Base.js');
const Cannon = require('../lib/Cannon.js');
const Game = require('../lib/Game.js');
const GameEntity = require('../lib/GameEntity.js');
const Missile = require('../lib/Missile.js');
const Meteors = require('../lib/Meteors.js');
const Explosion = require('../lib/Explosion.js');

describe('meteor unit testing', () => {
  it('should instantiate our good friend, Meteor', () => {
    const meteors = new Meteors();

    assert.isFunction(Meteors);
    assert.isObject(meteors);
  });

  it('should take random parameters for x and y', () => {
    const meteors = new Meteors(300, 600, 5, 5);

    assert.notDeepEqual(meteors.x, 700);
    assert.notDeepEqual(meteors.y, -1000);
  });

  it('should take parameters for w and h', () => {
    const meteors = new Meteors(300, 600, 5, 5);

    assert.equal(meteors.w, 5);
    assert.equal(meteors.h, 5);
  });

  it('should have a dx and a dy of 0', () => {
    const meteors = new Meteors();

    assert.equal(meteors.dx, 0);
    assert.equal(meteors.dy, 0);
  });

  it('should have a targetX and targetY of undefined', () => {
    const meteors = new Meteors();

    assert.equal(meteors.targetX, undefined);
    assert.equal(meteors.targetY, undefined);
  });

  it('should have a property of hasCollided with a default of false', () => {
    const meteors = new Meteors();

    assert.equal(meteors.hasCollided, false);
  });

  it('should have a property of hasArrived with a default of false', () => {
    const meteors = new Meteors();

    assert.equal(meteors.hasArrived, false);
  });
  
});
