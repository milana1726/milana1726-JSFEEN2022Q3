const drop = require('../lodash_methods/drop');

const arr = [1, 2, 3];

describe('Drop method tests', () => {
  test('First argument is an array', () => {
    expect(() => drop({ a: 'array' })).toThrowError('First argument should be an array!');
    expect(drop(arr)).toBeTruthy();
  });

  test('First argument has length property', () => {
    expect(() => drop([])).toThrowError('Array is empty!');
  });

  test('Second argument is an integer', () => {
    expect(() => drop(arr, 'integer')).toThrowError('Second argument should be an integer!');
    expect(() => drop(arr, true)).toThrowError('Second argument should be an integer!');
  });

  test('Second argument is >= 0', () => {
    expect(() => drop(arr, -7)).toThrowError('Second argument should be >= 0!');
  });

  test('Should return an array', () => {
    expect(drop(arr)).toBeInstanceOf(Array);
  });

  test('Should create a slice of array with n elements dropped from the beginning', () => {
    expect(drop(arr)).toEqual([2, 3]);
    expect(drop(arr, 2)).toEqual([3]);
    expect(drop(arr, 5)).toEqual([]);
    expect(drop(arr, 0)).toEqual([1, 2, 3]);
  });
});
