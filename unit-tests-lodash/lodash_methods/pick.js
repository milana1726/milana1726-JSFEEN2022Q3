const pick = (object, paths) => {
  if (typeof object !== 'object') {
    throw new Error('First argument should be an object!');
  }
  if (!Object.keys(object).length) {
    throw new Error('Object is empty!');
  }
  if (!(paths === undefined) && !Array.isArray(paths)) {
    throw new Error('Second argument should be an array!');
  }

  const result = {};
  if (paths === undefined) {
    return result;
  }

  // eslint-disable-next-line guard-for-in
  for (const key in object) {
    for (const path of paths) {
      if (key === path) {
        result[key] = object[key];
      }
    }
  }
  return result;
};

module.exports = pick;
