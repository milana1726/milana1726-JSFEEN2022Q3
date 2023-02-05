/* eslint-disable quote-props */
const pickBy = require('../lodash_methods/pickBy');

const object = { 'a': 1, 'b': '2', 'c': 3 };

const isNumber = (value) => typeof value === 'number';
const isString = (value) => typeof value === 'string';

describe('PickBy method tests', () => {
  test('First argument is an object', () => {
    expect(() => pickBy(123, isNumber)).toThrowError('First argument should be an object!');
  });

  test('First argument has length property', () => {
    expect(() => pickBy({})).toThrowError('Object is empty!');
    expect(pickBy(object)).toBeTruthy();
  });

  test('Secont arguments is a function', () => {
    expect(() => pickBy(object, 'function')).toThrowError('Second argument should be a function!');
  });

  test('Should return an object', () => {
    expect(pickBy(object, isString)).toBeInstanceOf(Object);
    expect(pickBy(object, isNumber)).toBeInstanceOf(Object);
  });

  test('If there is no second argument, return the first', () => {
    expect(pickBy(object)).toEqual(object);
    expect(pickBy(object, undefined)).toEqual(object);
  });

  test('Should create an object composed of the object properties predicate returns truthy for', () => {
    expect(pickBy(object, isNumber)).toEqual({ a: 1, c: 3 });
    expect(pickBy(object, isString)).toEqual({ b: '2' });
  });
});
