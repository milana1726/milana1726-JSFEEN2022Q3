/* eslint-disable quote-props */
const omit = require('../lodash_methods/omit');

const object = { 'a': 1, 'b': '2', 'c': 3 };

describe('Omit method tests', () => {
  test('First argument is an object', () => {
    expect(() => omit('object')).toThrowError('First argument should be an object!');
    expect(omit(object)).toBeTruthy();
  });

  test('First argument has length property', () => {
    expect(() => omit({})).toThrowError('Object is empty!');
  });

  test('Second argument is a string or an array of strings', () => {
    expect(() => omit(object, 123)).toThrowError('Second argument should be a string or an array of strings!');
    expect(omit(object, 'b')).toEqual({ 'a': 1, 'c': 3 });
  });

  test('Should return an object', () => {
    expect(omit(object, ['a', 'c'])).toBeInstanceOf(Object);
    expect(omit(object, 'b')).toBeInstanceOf(Object);
  });

  test('Should create an object composed of the own and inherited enumerable property paths of object that are not omitted', () => {
    expect(omit(object, ['a', 'c'])).toEqual({ 'b': '2' });
    expect(omit(object, 'b')).toEqual({ 'a': 1, 'c': 3 });
  });
});
