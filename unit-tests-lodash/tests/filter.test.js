const filter = require('../lodash_methods/filter');

const users = [
  { user: 'barney', age: 36, active: true },
  { user: 'fred', age: 40, active: false },
];

const func = (o) => !o.active;

describe('Filter method tests', () => {
  test('First argument is an array', () => {
    expect(() => filter('array', func)).toThrowError('First argument should be an array!');
  });

  test('First argument has length property', () => {
    expect(() => filter([])).toThrowError('Collection is empty!');
  });

  test('Second argument is not null', () => {
    expect(() => filter(users, null)).toThrowError('Second argument should not be null!');
  });

  test('Second argument is a function', () => {
    expect(() => filter(users, { a: 'function' })).toThrowError('Second argument should be a function!');
    expect(() => filter(users)).toThrowError('Second argument should be a function!');
    expect(filter(users, func)).toEqual([{ user: 'fred', age: 40, active: false }]);
  });

  test('Result is an array', () => {
    expect(filter(users, func)).toBeInstanceOf(Array);
  });

  test('Should iterate over elements of collection, returning an array of all elements predicate returns truthy for', () => {
    expect(filter(users, func)).toEqual([{ user: 'fred', age: 40, active: false }]);
  });
});
