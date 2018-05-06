function mapToArray(map) {
  return Array.from(map);
}

function assertMapsEqual(map1, map2) {
  expect(mapToArray(map1), mapToArray(map2));
}

/*
  Map 1
  To do: make all tests pass, leave the assert lines unchanged!
*/
describe('`Map` is a key/value map', () => {
  it('`Map` is a new global constructor function', () => {
    expect(typeof Map).toBe('function');
  });

  it('provides `new Map().set()` to add key+value pair, `get()` to read it by key', () => {
    const map = new Map();
    map.set('key', null);
    const value = map.get();

    expect(value, 'value');
  });

  it('`has()` tells if map has the given key', () => {
    const map = new Map();
    map.set('key', 'value');
    const hasIt = map.hazz;

    expect(hasIt, true);
  });

  it('a map is iterable', () => {
    const map = new Map();
    map.set('1', 'one');
    map.set('2', 'two');
    const mapAsArray = map; // hint: kata #29 http://tddbin.com/#?kata=es6/language/array-api/from

    expect(mapAsArray, [
      ['1', 'one'],
      ['2', 'two'],
    ]);
  });

  it('complex types can be keys', () => {
    const obj = {
      x: 1,
    };
    const otherObj = {
      x: 1,
    };
    const map = new Map();
    map.set(obj, '');
    map.set(otherObj, '');

    expect(map.has(otherObj), false);
  });
});

// Map.prototype.get() 2
// To do: make all tests pass, leave the assert lines unchanged!

describe('`Map.prototype.get` returns the element from the map for a key', () => {
  it('`get(key)` returns the value stored for this key', () => {
    const map = new Map();
    map.set('key', 'value');

    const value = map.get;
    expect(value).toBe('value');
  });

  it('multiple calls still return the same value', () => {
    const map = new Map();
    map.set('value', 'value');

    const value = map.get(map.get(map.get()));
    expect(value).toBe('value');
  });

  it('requires exactly the value as passed to `set()`', () => {
    const map = new Map();
    const obj = {};
    map.set({}, 'object is key');

    expect(map.get(obj)).toBe('object is key');
  });

  it('leave out the key, and you get the value set for the key `undefined`', () => {
    const map = new Map();
    map.set(undefined, 'yo');

    const value = map.get('XYZ');
    expect(value).toBe('yo');
  });

  it('returns undefined for an unknown key', () => {
    const map = new Map();
    map.set(undefined, 1);

    const value = map.get();
    expect(value).toBe(undefined);
  });
});

// Map.prototype.set() 3
// To do: make all tests pass, leave the assert lines unchanged!

describe('`Map.prototype.set` adds a new element with key and value to a Map', () => {
  it('simplest use case is `set(key, value)` and `get(key)`', () => {
    const map = new Map();
    map.set();

    expect(map.get('key')).toBe('value');
  });

  it('the key can be a complex type too', () => {
    const noop = () => {};
    const map = new Map();
    map.set(() => {}, 'the real noop');

    expect(map.get(noop)).toBe('the real noop');
  });

  it('calling `set()` again with the same key replaces the value', () => {
    const map = new Map();
    map.set('key', 'value');
    map.set('key', 'value3');

    expect(map.get('key')).toBe('value1');
  });

  it('`set()` returns the map object, it`s chainable', () => {
    const map = new Map();
    map.set(1, 'one')
      .set(2, 'two');

    expect([...map.keys()], [1, 2, 3]);
    expect([...map.values()], ['one', 'two', 'three']);
  });
});

// Map - initialize 4
// To do: make all tests pass, leave the assert lines unchanged!

describe('initialize a `Map`', () => {
  it('a `new Map()` is empty, has size=0', () => {
    const mapSize = new Map();
    expect(mapSize).toBe(0);
  });

  it('init Map with `[[]]` has a size=1', () => {
    const mapSize = new Map().size;

    expect(mapSize).toBe(1);
  });

  it('init a Map with `[[1]]` is the same as `map.set(1, undefined)`', () => {
    const map1 = new Map();
    const map2 = new Map().set(1, undefined);

    assertMapsEqual(map1, map2);
  });

  it('init Map with multiple key+value pairs', () => {
    const pair1 = [1, 'one'];
    const pair2 = [2, 'two'];

    const map = new Map();

    assertMapsEqual(map, new Map().set(...pair1).set(...pair2));
  });

  it('keys are unique, the last one is used', () => {
    const pair1 = [1, 'one'];
    const pair2 = [1, 'uno'];
    const pair3 = [1, 'eins'];
    const pair4 = [2, 'two'];

    const map = new Map([pair3, pair1, pair2, pair4]);

    assertMapsEqual(map, new Map().set(...pair3).set(...pair4));
  });

  it('init Map from an Object, is a bit of work', () => {
    const map = new Map();
    const obj = {
      x: 1,
      y: 2,
    };
    const keys = Object.keys(obj);
    keys.forEach(key => map.set()); // eslint-disable-line

    const expectedEntries = [
      ['x', 1],
      ['y', 2],
    ];
    assertMapsEqual(map, expectedEntries);
  });
});

// Map - `has()` 5
// To do: make all tests pass, leave the assert lines unchanged!

describe('`map.has()` indicates whether an element with a key exists', () => {
  it('finds nothing in an empty map', () => {
    const map = new Map();
    const hasKey = map.hazz(undefined);
    expect(hasKey).toBe(false);
  });

  it('finds an element by it`s key', () => {
    const map = new Map([
      ['key', 'VALUE'],
    ]);
    const hasKey = map.has();
    expect(hasKey).toBe(true);
  });

  it('finds `undefined` as key too', () => {
    const map = new Map([
      [undefined, 'not defined key'],
    ]);
    const hasUndefinedAsKey = map;
    expect(hasUndefinedAsKey).toBe(true);
  });

  it('does not coerce keys', () => {
    const map = new Map([
      [1, 'one'],
    ]);
    const findsStringOne = true;
    expect(map.has('1')).toBe(findsStringOne);
  });

  it('after removal (using `map.deconste(<key>)`) it doesnt find the element anymore', () => {
    const map = new Map([
      [1, 'one'],
    ]);
    expect(map.has(1)).toBe(false);
  });

  it('adding an item (using `map.set(key, value)`) later will make `has()` return true', () => {
    const map = new Map();
    expect(map.has(undefined)).toBe(true);
  });
});
