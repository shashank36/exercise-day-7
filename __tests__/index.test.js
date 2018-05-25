const {
  ackermann,
  aperture,
  concat,
  difference,
  invertObj,
} = require('../src/');

describe('1 Ackermann Function', () => {
  test('should return the correct output according to ackermann function', () => {
    expect(ackermann({ m: 0, n: 8 })).toBe(9);
    expect(ackermann({ m: 1, n: 0 })).toBe(2);
    expect(ackermann({ m: 3, n: 4 })).toBe(125);
  });
});

describe('2 aperture', () => {
  const sevenLs = [1, 2, 3, 4, 5, 6, 7];
  it('creates a list of n-tuples from a list', () => {
    expect(aperture(1, sevenLs)).toEqual([[1], [2], [3], [4], [5], [6], [7]]);
    expect(aperture(2, sevenLs)).toEqual([[1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7]]);
    expect(aperture(3, sevenLs)).toEqual([[1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6], [5, 6, 7]]);
    expect(aperture(4, [1, 2, 3, 4])).toEqual([[1, 2, 3, 4]]);
  });

  it('returns an empty list when `n` > `list.length`', () => {
    expect(aperture(6, [1, 2, 3])).toEqual([]);
    expect(aperture(1, [])).toEqual([]);
  });
});

describe('3 concat', () => {
  it('adds combines the elements of the two lists', () => {
    expect(concat(['a', 'b'], ['c', 'd'])).toEqual(['a', 'b', 'c', 'd']);
    expect(concat([], ['c', 'd'])).toEqual(['c', 'd']);
  });

  const z1 = {
    x: 'z1',
    concat(that) { return `${this.x} ${that.x}`; },
  };
  const z2 = {
    x: 'z2',
  };

  it('adds combines the elements of the two lists', () => {
    expect(concat(['a', 'b'], ['c', 'd'])).toEqual(['a', 'b', 'c', 'd']);
    expect(concat([], ['c', 'd'])).toEqual(['c', 'd']);
  });

  it('works on strings', () => {
    expect(concat('foo', 'bar')).toEqual('foobar');
    expect(concat('x', '')).toEqual('x');
    expect(concat('', 'x')).toEqual('x');
    expect(concat('', '')).toEqual('');
  });

  it('delegates to non-String object with a concat method, as second param', () => {
    expect(concat(z1, z2)).toEqual('z1 z2');
  });
});

describe('4 difference', () => {
  const M = [1, 2, 3, 4];
  const M2 = [1, 2, 3, 4, 1, 2, 3, 4];
  const N = [3, 4, 5, 6];
  const N2 = [3, 3, 4, 4, 5, 5, 6, 6];
  const Z = [3, 4, 5, 6, 10];
  const Z2 = [1, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 8];
  it('finds the set of all elements in the first list not contained in the second', () => {
    expect(difference(M, N)).toEqual([1, 2]);
  });

  it('does not allow duplicates in the output even if the input lists had duplicates', () => {
    expect(difference(M2, N2)).toEqual([1, 2]);
  });

  it('works for arrays of different lengths', () => {
    expect(difference(Z, Z2)).toEqual([10]);
    expect(difference(Z2, Z)).toEqual([1, 2, 7, 8]);
  });

  it('will not create a "sparse" array', () => {
    expect(difference(M2, [3]).length).toEqual(3);
  });

  it('returns an empty array if there are no different elements', () => {
    expect(difference(M2, M)).toEqual([]);
    expect(difference(M, M2)).toEqual([]);
    expect(difference([], M2)).toEqual([]);
  });
});

describe('5 invertObj', () => {
  it('takes a list or object and returns an object', () => {
    expect(typeof invertObj([])).toBe('object');
    expect(typeof invertObj({})).toBe('object');
  });

  it('returns an empty object when applied to a primitive', () => {
    expect(invertObj(42)).toEqual({});
    expect(invertObj('abc')).toEqual({});
  });

  it('returns an empty object when applied to null/undefined', () => {
    expect(invertObj(null)).toEqual({});
    expect(invertObj(undefined)).toEqual({});
  });

  it('returns the input\'s values as keys, and keys as values', () => {
    expect(invertObj(['a', 'b', 'c'])).toEqual({ a: '0', b: '1', c: '2' });
    expect(invertObj({ x: 'a', y: 'b', z: 'c' })).toEqual({ a: 'x', b: 'y', c: 'z' });
  });

  it('prefers the last key found when handling keys with the same value', () => {
    expect(invertObj(['a', 'b', 'a']), { a: '2', b: '1' });
    expect(invertObj({
      x: 'a', y: 'b', z: 'a', _id: 'a',
    })).toEqual({ a: '_id', b: 'y' });
  });

  // this one is more of a sanity check
  it('is not destructive', () => {
    const input = {
      x: 'a', y: 'b', z: 'a', _id: 'a',
    };
    invertObj(input);
    expect(input).toEqual({
      x: 'a', y: 'b', z: 'a', _id: 'a',
    });
  });
});

