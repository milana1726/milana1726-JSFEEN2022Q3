const chunk = require('../lodash_methods/chunk');

const arr = ['a', 'b', 'c', 'd'];

describe('Chunk method tests', () => {
  test('First argument is an array', () => {
    expect(() => chunk('array')).toThrowError('First argument should be an array!');
    expect(chunk(arr)).toBeTruthy();
  });

  test('First argument has length property', () => {
    expect(() => chunk([])).toThrowError('Array is empty!');
  });

  test('Second argument is an integer', () => {
    expect(() => chunk(arr, 'integer')).toThrowError('Second argument should be an integer!');
    expect(() => chunk(arr, NaN)).toThrowError('Second argument should be an integer!');
  });

  test('Second argument is > 0', () => {
    expect(() => chunk(arr, 0)).toThrowError('Second argument should be > 0');
    expect(() => chunk(arr, -7)).toThrowError('Second argument should be > 0');
  });

  test('Should return an array', () => {
    expect(chunk(arr)).toBeInstanceOf(Array);
  });

  test('Should create an array of elements split into groups the length of size', () => {
    expect(chunk(arr, 2)).toEqual([['a', 'b'], ['c', 'd']]);
    expect(chunk(arr, 3)).toEqual([['a', 'b', 'c'], ['d']]);
    expect(chunk(arr, 5)).toEqual([['a', 'b', 'c', 'd']]);
  });
});
