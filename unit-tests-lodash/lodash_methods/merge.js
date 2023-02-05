const merge = (object, ...sources) => {
  if (typeof object !== 'object') {
    throw new TypeError('First argument should be an object!');
  }

  const result = { ...object };

  for (const source of sources) {
    if (typeof source !== 'object') {
      throw new TypeError('Second arguments should be objects!');
    }
    for (const key in source) {
      if (!(key in object) || typeof source[key] !== 'object') {
        result[key] = source[key];
      } else {
        merge(object[key], source[key]);
      }
    }
  }
  return result;
};

module.exports = merge;
