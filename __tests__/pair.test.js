import Pair from '../src/Pair';

describe('Pair', () => {
  let pair;

  beforeEach(() => {
    pair = new Pair(['ETH', 'DAI']);
  });

  it('must have a `pair` property', () => {
    expect(pair.pair).not.toBe(undefined);
  });

  describe('pair property', () => {
    it('must be an array', () => {
      expect(pair.pair instanceof Array).toBe(true);
    });

    it('should exactly contains two elements', () => {
      expect(pair.pair.length === 2).toBe(true);
      pair.pair.push('BTC');
      expect(pair.pair.length === 2).toBe(false);
    });

    it('should contains only string elements', () => {
      let stringFound = 0;
      pair.pair[0] = 333;
      pair.pair.forEach((element) => {
        if (typeof element !== 'string') {
          stringFound += 1;
        }
      });
      expect(stringFound).toEqual(1);
    });
  });
});
