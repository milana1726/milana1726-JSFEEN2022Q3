const pickBy = (object, predicate) => {
  if (typeof object !== 'object') {
    throw new Error('First argument should be an object!');
  }

  if (!Object.keys(object).length) {
    throw new Error('Object is empty!');
  }

  if (!(predicate === undefined) && !(typeof predicate === 'function')) {
    throw new Error('Second argument should be a function!');
  }

  const result = { ...object };
  if (predicate === undefined) {
    return result;
  }

  for (const key in object) {
    if (!predicate(object[key])) {
      delete result[key];
    }
  }
  return result;
};

module.exports = pickBy;
