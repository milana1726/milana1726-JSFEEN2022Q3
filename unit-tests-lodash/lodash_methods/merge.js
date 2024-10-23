/* eslint-disable no-param-reassign */
const merge = (object, ...sources) => {
  if (typeof object !== 'object') {
    throw new TypeError('First argument should be an object!');
  }

  for (const source of sources) {
    if (typeof source !== 'object' && source !== undefined) {
      throw new TypeError('Second arguments should be objects!');
    }

    for (const key in source) {
      if (typeof source[key] !== 'object') {
        object[key] = source[key];
      } else {
        merge(object[key], source[key]);
      }
    }
  }
  return object;
};

module.exports = merge;
