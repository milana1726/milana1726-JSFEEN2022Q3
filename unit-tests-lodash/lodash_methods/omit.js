const omit = (object, paths) => {
  if (typeof object !== 'object') {
    throw new TypeError('First argument should be an object!');
  }
  if (!Object.keys(object).length) {
    throw new Error('Object is empty!');
  }
  if (!(paths === undefined) && !Array.isArray(paths)) {
    throw new Error('Second argument should be an array!');
  }

  const result = { ...object };
  if (paths === undefined) {
    return result;
  }

  // eslint-disable-next-line guard-for-in
  for (const key in object) {
    for (const path of paths) {
      if (key === path) {
        delete result[key];
      }
    }
  }
  return result;
};

module.exports = omit;
