const { assert } = require('chai');

global.Audio = class {};

const Base = require('../lib/Base.js');
const Cannon = require('../lib/Cannon.js');
const Game = require('../lib/Game.js');
const GameEntity = require('../lib/GameEntity.js');
const Missile = require('../lib/Missile.js');
const Meteors = require('../lib/Meteors.js');
const Explosion = require('../lib/Explosion.js');

describe('game unit testing', () => {
  it('should instantiate our good friend, Game', () => {
    const game = new Game();

    assert.isFunction(Game);
    assert.isObject(game);
  });

  it('should take parameters for context, width and height', () => {
    const game = new Game('foo', 100, 100);

    assert.equal(game.context, 'foo');
    assert.equal(game.width, 100);
    assert.equal(game.height, 100);
  });

  it('should be able to instantiate base and cannon', () => {
    const game = new Game();

    assert.isObject(game.cannon);
  });

  it('should have a baseCount of 6', () => {
    const game = new Game();

    assert.equal(game.baseCount, 6);
  });

  it('should have an array of bases', () => {
    const game = new Game();

    assert.deepEqual(game.baseXArray, [50, 125, 200, 375, 450, 525]);
  });

  it('should have the arrays of meteorArray, baseObjArray, explosionArray and crosshairArray', () => {
    const game = new Game();

    assert.deepEqual(game.meteorArray, []);
    assert.deepEqual(game.baseObjArray, []);
    assert.deepEqual(game.explosionArray, []);
    assert.deepEqual(game.crosshairArray, []);
  });

  it('should have a playerScore with a default of 0', () => {
    const game = new Game();

    assert.equal(game.playerScore, 0);
  });
});
