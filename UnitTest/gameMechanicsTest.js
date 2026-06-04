const { describe, it, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert/strict');

const {
  executeRoll,
  isWinningRoll,
  generateRandomRoll,
} = require('../GameMechanics/gameMechanics');

const { SYMBOLS, REWARDS, THRESHOLDS } = require('../GameMechanics/constants');

describe('isWinningRoll', () => {
  it('returns true when all three symbols match', () => {
    assert.equal(isWinningRoll(['C', 'C', 'C']), true);
    assert.equal(isWinningRoll(['W', 'W', 'W']), true);
  });

  it('returns false when symbols do not all match', () => {
    assert.equal(isWinningRoll(['C', 'L', 'C']), false);
    assert.equal(isWinningRoll(['C', 'C', 'L']), false);
    assert.equal(isWinningRoll(['C', 'L', 'O']), false);
  });
});

describe('generateRandomRoll', () => {
  let originalRandom;

  beforeEach(() => {
    originalRandom = Math.random;
  });

  afterEach(() => {
    Math.random = originalRandom;
  });

  it('returns an array of three symbols from SYMBOLS', () => {
    Math.random = () => 0;
    const roll = generateRandomRoll();
    assert.equal(roll.length, 3);
    roll.forEach((symbol) => assert.ok(SYMBOLS.includes(symbol)));
    assert.deepEqual(roll, ['C', 'C', 'C']);
  });

  it('maps random values to the correct symbol indices', () => {
    const randomSequence = [0, 0.26, 0.76];
    let index = 0;
    Math.random = () => randomSequence[index++];

    assert.deepEqual(generateRandomRoll(), ['C', 'L', 'W']);
  });
});

describe('executeRoll', () => {
  let originalRandom;

  beforeEach(() => {
    originalRandom = Math.random;
  });

  afterEach(() => {
    Math.random = originalRandom;
  });

  function stubRandom(values) {
    let index = 0;
    Math.random = () => {
      if (index >= values.length) {
        return values[values.length - 1];
      }
      return values[index++];
    };
  }

  it('returns a loss immediately without re-roll when the first roll loses', () => {
    stubRandom([0, 0.26, 0.51]);

    const result = executeRoll(100);

    assert.equal(result.win, false);
    assert.equal(result.reward, 0);
    assert.deepEqual(result.roll, ['C', 'L', 'O']);
  });

  it('awards the correct reward on a winning roll when credits are below cheat threshold', () => {
    stubRandom([0, 0, 0]);

    const result = executeRoll(THRESHOLDS.LOW_CHEAT - 1);

    assert.equal(result.win, true);
    assert.deepEqual(result.roll, ['C', 'C', 'C']);
    assert.equal(result.reward, REWARDS.C);
  });

  it('keeps a win when credits are in the low cheat bracket but cheat does not trigger', () => {
    stubRandom([0, 0, 0, 0.5]);

    const result = executeRoll(THRESHOLDS.LOW_CHEAT);

    assert.equal(result.win, true);
    assert.deepEqual(result.roll, ['C', 'C', 'C']);
    assert.equal(result.reward, REWARDS.C);
  });

  it('re-rolls when credits are in the low cheat bracket and cheat triggers', () => {
    stubRandom([0, 0, 0, 0.1, 0, 0.26, 0.76]);

    const result = executeRoll(50);

    assert.equal(result.win, false);
    assert.equal(result.reward, 0);
    assert.deepEqual(result.roll, ['C', 'L', 'W']);
  });

  it('uses high cheat chance when credits exceed the high threshold', () => {
    stubRandom([0, 0, 0, 0.5, 0, 0.26, 0.76]);

    const result = executeRoll(THRESHOLDS.HIGH_CHEAT + 1);

    assert.equal(result.win, false);
    assert.equal(result.reward, 0);
    assert.deepEqual(result.roll, ['C', 'L', 'W']);
  });

  it('awards symbol-specific rewards for winning rolls after a failed cheat re-roll', () => {
    stubRandom([0.26, 0.26, 0.26, 0.9]);

    const result = executeRoll(10);

    assert.equal(result.win, true);
    assert.deepEqual(result.roll, ['L', 'L', 'L']);
    assert.equal(result.reward, REWARDS.L);
  });
});
