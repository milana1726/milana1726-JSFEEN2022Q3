const pick = (object, paths) => {
  if (typeof object !== 'object') {
    throw new Error('First argument should be an object!');
  }
  if (!Object.keys(object).length) {
    throw new Error('Object is empty!');
  }
  if (!(paths === undefined) && !(typeof paths === 'string') && !Array.isArray(paths)) {
    throw new Error('Second argument should be a string or an array of strings!');
  }

  const result = {};
  if (paths === undefined) {
    return result;
  }

  for (const key in object) {
    if (typeof paths === 'string') {
      if (key === paths) {
        result[key] = object[key];
      }
    } else {
      for (const path of paths) {
        if (key === path) {
          result[key] = object[key];
        }
      }
    }
  }
  return result;
};

module.exports = pick;
