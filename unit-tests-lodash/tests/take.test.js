const take = require('../lodash_methods/take');

const arr = [1, 2, 3, 'a', 'b', false];

describe('Take method tests', () => {
  test('First argument is an array', () => {
    expect(() => take('array')).toThrowError('First argument should be an array!');
    expect(take(arr)).toBeTruthy();
  });

  test('First argument has length property', () => {
    expect(() => take([])).toThrowError('Array is empty!');
  });

  test('Second argument is an integer', () => {
    expect(() => take(arr, true)).toThrowError('Second argument should be an integer!');
    expect(() => take(arr, NaN)).toThrowError('Second argument should be an integer!');
  });

  test('Second argument is >= 0', () => {
    expect(() => take(arr, -7)).toThrowError('Second argument should be >= 0');
  });

  test('Result is an array', () => {
    expect(take(arr)).toBeInstanceOf(Array);
  });

  test('Should create a slice of array with n elements taken from the beginning', () => {
    expect(take(arr)).toEqual([1]);
    expect(take(arr, 0)).toEqual([]);
    expect(take(arr, 2)).toEqual([1, 2]);
    expect(take(arr, 5)).toEqual([1, 2, 3, 'a', 'b']);
    expect(take(arr, 10)).toEqual([1, 2, 3, 'a', 'b', false]);
  });
});
