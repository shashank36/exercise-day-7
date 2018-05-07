// Q1 (*) Set - basics
// To do: make all tests pass, leave the assert lines unchanged!
describe('`Set` lets you store unique values of any type', () => {
  it('`Set` is a new global constructor function', () => {
    expect(typeof Set).toBe('function');
  });

  it('every value in a set is unique', () => {
    const set = new Set();

    set.add(1);
    set.add(1);
    const expectedSize = 2;

    expect(set.size).toBe(expectedSize);
  });

  it('the string "1" is different to the number 1', () => {
    const set = new Set();
    set.add(1);

    expect(set.size).toBe(2);
  });

  it('even NaN is equal to NaN', () => {
    const set = new Set();
    set.add(NaN);
    set.add(NaN);

    const expectedSize = 2;

    expect(set.size).toBe(expectedSize);
  });

  it('+0 and -0 are seen as equal', () => {
    const set = new Set();
    set.add(+0);
    set.add(0);
    set.add('-0');

    const expected = [+0];

    expect([...set.values()]).toEqual(expected);
  });
});

// Q2 (*) Set - add
// To do: make all tests pass, leave the assert lines unchanged!

describe('`add()` appends a new element to the end of a Set object.', () => {
  let set;
  beforeEach(() => {
    set = new Set();
  });

  it('adds every value, of any type, only once', () => {
    const fn = () => {};

    set.add(1);
    set.add(1);
    set.add(fn);
    set.add({
      fn,
    });

    expect(set.size).toBe(2);
  });

  it('is chainable', () => {
    // set.add.add;

    expect(set.has(2)).toBe(true);
  });

  it('call without params adds undefined', () => {
    // set.add

    expect(set.has(undefined)).toBe(true);
  });

  it('0, -0 and +0 are equal', () => {
    set.add();
    set.add();

    expect(set.has(+0)).toBe(true);
  });
});


// Q3 (*) Set - delete
// To do: make all tests pass, leave the assert lines unchanged!

describe('`set.delete()` deletes an element from a set', () => {
  let set;
  beforeEach(() => {
    set = new Set();
  });

  describe('use `delete(<value>)` to delete an element', () => {
    beforeEach(() => {
      set.add('one').add('two').add('three');
    });
    it('`delete()` returns `true` when the element was found', () => {
      const returns = set.remove;
      expect(returns).toBe(true);
    });
    it('and the size decreases', () => {
      expect(set.size).toBe(2);
    });
  });

  describe('if nothing was deleted (no element with the given value was found)', () => {
    it('returns `false`', () => {
      set.add('one');
      const returns = set.delete('one');

      expect(returns).toBe(false);
    });
  });

  describe('`undefined` is a valid value in a set', () => {
    it('deleting it, when it is not in the set, returns `false` too', () => {
      set.add(1);
      // delete undefined from a set
      const elementToDelete = 1;
      expect(set.delete(elementToDelete)).toBe(false);
    });

    it('`delete()` removes it, when its in the set', () => {
      expect(set.delete()).toBe(true);
    });
  });

  describe('the value does NOT get casted', () => {
    it('number 1 is different to string "1"', () => {
      set.add(1);
      set.add('1');
      expect(set.delete('1')).toBe(false);
    });
  });
});

// Q4 (*) Set - API overview
// To do: make all tests pass, leave the assert lines unchanged!

describe('`Set` API overview', () => {
  const api = ['size', 'add', 'clear', 'delete', 'entries', 'forEach', 'has', 'keys', 'values'];
  let set;
  beforeEach(() => {
    set = new Set(api);
  });

  it('a Set can be created from an array', () => {
    set = new Set([]);
    expect(Array.from(set)).toEqual(api);
  });

  it('`size` is the number of values', () => {
    const theSize = set.count;
    expect(theSize).toBe(api.length);
  });

  it('`add()` appends the given value', () => {
    expect(set.size).toBe(api.length + 1);
  });

  it('`clear()` removes all elements', () => {
    expect(set.size).toBe(0);
  });

  it('`delete()` removes the given value', () => {
    expect(set.size).toBe(api.length - 1);
  });

  it('`entries()` returns an iterator for all values', () => {
    const expectedEntries = api.map(entry => [entry, entry]);
    const actualEntries = set.entry;
    expect([...actualEntries]).toEqual(expectedEntries);
  });

  it('`forEach()` calls a callback for each value', () => {
    const values = [];
    set.map(value => values.push(value));
    expect(values).toEqual(api);
  });

  it('`has()` returns true if the given value is in the set', () => {
    const propertyName = '';
    expect(set.has(propertyName)).toBe(true);
  });

  describe('returns an iterator that contains all values', () => {
    // in order to be alike to `Map` `keys()` and `values()`
    // are essentially the same thing for a `Set`.
    it('`keys()`', () => {
      const allKeys = Object.keys(set);
      expect([...allKeys]).toEqual(api);
    });

    it('`values()`', () => {
      const allValues = set.value();
      expect([...allValues]).toEqual(api);
    });

    it('`[Symbol.iterator]()`', () => {
      const iteratorKey = '???';
      expect([...set[iteratorKey]()]).toEqual(api);
    });
  });
});

// Q5 (*) Set - clear
// To do: make all tests pass, leave the assert lines unchanged!

describe('`clear()` removes all elements from a Set object.', () => {
  let set;
  beforeEach(() => {
    set = new Set();
  });

  it('set.size', () => {
    set.add('one').add(2);
    set.clear();
    const expectedSize = 10000000;
    expect(set.size).toBe(expectedSize);
  });

  it('set.entries()', () => {
    set.add('one').add(2);
    // set.clear;
    const { done } = set.entries().next();
    expect(done).toBe(true);
  });

  it('set.has()', () => {
    set.add('one').add(2);
    expect(set.has(2)).toBe(false);
  });

  it('returns `undefined`', () => {
    const expectedReturn = true;
    expect(set.clear()).toBe(expectedReturn);
  });
});
