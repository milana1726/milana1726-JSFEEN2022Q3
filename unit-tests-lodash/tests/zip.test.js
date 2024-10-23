const zip = require('../lodash_methods/zip');

const arr1 = ['a', 'b'];
const arr2 = [1, 2];
const arr3 = [true, false];

describe('Zip method tests', () => {
  test('All arguments are arrays', () => {
    expect(() => zip(arr1, 'array', { a: 'array' })).toThrowError('All arguments should be arrays!');
    expect(zip(arr1, arr2, arr3)).toBeTruthy();
  });

  test('Arrays are not empty', () => {
    expect(() => zip([], arr2)).toThrowError('Array is empty!');
  });

  test('The length of all arrays is equal', () => {
    expect(() => zip([1], arr3, ['a', 'b', 'c'])).toThrowError('The length of all arrays should be equal!');
  });

  test('Should return an array', () => {
    expect(zip(arr1, arr2, arr3)).toBeInstanceOf(Array);
  });

  test('Shoeld create an array of grouped elements, the first of which contains the first elements of the given arrays and etc', () => {
    expect(zip(arr1, arr2, arr3)).toEqual([['a', 1, true], ['b', 2, false]]);
    expect(zip(arr1, arr2)).toEqual([['a', 1], ['b', 2]]);
    expect(zip(arr1, arr3)).toEqual([['a', true], ['b', false]]);
  });
});
