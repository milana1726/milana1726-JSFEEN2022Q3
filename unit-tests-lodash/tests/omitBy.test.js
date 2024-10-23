/* eslint-disable quote-props */
const omitBy = require('../lodash_methods/omitBy');

const object = { 'a': 1, 'b': '2', 'c': 3 };

const isNumber = (value) => typeof value === 'number';
const isString = (value) => typeof value === 'string';

describe('OmitBy method tests', () => {
  test('First argument is an object', () => {
    expect(() => omitBy(123, isNumber)).toThrowError('First argument should be an object!');
  });

  test('First argument has length property', () => {
    expect(() => omitBy({})).toThrowError('Object is empty!');
    expect(omitBy(object)).toBeTruthy();
  });

  test('Secont arguments is a function', () => {
    expect(() => omitBy(object, 'function')).toThrowError('Second argument should be a function!');
  });

  test('Should return an object', () => {
    expect(omitBy(object, isString)).toBeInstanceOf(Object);
    expect(omitBy(object, isNumber)).toBeInstanceOf(Object);
  });

  test('If there is no second argument, return the first', () => {
    expect(omitBy(object)).toEqual(object);
    expect(omitBy(object, undefined)).toEqual(object);
  });

  test("Should create an object composed of the own and inherited enumerable string keyed properties of object that predicate doesn't return truthy for", () => {
    expect(omitBy(object, isNumber)).toEqual({ 'b': '2' });
    expect(omitBy(object, isString)).toEqual({ 'a': 1, 'c': 3 });
  });
});
