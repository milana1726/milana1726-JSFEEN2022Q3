const includes = require('../lodash_methods/includes');

const arr = ['a', 2, true, '8'];

describe('Includes method tests', () => {
  test('First argument is an array', () => {
    expect(() => includes('array', 2, 1).toThrowError('First argument should be an array!'));
    expect(includes(arr, 2)).toBeTruthy();
  });

  test('First argument has length property', () => {
    expect(() => includes([], 'a')).toThrowError('Collection is empty!');
  });

  test('Second argument is not null', () => {
    expect(() => includes(arr, null)).toThrowError('Second argument should not be null!');
  });

  test('Third argument is an integer', () => {
    expect(() => includes(arr, 2, false)).toThrowError('Third argument should be an integer!');
    expect(includes(arr, true, 1)).toBeTruthy();
  });

  test('Third argument should not be greater than or equal to the collection length', () => {
    expect(() => expect(includes(arr, 'a', -7))).toThrowError('Third argument should not be greater than or equal to the collection length!');
    expect(includes(arr, true, 1)).toBeTruthy();
  });

  test("If third argument is negative, it's used as the offset from the end of array", () => {
    expect(includes(arr, 'a', -2)).toBeFalsy();
    expect(includes(arr, '8', -3)).toBeTruthy();
  });

  test('Should check if value is in collection', () => {
    expect(includes(arr, 2)).toBeTruthy();
    expect(includes(arr, true, 3)).toBeFalsy();
    expect(includes(arr, '8', 1)).toBeTruthy();
  });
});
