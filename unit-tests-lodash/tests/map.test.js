const map = require('../lodash_methods/map');

const arr = [4, 8];
const square = (n) => n * n;

describe('Map method tests', () => {
  test('First argument is an array', () => {
    expect(() => map('array', square).toThrowError('First argument should be an array!'));
    expect(map(arr)).toBeTruthy();
  });

  test('First argument has length property', () => {
    expect(() => map([], square)).toThrowError('Collection is empty!');
  });

  test('Second argument is not null', () => {
    expect(() => map(arr, null)).toThrowError('Second argument should not be null!');
    expect(map(arr, square)).toBeTruthy();
  });

  test('Second argument is a function', () => {
    expect(() => map(arr, 'function')).toThrowError('Second argument should be a function!');
    expect(map(arr, square)).toBeTruthy();
  });

  test('If there is no second argument, return the first', () => {
    expect(map(arr)).toEqual([4, 8]);
  });

  test('Result is an array', () => {
    expect(map(arr, square)).toBeInstanceOf(Array);
    expect(map(arr)).toBeInstanceOf(Array);
  });

  test('Should create an array of values by running each element in collection throw iteratee', () => {
    expect(map(arr, square)).toEqual([16, 64]);
    expect(map(arr, (n) => n + 10)).toEqual([14, 18]);
    // eslint-disable-next-line prefer-template
    expect(map(arr, (n) => (n + 'hello'))).toEqual(['4hello', '8hello']);
  });
});
