const find = require('../lodash_methods/find');

const users = [
  { user: 'barney', age: 36, active: true },
  { user: 'fred', age: 40, active: false },
  { user: 'pebbles', age: 1, active: true },
];

const func = (o) => o.age < 40;

describe('Find method tests', () => {
  test('First argument is an array', () => {
    expect(() => find('array', func)).toThrowError('First argument should be an array!');
    expect(find(users, func)).toBeTruthy();
  });

  test('First argument has length property', () => {
    expect(() => find([])).toThrowError('Collection is empty!');
  });

  test('Second argument is not null', () => {
    expect(() => find(users, null)).toThrowError('Second argument should not be null!');
  });

  test('Second argument is a function', () => {
    expect(() => find(users, { a: 'function' })).toThrowError('Second argument should be a function!');
    expect(() => find(users)).toThrowError('Second argument should be a function!');
    expect(find(users, func)).toEqual({ user: 'barney', age: 36, active: true });
  });

  test('Third argument is an integer', () => {
    expect(() => find(users, func, 'index')).toThrowError('Third argument should be an integer!');
    expect(find(users, func, 2)).toEqual({ user: 'pebbles', age: 1, active: true });
  });

  test('Third argument is >= 0', () => {
    expect(() => find(users, func, -7)).toThrowError('Third argument should be >= 0!');
  });

  test('Should iterate over elements of collection, returning the first element predicate returns truthy for', () => {
    expect(find(users, func)).toEqual({ user: 'barney', age: 36, active: true });
    expect(find(users, func, 2)).toEqual({ user: 'pebbles', age: 1, active: true });
  });
});
