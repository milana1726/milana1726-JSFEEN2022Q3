const toPairs = require('../lodash_methods/toPairs');

function Foo() {
  this.a = 1;
  this.b = 2;
}

Foo.prototype.c = 3;

const object = {
  name: 'John',
  age: 30,
  married: false,
};

describe('ToPairs method tests', () => {
  test('Argument is an object', () => {
    expect(() => toPairs(true)).toThrowError('Argument should be an object');
    expect(toPairs(new Foo())).toBeTruthy();
  });

  test('Should return an array', () => {
    expect(toPairs(new Foo())).toBeInstanceOf(Array);
  });

  test('If there is no argument, return []', () => {
    expect(toPairs()).toEqual([]);
  });

  test('Should create an array of own enumerable string keyed-value pairs for objec', () => {
    expect(toPairs(new Foo())).toEqual([['a', 1], ['b', 2]]);
    expect(toPairs(object)).toEqual([['name', 'John'], ['age', 30], ['married', false]]);
  });
});
