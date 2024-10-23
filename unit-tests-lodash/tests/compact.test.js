const compact = require('../lodash_methods/compact');

const arr = [0, 1, false, 2, '', 3];
const falseyValues = [false, null, 0, -0, '', undefined, NaN];

describe('Compact method tests', () => {
  test('Argument is an array', () => {
    expect(() => compact('array')).toThrowError('Argument should be an array!');
    expect(compact(arr)).toBeTruthy();
  });

  test('Argument has length property', () => {
    expect(() => compact([])).toThrowError('Array is empty!');
  });

  test('Should return an array', () => {
    expect(compact(arr)).toBeInstanceOf(Array);
  });

  test('Argument is not an array of only falsy values', () => {
    expect(compact(falseyValues)).not.toEqual(expect.arrayContaining(falseyValues));
  });

  test('Should create an array with all falsey values removed', () => {
    expect(compact(arr)).toEqual([1, 2, 3]);
  });
});
