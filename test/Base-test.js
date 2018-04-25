const { assert } = require('chai');

global.Audio = class {};

global.Image = class {};

global.document = {
  getElementById: function() {}
};

const Base = require('../lib/Base.js');
const Cannon = require('../lib/Cannon.js');
const Game = require('../lib/Game.js');
const GameEntity = require('../lib/GameEntity.js');
const Missile = require('../lib/Missile.js');
const Meteors = require('../lib/Meteors.js');
const Explosion = require('../lib/Explosion.js');

describe('base unit testing', () => {
  it('should instantiate our good friend, Base', () => {
    const base = new Base();

    assert.isFunction(Base);
    assert.isObject(base);
  });

  it('should take a parameter for x', () => {
    const base = new Base(300);

    assert.equal(base.x, 300);
  });

  it('should have a y position of 550', () => {
    const base = new Base(300, 550, 10, 10);

    assert.equal(base.y, 550);
  });

  it('should have a width of 30', () => {
    const base = new Base(300, 550, 30, 10);

    assert.equal(base.w, 30);
  });

  it('should have a hight of 45', () => {
    const base = new Base(300, 550, 30, 45);

    assert.equal(base.h, 45);
  });
});
