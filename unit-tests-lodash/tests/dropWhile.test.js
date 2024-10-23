const dropWhile = require('../lodash_methods/dropWhile');

const users = [
  { user: 'barney', active: false },
  { user: 'fred', active: false },
  { user: 'pebbles', active: true },
];

const func = (o) => !o.active;

describe('DropWhile method tests', () => {
  test('First argument is an array', () => {
    expect(() => dropWhile(123)).toThrowError('First argument should be an array!');
    expect(dropWhile(users, func)).toBeTruthy();
  });

  test('First argument has length property', () => {
    expect(() => dropWhile([])).toThrowError('Array is empty!');
  });

  test('Second argument is not null', () => {
    expect(() => dropWhile(users, null)).toThrowError('Second argument should not be null!');
  });

  test('Second argument is a function', () => {
    expect(() => dropWhile(users, 'function')).toThrowError('Second argument should be a function!');
    expect(() => dropWhile(users)).toThrowError('Second argument should be a function!');
    expect(dropWhile(users, func)).toEqual([{ user: 'pebbles', active: true }]);
  });

  test('Should return an array', () => {
    expect(dropWhile(users, func)).toBeInstanceOf(Array);
  });

  test('Should create a slice of array excluding elements dropped from the beginning', () => {
    expect(dropWhile(users, func)).toEqual([{ user: 'pebbles', active: true }]);
  });
});
