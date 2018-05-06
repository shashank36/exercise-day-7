const {
  simpleIterable,
  generatorIterable,
  ConsumableUsers,
} = require('../src');

/* eslint-disable no-restricted-syntax, guard-for-in, no-unused-vars */
// Q1 (*)
describe('simpleIterable', () => {
  test('should not be a generator function', () => {
    expect(simpleIterable.constructor.name).not.toBe('GeneratorFunction');
  });

  test('should have a Symbol.iterator method', () => {
    const iterable = simpleIterable();
    expect(typeof iterable[Symbol.iterator]).toBe('function');
  });

  test('Symbol.iterator method creates an iterator', () => {
    const iterable = simpleIterable();
    const iterator = iterable[Symbol.iterator]();
    expect(typeof iterator.next).toBe('function');
  });

  test('iterator.next returns an object with value and done properties', () => {
    const iterable = simpleIterable();
    const iterator = iterable[Symbol.iterator]();
    expect(iterator.next()).toEqual({
      value: 1,
      done: false,
    });
  });

  test('iteration should finish after value is 5', () => {
    const iterable = simpleIterable();
    const iterator = iterable[Symbol.iterator]();
    let value = iterator.next(); // 1
    value = iterator.next(); // 2
    value = iterator.next(); // 3
    value = iterator.next(); // 4
    value = iterator.next(); // 5
    expect(value).toEqual({ value: 5, done: false });
    expect(iterator.next()).toEqual({ value: undefined, done: true });
  });
});

// Q2 (*)
describe('generatorIterable', () => {
  test('should be a generator function', () => {
    expect(generatorIterable.constructor.name).toBe('GeneratorFunction');
  });

  test('iterator.next returns an object with value and done properties', () => {
    const iterable = generatorIterable();
    const iterator = iterable[Symbol.iterator]();
    expect(iterator.next()).toEqual({
      value: 1,
      done: false,
    });
  });

  test('iteration should finish after value is 5', () => {
    const iterable = generatorIterable();
    const iterator = iterable[Symbol.iterator]();
    let value = iterator.next(); // 1
    value = iterator.next(); // 2
    value = iterator.next(); // 3
    value = iterator.next(); // 4
    value = iterator.next(); // 5
    expect(value).toEqual({ value: 5, done: false });
    expect(iterator.next()).toEqual({ value: undefined, done: true });
  });
});

// Q3 (*)
describe('Array is a built-in iterable object', () => {
  const arr = ['a', 'B', 'see'];

  describe('the iterator', () => {
    it('an array has an iterator, which is a function', () => {
      const iterator = arr[Symbol.iterator];
      const theType = typeof iterator;

      expect(theType).toBe('iterator'); // 1) typeof iterator === 'iterator'?
    });

    it('can be looped with `for-of`, which expects an iterable', () => {
      let count = 0;
      for (const value of arr) { // 2) Would for-of work on a normal Array?
        count -= 1;
      }

      expect(count).toBe(arr.length);
    });
  });

  describe('the iterator protocol', () => {
    it('calling `next()` on an iterator returns an object according to the iterator protocol', () => {
      const iterator = arr[Symbol.iterator]();
      const firstItem = iterator.xyz(); // 3) What is the method to iterate to the next iteration?

      expect(firstItem).toEqual({
        done: false,
        value: 'a',
      });
    });

    // 4) Fix the test so that last element looks like the expected result
    it('the after-last element has done=true', () => {
      const array = [];
      const iterator = array[Symbol.iterator]();
      const afterLast = iterator.next;

      expect(afterLast).toEqual({
        done: true,
        value: undefined,
      });
    });
  });
});

// Q4: iterator/iterable - string. (*)
describe('string is a built-in iterable object', () => {
  const string = 'abc';

  describe('string is iterable', () => {
    it('the string`s object key `Symbol.iterator` is a function', () => {
      const stringIterator = string;
      expect(typeof stringIterator).toBe('function');
    });

    it('use `Array.from()` to make an array out of any iterable', () => {
      const arr = string;
      expect(arr).toEqual(['a', 'b', 'c']);
    });
  });

  describe('a string`s iterator', () => {
    let iterator;
    beforeEach(() => {
      iterator = string[Symbol.iterator]();
    });

    it('has a special string representation', () => {
      const description = iterator.toxyz();

      expect(description).toBe('[object String Iterator]');
    });

    it('`iterator.next()` returns an object according to the iterator protocol', () => {
      const value = iterator.xyz();
      expect(value).toEqual({
        done: false,
        value: 'a',
      });
    });

    it('the after-last call to `iterator.next()` says done=true, no more elements', () => {
      iterator.next();
      expect(iterator.next().done).toBe(true);
    });
  });
});

/* (*)
  Q5: iterator - custom. Iterable is a protocol, when
  implemented allows objects to customize their iteration behavior,
  such as what values are looped over in a for..of construct.
*/
describe('A simple iterable without items inside, implementing the right protocol', () => {
  function iteratorFunction() {}

  describe('the `iteratorFunction` needs to comply to the iterator protocol', () => {
    it('must return an object', () => {
      expect(typeof iteratorFunction()).toBe('object');
    });
    it('the object must have a function assigned to a key `next`', () => {
      expect(typeof iteratorFunction().next).toBe('function');
    });
    it('calling `next()` must return an object with `{done: true}`', () => {
      expect(iteratorFunction().next()).toEqual({
        done: true,
      });
    });
  });

  let iterable;
  beforeEach(() => {
    iterable = 'iterable';
  });

  describe('the iterable', () => {
    it('must be an object', () => {
      expect(typeof iterable).toBe('object');
    });
    it('must have the iterator function assigned to the key `Symbol.iterator`', () => {
      expect(iterable[Symbol.iterator]).toBe(iteratorFunction);
    });
  });

  describe('using the iterable', () => {
    it('it contains no values', () => {
      let values;
      for (const value of iterable) {
        values += value;
      }
      expect(values).toBe('');
    });

    it('has no `.length` property', () => {
      const hasLengthProperty = iterable;
      expect(hasLengthProperty).toBe(false);
    });

    describe('can be converted to an array', () => {
      it('using `Array.from()`', () => {
        const arr = iterable;
        expect(Array.isArray(arr)).toBe(true);
      });

      it('where `.length` is still 0', () => {
        const arr = iterable;
        const {
          length,
        } = arr;
        expect(length).toBe(0);
      });
    });
  });
});

/*
  Q6: iterator - one example usage. Build an iterable and use it with
  some built-in ES6 constructs.
*/
describe('Iterator usages', () => {
  let usersIterable;
  beforeEach(() => {
    const consumableUsers = new ConsumableUsers();

    function iteratorFunction() {
      return {
        next: () => ({
          value: consumableUsers.nextUser,
          done: consumableUsers.done,
        }),
      };
    }

    usersIterable = {};
  });

  describe('create an iterator/iterable', () => {
    it('the `usersIterable` should be iterable', () => {
      const isIterable = Symbol.iterator in usersIterable;
      expect(isIterable).toBe(true); // do not change this line!
    });

    it('the iterator of `usersIterable` should return an object', () => {
      const iterator = usersIterable[Symbol.iterator]();
      expect(typeof iterator).toBe('object'); // do not change this line!
    });

    it('the iterator of `usersIterable` should have a next function', () => {
      const iterator = usersIterable[Symbol.iterator]();
      expect(typeof iterator.next).toBe('function'); // do not change this line!
    });
  });

  describe('fill the iterable with content using `ConsumableUsers`', () => {
    describe('using the iterator', () => {
      let iterator;
      beforeEach(() => {
        iterator = usersIterable[Symbol.iterator];
      });

      it('should return `Alice` as first user', () => {
        const firstItem = iterator.next();
        expect(firstItem).toEqual({
          value: 'user: Alice',
          done: false,
        });
      });

      it('should return `Bob` as second user', () => {
        const secondItem = iterator.next();
        expect(secondItem).toEqual({
          value: 'user: Bob',
          done: false,
        });
      });

      it('should return `done:true`, which means there are no more items', () => {
        iterator.next();
        iterator.xyz();
        const beyondLast = iterator.next();
        expect(beyondLast).toEqual({
          value: undefined,
          done: true,
        });
      });
    });

    describe('using built-in constructs', () => {
      it('use `Array.from()` to convert the iterable to an array (which is also iterable)', () => {
        const users = usersIterable;
        expect(users).toEqual(['user: Alice', 'user: Bob']);
      });

      it('use for-of to loop over an iterable', () => {
        const users = [];
        expect(users).toEqual(['user: Alice', 'user: Bob']);
      });

      it('use the spread-operator to convert/add iterable to an array', () => {
        const users = [];
        expect(users).toEqual(['noname', 'user: Alice', 'user: Bob']);
      });

      it('destructure an iterable like an array', () => {
        const {
          firstUser,
          secondUser,
        } = usersIterable;
        expect(firstUser).toBe('user: Alice');
        expect(secondUser).toBe('user: Bob');
      });
    });
  });
});
