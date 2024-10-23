/* eslint-disable quote-props */
const merge = require('../lodash_methods/merge');

const object = {
  'a': [{ 'b': 2 }, { 'd': 4 }],
};

const second = {
  'a': [{ 'c': 3 }, { 'e': 6 }],
};

const third = {
  'a': [{ 'f': 5 }, { 'g': 7 }],
};

describe('Merge method tests', () => {
  test('First argument is an object', () => {
    expect(() => merge(123)).toThrowError('First argument should be an object!');
    expect(merge(object)).toBeTruthy();
  });

  test('Sources are objects', () => {
    expect(() => merge({}, 'object', 123)).toThrowError('Second arguments should be objects!');
    expect(() => merge({}, second, third)).toBeTruthy();
  });

  test('Should return an object', () => {
    expect(merge(object, third)).toBeInstanceOf(Object);
  });

  test('Source properties that resolve to undefined are skipped if a destination value exists', () => {
    expect(merge(object, undefined)).toEqual(object);
    expect(merge(object)).toEqual(object);
  });

  test('Should recursively merge own and inherited enumerable string keyed properties of source objects into the destination object', () => {
    expect(merge(object, third)).toEqual({ 'a': [{ 'b': 2, 'f': 5 }, { 'd': 4, 'g': 7 }] });
    expect(merge(object, second, third))
      .toEqual({ 'a': [{ 'b': 2, 'c': 3, 'f': 5 }, { 'd': 4, 'e': 6, 'g': 7 }] });
  });
});
