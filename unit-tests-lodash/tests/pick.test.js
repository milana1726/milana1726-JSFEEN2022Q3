/* eslint-disable quote-props */
const pick = require('../lodash_methods/pick');

const object = { 'a': 1, 'b': '2', 'c': 3 };

describe('Pick method tests', () => {
  test('First argument is an object', () => {
    expect(() => pick('object')).toThrowError('First argument should be an object!');
    expect(pick(object)).toBeTruthy();
  });

  test('First argument has length property', () => {
    expect(() => pick({})).toThrowError('Object is empty!');
  });

  test('Second argument is a string or an array of strings', () => {
    expect(() => pick(object, 123)).toThrowError('Second argument should be a string or an array of strings!');
    expect(pick(object, 'b')).toEqual({ b: '2' });
  });

  test('Should return an object', () => {
    expect(pick(object, ['a', 'c'])).toBeInstanceOf(Object);
    expect(pick(object, 'b')).toBeInstanceOf(Object);
  });

  test('Should create an object composed of the picked object properties', () => {
    expect(pick(object, ['a', 'c'])).toEqual({ a: 1, c: 3 });
    expect(pick(object, 'b')).toEqual({ b: '2' });
  });
});
