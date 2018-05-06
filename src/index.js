/* 1 (*)
Create an iterable without using generator function.
See the tests for this function to get the spec.
*/
function simpleIterable() {}

/* 2 (*)
Create an iterable using generator function.
It should have the same functionality as the one in question 1
*/
function* generatorIterable() {
  yield 'abc';
}

/* 3 (Q6 in tests)
Consumable users:
- `nextUser` gives the next user and removes it from this.users.
- `done` tells if all the users are consumed
*/
/* eslint-disable no-underscore-dangle, class-methods-use-this */
class ConsumableUsers {
  constructor() {
    this.users = ['Alice', 'Bob'];
    this._done = false;
  }
  get nextUser() {
    // Implement this according to test spec (for creating iterable)
    return [];
  }
  get done() {
    // Implement this according to test spec (for creating iterable)
    return false;
  }
}
/* eslint-enable no-underscore-dangle, class-methods-use-this */

module.exports = {
  simpleIterable,
  generatorIterable,
  ConsumableUsers,
};
